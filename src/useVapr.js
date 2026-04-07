// import { useState, useCallback, useRef } from 'react'

// // ── Session ───────────────────────────────────────────────────────────────────
// const SESSION_KEY = 'vapr_sid'

// function getSessionId() {
//   let id = localStorage.getItem(SESSION_KEY)
//   if (!id) { id = crypto.randomUUID(); localStorage.setItem(SESSION_KEY, id) }
//   return id
// }

// // ── Parse Vapr events ─────────────────────────────────────────────────────────
// // Handles both formats:
// //   /vapr_agent   → flat:   { type, "User Request", ... }
// //   /chat_history → nested: { event_type, event_data: {...}, timestamp, agent }
// export function parseVaprEvents(events = []) {
//   const out = []
//   for (const raw of events) {
//     const e     = raw.event_data || raw
//     const type  = raw.event_type || e.type
//     const ts    = raw.timestamp  || e.timestamp
//     const agent = e.agent        || raw.agent

//     switch (type) {
//       case 'user_request':
//         out.push({ id: `${ts}-u`, role: 'user', content: e['User Request'], ts })
//         break

//       case 'agent_response': {
//         // Only show orchestrator responses — sub-agents have is_subagent: true
//         if (e.is_subagent === true) break
//         let text = e['Agent Response'] || ''
//         try {
//           const t = text.trim()
//           if (t.startsWith('"') && t.endsWith('"')) text = JSON.parse(t)
//         } catch (_) {}
//         text = text.replace(/\\n/g, '\n').trim()
//         if (text) out.push({ id: `${ts}-a`, role: 'assistant', content: text, ts })
//         break
//       }

//       case 'error':
//         out.push({ id: `${ts}-err`, role: 'error', content: e.error, ts })
//         break

//       // tool_call and tool_response are intentionally not rendered in the chat UI
//     }
//   }
//   return out
// }

// // ── Hook ──────────────────────────────────────────────────────────────────────
// export function useVapr({ vaprUrl, token }) {
//   const [messages,     setMessages]     = useState([])
//   const [suggestions,  setSuggestions]  = useState([])
//   const [isLoading,    setIsLoading]    = useState(false)
//   const [sessionId,    setSessionId]    = useState(getSessionId)
//   const [sessionTitle, setSessionTitle] = useState(null)
//   const [error,        setError]        = useState(null)

//   const isLoadingRef = useRef(false)
//   const sessionIdRef = useRef(sessionId)

//   function makeHeaders() {
//     return {
//       'Content-Type': 'application/json',
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     }
//   }

//   function buildExtra() {
//     // const now  = new Date()
//     // const tz   = Intl.DateTimeFormat().resolvedOptions().timeZone

//     // // en-CA locale gives YYYY-MM-DD in the user's local timezone — correct for IST
//     // const toLocalDate = (d) => d.toLocaleDateString('en-CA', { timeZone: tz })

//     // const tomorrow  = new Date(now); tomorrow.setDate(now.getDate() + 1)
//     // const dayAfter  = new Date(now); dayAfter.setDate(now.getDate() + 2)

//     // const off  = -now.getTimezoneOffset()
//     // const sign = off >= 0 ? '+' : '-'
//     // const hh   = String(Math.floor(Math.abs(off) / 60)).padStart(2, '0')
//     // const mm   = String(Math.abs(off) % 60).padStart(2, '0')

//     // return {
//     //   current_datetime: now.toLocaleString('en-IN', {
//     //     timeZone: tz,
//     //     weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
//     //     hour: '2-digit', minute: '2-digit', hour12: true,
//     //   }),
//     //   today_date_ist:          toLocalDate(now),
//     //   tomorrow_date_utc:       toLocalDate(tomorrow),
//     //   day_after_tomorrow_utc:  toLocalDate(dayAfter),
//     //   timezone:                tz,
//     //   utc_offset:              `${sign}${hh}:${mm}`,
//     //   date_iso:                now.toISOString(),
//     // }
//     const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

// const today = new Date();

// const formatLocalDate = (d) =>
//   d.toLocaleDateString('en-CA', { timeZone: tz }); // YYYY-MM-DD

// const tomorrow = new Date(today);
// tomorrow.setDate(today.getDate() + 1);

// const dayAfter = new Date(today);
// dayAfter.setDate(today.getDate() + 2);

// const payload = {
//   todayDate: formatLocalDate(today),
//   tomorrowDate: formatLocalDate(tomorrow),
//   dayAfterTomorrowDate: formatLocalDate(dayAfter),
//   userTimeZone: tz,
// };
// return payload
//   }

//   // ── Send message ─────────────────────────────────────────────────────────────
//   const sendMessage = useCallback(async (text) => {
//     if (!text.trim() || isLoadingRef.current) return
//     isLoadingRef.current = true
//     setError(null)
//     setIsLoading(true)

//     const thinkId = `think-${Date.now()}`
//     const userMsg = { id: `u-${Date.now()}`, role: 'user', content: text, ts: Date.now() / 1000 }
//     setMessages(prev => [...prev, userMsg, { id: thinkId, role: 'thinking' }])

//     try {
//       const res = await fetch(`${vaprUrl}/vapr_agent`, {
//         method: 'POST',
//         headers: makeHeaders(),
//         body: JSON.stringify({
//           query:      text,
//           session_id: sessionIdRef.current,
//           extra:      buildExtra(),
//         }),
//       })
//       if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)

//       const data = await res.json()
//       if (data.session_id) {
//         sessionIdRef.current = data.session_id
//         setSessionId(data.session_id)
//         localStorage.setItem(SESSION_KEY, data.session_id)
//       }
//       if (data.title) setSessionTitle(data.title)

//       const parsed = parseVaprEvents(data.response || [])
//       setMessages(parsed)
//     } catch (err) {
//       setError(err.message)
//       setMessages(prev => [
//         ...prev.filter(m => m.id !== thinkId),
//         { id: `err-${Date.now()}`, role: 'error', content: `Could not reach Vapr: ${err.message}`, ts: Date.now() / 1000 },
//       ])
//     } finally {
//       isLoadingRef.current = false
//       setIsLoading(false)
//     }
//   }, [vaprUrl, token])

//   // ── Load suggestions ─────────────────────────────────────────────────────────
//   const loadSuggestions = useCallback(async (screen = 'home') => {
//     try {
//       const res = await fetch(`${vaprUrl}/get_suggestions`, {
//         method: 'POST',
//         headers: makeHeaders(),
//         body: JSON.stringify({ current_screen: screen }),
//       })
//       if (res.ok) {
//         const d = await res.json()
//         setSuggestions(d.suggestions || [])
//       }
//     } catch {
//       setSuggestions(['What is Condense?', 'Build a data pipeline', 'Book a demo'])
//     }
//   }, [vaprUrl, token])

//   // ── Load chat history ────────────────────────────────────────────────────────
//   const loadHistory = useCallback(async (sid) => {
//     try {
//       const res = await fetch(`${vaprUrl}/chat_history`, {
//         method: 'POST',
//         headers: makeHeaders(),
//         body: JSON.stringify({ session_id: sid, user_id: 'None' }),
//       })
//       if (res.ok) {
//         const data   = await res.json()
//         const parsed = parseVaprEvents(data.events || [])
//         if (parsed.length > 0) setMessages(parsed)
//       }
//     } catch (_) {}
//   }, [vaprUrl, token])

//   // ── New chat ─────────────────────────────────────────────────────────────────
//   const newChat = useCallback(() => {
//     const id = crypto.randomUUID()
//     localStorage.setItem(SESSION_KEY, id)
//     sessionIdRef.current = id
//     setSessionId(id)
//     setMessages([])
//     setSessionTitle(null)
//     setError(null)
//   }, [])

//   return { messages, suggestions, isLoading, sessionId, sessionTitle, error,
//            sendMessage, loadSuggestions, loadHistory, newChat }
// }

import { useState, useCallback, useRef } from 'react'

const SESSION_KEY = 'vapr_sid'

// Internal booking signals — never shown as user chat bubbles
const SILENT_PREFIXES = [
  'CUSTOMER_NAME:',
  'SELECTED_DATE:',
  'SELECTED_SLOT:',
  '__idle_nudge__',
]

// export function isSilentMessage(text) {
//   if (!text) return false
//   // return SILENT_PREFIXES.some(p => text.trim().startsWith(p))
//   const trimmed = text.trim()
//   if (SILENT_PREFIXES.some(p => trimmed.startsWith(p))) return true
//   return /^BOOKING_WIDGET_STATE:/i.test(trimmed)

// }
export function isSilentMessage(text) {
  if (!text) return false
  return SILENT_PREFIXES.some(p => text.trim().startsWith(p))
}

function getGaClientId() {
  try {
    const match = document.cookie.match(/(?:^|;\s*)_ga=([^;]*)/)
    if (!match) return null
    // GA format: GA1.X.<clientId> — drop the first two segments
    const parts = decodeURIComponent(match[1]).split('.')
    if (parts.length >= 4) return parts.slice(2).join('.')  // "741568552.1775107535"
    return null
  } catch {
    return null
  }
}
// function getSessionId() {
//   let id = localStorage.getItem(SESSION_KEY)
  
//   if (!id) { id = crypto.randomUUID(); localStorage.setItem(SESSION_KEY, id) }
//   return id
// }


function getSessionId() {
  // Prefer GA client ID so returning users keep their history across devices/sessions
  const gaId = getGaClientId()
  if (gaId) {
    localStorage.setItem(SESSION_KEY, gaId)   // keep in sync
    return gaId
  }
  // Fall back to stored ID or generate a new one
  let id = localStorage.getItem(SESSION_KEY)
  if (!id) { id = crypto.randomUUID(); localStorage.setItem(SESSION_KEY, id) }
  return id
}

export function parseVaprEvents(events = []) {
  const out = []
  for (const raw of events) {
    const e    = raw.event_data || raw
    const type = raw.event_type || e.type
    const ts   = raw.timestamp  || e.timestamp

    switch (type) {
      // case 'user_request': {
      //   const content = e['User Request'] || ''
      //   // Drop internal booking signals — never show as chat bubbles
      //   if (!isSilentMessage(content)) {
      //     out.push({ id: `${ts}-u`, role: 'user', content, ts })
      //   }
      //   break
      case 'user_request': {
  const content = e['User Request'] || ''
  if (!isSilentMessage(content)) {
    out.push({ id: `${ts}-u`, role: 'user', content, ts })
  }
  break

      }
      // case 'agent_response': {
      //   if (e.is_subagent === true) break
      //   let text = e['Agent Response'] || ''
      //   try {
      //     const t = text.trim()
      //     if (t.startsWith('"') && t.endsWith('"')) text = JSON.parse(t)
      //   } catch (_) {}
      //   text = text.replace(/\\n/g, '\n').trim()
      //   if (text) out.push({ id: `${ts}-a`, role: 'assistant', content: text, ts })
      //   break
      // }
      case 'agent_response': {
        if (e.is_subagent === true) break
        let text = e['Agent Response'] || ''
        
        try {
          const t = text.trim()
          if (t.startsWith('"') && t.endsWith('"')) text = JSON.parse(t)
        } catch (_) {}

        // ─── DYNAMIC TIMEZONE REMOVAL START ───
        // This regex looks for AM/PM and removes any letters/spaces following it
        // works for "India Standard Time", "EST", "BST", etc.
        text = text.replace(/(AM|PM)\s+([A-Za-z\s]+)(?=$|\n|")/g, '$1')
        // ─── DYNAMIC TIMEZONE REMOVAL END ─────

        text = text.replace(/\\n/g, '\n').trim()
        if (text) out.push({ id: `${ts}-a`, role: 'assistant', content: text, ts })
        break
      }
      case 'error':
        out.push({ id: `${ts}-err`, role: 'error', content: e.error, ts })
        break
    }
  }
  return out
}

export function useVapr({ vaprUrl, token }) {
  const [messages,     setMessages]     = useState([])
  const [suggestions,  setSuggestions]  = useState([])
  const [isLoading,    setIsLoading]    = useState(false)
  const [sessionId,    setSessionId]    = useState(getSessionId)
  const [sessionTitle, setSessionTitle] = useState(null)
  const [error,        setError]        = useState(null)

  const isLoadingRef = useRef(false)
  const sessionIdRef = useRef(sessionId)

  function makeHeaders() {
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }
  }

  function buildExtra() {
    const tz    = Intl.DateTimeFormat().resolvedOptions().timeZone
    const today = new Date()
    const fmt   = d => d.toLocaleDateString('en-CA', { timeZone: tz })
    const tom   = new Date(today); tom.setDate(today.getDate() + 1)
    const dat   = new Date(today); dat.setDate(today.getDate() + 2)
    return { todayDate: fmt(today), tomorrowDate: fmt(tom), dayAfterTomorrowDate: fmt(dat), userTimeZone: tz }
  }

  // ── Regular send — shows user bubble, replaces message list ─────────────────
  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isLoadingRef.current) return
    isLoadingRef.current = true
    setError(null)
    setIsLoading(true)

    const thinkId = `think-${Date.now()}`
    const silent = isSilentMessage(text)

    // const userMsg = { id: `u-${Date.now()}`, role: 'user', content: text, ts: Date.now() / 1000 }
    // setMessages(prev => [...prev, userMsg, { id: thinkId, role: 'thinking' }])
    // setMessages(prev => silent ? [...prev, { id: thinkId, role: 'thinking' }] : [...prev, userMsg, { id: thinkId, role: 'thinking' }])
// const silent = isSilentMessage(text)
const userMsg = { id: `u-${Date.now()}`, role: 'user', content: text, ts: Date.now() / 1000 }
setMessages(prev =>
  silent
    ? [...prev, { id: thinkId, role: 'thinking' }]
    : [...prev, userMsg, { id: thinkId, role: 'thinking' }]
)

    try {
      const res = await fetch(`${vaprUrl}/vapr_agent`, {
        method: 'POST', headers: makeHeaders(),
        body: JSON.stringify({ query: text, session_id: sessionIdRef.current, extra: buildExtra() }),
      })
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
      const data = await res.json()
      if (data.session_id) {
        sessionIdRef.current = data.session_id
        setSessionId(data.session_id)
        localStorage.setItem(SESSION_KEY, data.session_id)
      }
      if (data.title) setSessionTitle(data.title)
      setMessages(parseVaprEvents(data.response || []))
    } catch (err) {
      setError(err.message)
      setMessages(prev => [
        ...prev.filter(m => m.id !== thinkId),
        { id: `err-${Date.now()}`, role: 'error', content: `Could not reach Vapr: ${err.message}`, ts: Date.now() / 1000 },
      ])
    } finally {
      isLoadingRef.current = false
      setIsLoading(false)
    }
  }, [vaprUrl, token])

  // ── Silent send — NO user bubble, returns agent reply text, doesn't touch message list ─
  const sendSilent = useCallback(async (text) => {
    if (!text.trim()) return null
    // Wait for any in-flight request to finish
    while (isLoadingRef.current) {
      await new Promise(r => setTimeout(r, 100))
    }
    isLoadingRef.current = true
    setIsLoading(true)
    try {
      const res = await fetch(`${vaprUrl}/vapr_agent`, {
        method: 'POST', headers: makeHeaders(),
        body: JSON.stringify({ query: text, session_id: sessionIdRef.current, extra: buildExtra() }),
      })
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
      const data = await res.json()
      if (data.session_id) {
        sessionIdRef.current = data.session_id
        setSessionId(data.session_id)
        localStorage.setItem(SESSION_KEY, data.session_id)
      }
      // Return only the last assistant message text
      const msgs = parseVaprEvents(data.response || [])
      const last = msgs.filter(m => m.role === 'assistant').pop()
      return last?.content ?? null
    } catch (err) {
      return null
    } finally {
      isLoadingRef.current = false
      setIsLoading(false)
    }
  }, [vaprUrl, token])

  const loadSuggestions = useCallback(async (screen = 'home') => {
    try {
      const res = await fetch(`${vaprUrl}/get_suggestions`, {
        method: 'POST', headers: makeHeaders(),
        body: JSON.stringify({ current_screen: screen }),
      })
      if (res.ok) setSuggestions((await res.json()).suggestions || [])
    } catch {
      setSuggestions(['What is Condense?', 'Build a data pipeline', 'Book a demo'])
    }
  }, [vaprUrl, token])

  const loadHistory = useCallback(async (sid) => {
    try {
      const res = await fetch(`${vaprUrl}/chat_history`, {
        method: 'POST', headers: makeHeaders(),
        body: JSON.stringify({ session_id: sid, user_id: 'None' }),
      })
      if (res.ok) {
        const parsed = parseVaprEvents((await res.json()).events || [])
        if (parsed.length > 0) setMessages(parsed)
      }
    } catch (_) {}
  }, [vaprUrl, token])

  const newChat = useCallback(() => {
    const id = crypto.randomUUID()
    localStorage.setItem(SESSION_KEY, id)
    sessionIdRef.current = id
    setSessionId(id)
    setMessages([]); setSessionTitle(null); setError(null)
  }, [])

  return { messages, suggestions, isLoading, sessionId, sessionTitle, error,
           sendMessage, sendSilent, loadSuggestions, loadHistory, newChat }
}
