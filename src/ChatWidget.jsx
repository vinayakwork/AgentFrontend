// // // import React, { useState, useEffect, useRef } from 'react'
// // // import { useVapr } from './useVapr'
// // // import { Message, TraceGroup, groupMessages } from './components/Message'
// // // import WelcomeScreen from './components/WelcomeScreen'
// // // import { IconChat, IconClose, IconNewChat, IconSend } from './components/Icons'

// // // export default function ChatWidget({
// // //   vaprUrl     = import.meta.env.VITE_VAPR_URL     || 'http://localhost:5000',
// // //   agentName   = import.meta.env.VITE_AGENT_NAME   || 'Vapr Assistant',
// // //   token       = localStorage.getItem('vapr_token') || '',
// // // }) {
// // //   const [open,  setOpen]  = useState(false)
// // //   const [input, setInput] = useState('')
// // //   const messagesEndRef    = useRef(null)
// // //   const textareaRef       = useRef(null)

// // //   const {
// // //     messages, suggestions, isLoading,
// // //     sessionTitle, sendMessage, loadSuggestions, loadHistory,
// // //     newChat, sessionId,
// // //   } = useVapr({ vaprUrl, token })

// // //   // Load history + suggestions on first mount
// // //   // useEffect(() => {
// // //   //   if (sessionId) loadHistory(sessionId)
// // //   //   loadSuggestions('home')
// // //   // }, [])
// // //   // Change your existing useEffect to this:
// // //   useEffect(() => {
// // //     // If we found a GA ID or an existing session, load the old messages
// // //     if (sessionId) {
// // //       loadHistory(sessionId);
// // //       console.log('Loaded history for session:', sessionId);
// // //     }
// // //     loadSuggestions('home');
// // //   }, [sessionId]); // Adding sessionId here ensures it runs as soon as the ID is 'grabbed'

// // //   // Focus input when panel opens
// // //   useEffect(() => {
// // //     if (open) setTimeout(() => textareaRef.current?.focus(), 120)
// // //   }, [open])

// // //   // Scroll to bottom on new message
// // //   useEffect(() => {
// // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
// // //   }, [messages])

// // //   function handleSend() {
// // //     if (!input.trim() || isLoading) return
// // //     sendMessage(input.trim())
// // //     setInput('')
// // //     if (textareaRef.current) textareaRef.current.style.height = 'auto'
// // //   }

// // //   function handleKey(e) {
// // //     if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
// // //   }

// // //   function handleInput(e) {
// // //     setInput(e.target.value)
// // //     e.target.style.height = 'auto'
// // //     e.target.style.height = Math.min(e.target.scrollHeight, 112) + 'px'
// // //   }

// // //   const grouped = groupMessages(messages)

// // //   return (
// // //     <>
// // //       {/* ── Panel ────────────────────────────────────────────────────────── */}
// // //       <div className={`
// // //         fixed bottom-24 right-6 z-[9998]
// // //         w-[380px] h-[580px]
// // //         bg-[#0d0d12] border border-white/[0.07]
// // //         rounded-[20px] flex flex-col overflow-hidden
// // //         shadow-[0_24px_80px_rgba(0,0,0,0.7),0_4px_20px_rgba(0,0,0,0.4)]
// // //         transition-all duration-200
// // //         ${open ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-[0.97] pointer-events-none'}
// // //       `}>

// // //         {/* Header */}
// // //         <div className="flex items-center gap-2.5 px-4 py-3.5
// // //                         bg-[#16161f] border-b border-white/[0.06] flex-shrink-0">
// // //           <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/30
// // //                           flex items-center justify-center text-indigo-400 flex-shrink-0">
// // //             <IconChat />
// // //           </div>
// // //           <div className="flex-1 min-w-0">
// // //             <p className="text-[#e8e8f2] text-[13px] font-semibold leading-none truncate">
// // //               {sessionTitle || agentName}
// // //             </p>
// // //             <p className="text-white/30 text-[10.5px] mt-0.5">Condense · Powered by Vapr</p>
// // //           </div>
// // //           <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d39977] flex-shrink-0" />
// // //           <button onClick={newChat} title="New chat"
// // //             className="w-7 h-7 rounded-lg flex items-center justify-center
// // //                        text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-all">
// // //             <IconNewChat />
// // //           </button>
// // //           <button onClick={() => setOpen(false)} title="Close"
// // //             className="w-7 h-7 rounded-lg flex items-center justify-center
// // //                        text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-all">
// // //             <IconClose />
// // //           </button>
// // //         </div>

// // //         {/* Messages or Welcome */}
// // //         {messages.length > 0 ? (
// // //           <div className="flex-1 overflow-y-auto vw-scroll px-3.5 py-4 flex flex-col gap-3">
// // //             {grouped.map((g, i) =>
// // //               g.type === 'trace'
// // //                 ? <TraceGroup key={i} items={g.items} />
// // //                 : <Message    key={i} msg={g.msg} />
// // //             )}
// // //             <div ref={messagesEndRef} />
// // //           </div>
// // //         ) : (
// // //           <WelcomeScreen
// // //             agentName={agentName}
// // //             suggestions={suggestions}
// // //             onChip={sendMessage}
// // //           />
// // //         )}

// // //         {/* Divider */}
// // //         <div className="h-px bg-white/[0.05] flex-shrink-0" />

// // //         {/* Input */}
// // //         <div className="flex items-end gap-2.5 px-3 py-3 bg-[#0d0d12] flex-shrink-0">
// // //           <textarea
// // //             ref={textareaRef}
// // //             rows={1}
// // //             value={input}
// // //             onChange={handleInput}
// // //             onKeyDown={handleKey}
// // //             disabled={isLoading}
// // //             placeholder="Ask anything about Condense…"
// // //             className="flex-1 bg-[#1a1a26] border border-white/[0.08] rounded-[14px]
// // //                        px-3.5 py-2.5 text-[13px] text-[#e8e8f2] placeholder-white/25
// // //                        resize-none overflow-hidden leading-relaxed outline-none
// // //                        focus:border-indigo-500/50 disabled:opacity-50
// // //                        transition-colors duration-150 font-sans"
// // //             style={{ maxHeight: 112 }}
// // //           />
// // //           <button onClick={handleSend} disabled={isLoading || !input.trim()}
// // //             className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0
// // //                        bg-indigo-500 text-white mb-0.5
// // //                        hover:bg-indigo-400 active:scale-95
// // //                        disabled:bg-white/10 disabled:cursor-not-allowed
// // //                        transition-all duration-150">
// // //             <IconSend />
// // //           </button>
// // //         </div>

// // //         <p className="text-center text-[10px] text-white/[0.15] pb-2.5 flex-shrink-0 font-sans">
// // //           Secured by Vapr · Condense AI
// // //         </p>
// // //       </div>

// // //       {/* ── Floating bubble ──────────────────────────────────────────────── */}
// // //       <button onClick={() => setOpen(o => !o)} title="Chat with Vapr"
// // //         className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full
// // //                    bg-indigo-500 text-white flex items-center justify-center
// // //                    shadow-[0_4px_24px_rgba(99,102,241,0.45)]
// // //                    hover:bg-indigo-400 hover:scale-110 hover:shadow-[0_6px_32px_rgba(99,102,241,0.6)]
// // //                    active:scale-95 transition-all duration-200">
// // //         {open ? <IconClose /> : <IconChat />}
// // //       </button>
// // //     </>
// // //   )
// // // }
// // import React, { useState, useEffect, useRef } from 'react'
// // import { useVapr } from './useVapr'
// // import { Message, groupMessages } from './components/Message'
// // import WelcomeScreen from './components/WelcomeScreen'
// // import { IconChat, IconClose, IconNewChat, IconSend } from './components/Icons'

// // export default function ChatWidget({
// //   vaprUrl   = import.meta.env.VITE_VAPR_URL   || 'http://localhost:5000',
// //   agentName = import.meta.env.VITE_AGENT_NAME || 'Vapr Assistant',
// //   token     = localStorage.getItem('vapr_token') || '',
// // }) {
// //   const [open,  setOpen]  = useState(false)
// //   const [input, setInput] = useState('')
// //   const messagesEndRef    = useRef(null)
// //   const textareaRef       = useRef(null)

// //   const {
// //     messages, suggestions, isLoading,
// //     sessionTitle, sendMessage, loadSuggestions, loadHistory,
// //     newChat, sessionId,
// //   } = useVapr({ vaprUrl, token })

// //   useEffect(() => {
// //     if (sessionId) {
// //       loadHistory(sessionId)
// //     }
// //     loadSuggestions('home')
// //   }, [sessionId])

// //   // Focus input when panel opens
// //   useEffect(() => {
// //     if (open) setTimeout(() => textareaRef.current?.focus(), 120)
// //   }, [open])

// //   // Scroll to bottom on new message
// //   useEffect(() => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
// //   }, [messages])

// //   function handleSend() {
// //     if (!input.trim() || isLoading) return
// //     sendMessage(input.trim())
// //     setInput('')
// //     if (textareaRef.current) textareaRef.current.style.height = 'auto'
// //   }

// //   function handleKey(e) {
// //     if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
// //   }

// //   function handleInput(e) {
// //     setInput(e.target.value)
// //     e.target.style.height = 'auto'
// //     e.target.style.height = Math.min(e.target.scrollHeight, 112) + 'px'
// //   }

// //   // Called when user clicks a slot button or submits the contact form
// //   function handleInteract(value) {
// //     sendMessage(value)
// //   }

// //   const grouped = groupMessages(messages)

// //   return (
// //     <>
// //       {/* ── Panel ── */}
// //       <div className={`
// //         fixed bottom-24 right-6 z-[9998]
// //         w-[380px] h-[580px]
// //         bg-[#0d0d12] border border-white/[0.07]
// //         rounded-[20px] flex flex-col overflow-hidden
// //         shadow-[0_24px_80px_rgba(0,0,0,0.7),0_4px_20px_rgba(0,0,0,0.4)]
// //         transition-all duration-200
// //         ${open ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-[0.97] pointer-events-none'}
// //       `}>

// //         {/* Header */}
// //         <div className="flex items-center gap-2.5 px-4 py-3.5
// //                         bg-[#16161f] border-b border-white/[0.06] flex-shrink-0">
// //           <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/30
// //                           flex items-center justify-center text-indigo-400 flex-shrink-0">
// //             <IconChat />
// //           </div>
// //           <div className="flex-1 min-w-0">
// //             <p className="text-[#e8e8f2] text-[13px] font-semibold leading-none truncate">
// //               {sessionTitle || agentName}
// //             </p>
// //             <p className="text-white/30 text-[10.5px] mt-0.5">Condense · Powered by Vapr</p>
// //           </div>
// //           <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d39977] flex-shrink-0" />
// //           <button onClick={newChat} title="New chat"
// //             className="w-7 h-7 rounded-lg flex items-center justify-center
// //                        text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-all">
// //             <IconNewChat />
// //           </button>
// //           <button onClick={() => setOpen(false)} title="Close"
// //             className="w-7 h-7 rounded-lg flex items-center justify-center
// //                        text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-all">
// //             <IconClose />
// //           </button>
// //         </div>

// //         {/* Messages or Welcome */}
// //         {messages.length > 0 ? (
// //           <div className="flex-1 overflow-y-auto vw-scroll px-3.5 py-4 flex flex-col gap-3">
// //             {grouped.map((g, i) => (
// //               <Message
// //                 key={i}
// //                 msg={g.msg}
// //                 onInteract={handleInteract}
// //                 isLoading={isLoading}
// //               />
// //             ))}
// //             <div ref={messagesEndRef} />
// //           </div>
// //         ) : (
// //           <WelcomeScreen
// //             agentName={agentName}
// //             suggestions={suggestions}
// //             onChip={sendMessage}
// //           />
// //         )}

// //         {/* Divider */}
// //         <div className="h-px bg-white/[0.05] flex-shrink-0" />

// //         {/* Input */}
// //         <div className="flex items-end gap-2.5 px-3 py-3 bg-[#0d0d12] flex-shrink-0">
// //           <textarea
// //             ref={textareaRef}
// //             rows={1}
// //             value={input}
// //             onChange={handleInput}
// //             onKeyDown={handleKey}
// //             disabled={isLoading}
// //             placeholder="Ask anything about Condense…"
// //             className="flex-1 bg-[#1a1a26] border border-white/[0.08] rounded-[14px]
// //                        px-3.5 py-2.5 text-[13px] text-[#e8e8f2] placeholder-white/25
// //                        resize-none overflow-hidden leading-relaxed outline-none
// //                        focus:border-indigo-500/50 disabled:opacity-50
// //                        transition-colors duration-150 font-sans"
// //             style={{ maxHeight: 112 }}
// //           />
// //           <button onClick={handleSend} disabled={isLoading || !input.trim()}
// //             className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0
// //                        bg-indigo-500 text-white mb-0.5
// //                        hover:bg-indigo-400 active:scale-95
// //                        disabled:bg-white/10 disabled:cursor-not-allowed
// //                        transition-all duration-150">
// //             <IconSend />
// //           </button>
// //         </div>

// //         <p className="text-center text-[10px] text-white/[0.15] pb-2.5 flex-shrink-0 font-sans">
// //           Secured by Vapr · Condense AI
// //         </p>
// //       </div>

// //       {/* ── Floating bubble ── */}
// //       <button onClick={() => setOpen(o => !o)} title="Chat with Vapr"
// //         className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full
// //                    bg-indigo-500 text-white flex items-center justify-center
// //                    shadow-[0_4px_24px_rgba(99,102,241,0.45)]
// //                    hover:bg-indigo-400 hover:scale-110 hover:shadow-[0_6px_32px_rgba(99,102,241,0.6)]
// //                    active:scale-95 transition-all duration-200">
// //         {open ? <IconClose /> : <IconChat />}
// //       </button>
// //     </>
// //   )
// // }


// import React, { useState, useEffect, useRef, useCallback } from 'react'
// import { useVapr } from './useVapr'
// import { Message, groupMessages } from './components/Message'
// import WelcomeScreen from './components/WelcomeScreen'
// import { IconChat, IconClose, IconNewChat, IconSend } from './components/Icons'

// // 3 minutes in milliseconds
// const IDLE_TIMEOUT_MS = 3 * 60 * 1000

// export default function ChatWidget({
//   vaprUrl   = import.meta.env.VITE_VAPR_URL   || 'http://localhost:5000',
//   agentName = import.meta.env.VITE_AGENT_NAME || 'Vapr Assistant',
//   token     = localStorage.getItem('vapr_token') || '',
// }) {
//   const [open,  setOpen]  = useState(false)
//   const [input, setInput] = useState('')
//   const messagesEndRef    = useRef(null)
//   const textareaRef       = useRef(null)
//    const [bookingSlots, setBookingSlots] = useState([])
//   // Idle timer refs
//   const idleTimerRef      = useRef(null)
//   const idleNudgeSentRef  = useRef(false)   // send only once per session open

//   const {
//     messages, suggestions, isLoading,
//     sessionTitle, sendMessage, loadSuggestions, loadHistory,
//     newChat, sessionId,
//   } = useVapr({ vaprUrl, token })

//   useEffect(() => {
//     if (sessionId) {
//       loadHistory(sessionId)
//     }
//     loadSuggestions('home')
//   }, [sessionId])

//   // Focus input when panel opens
//   useEffect(() => {
//     if (open) setTimeout(() => textareaRef.current?.focus(), 120)
//   }, [open])

//   // Scroll to bottom on new message
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }, [messages])

//   // ── Idle timer: fire "book a meeting" nudge after 3 min of user inactivity ──
//   const resetIdleTimer = useCallback(() => {
//     if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
//     // Only set timer if widget is open and chat has started
//     if (!open) return
//     idleTimerRef.current = setTimeout(() => {
//       if (!idleNudgeSentRef.current && !isLoading) {
//         idleNudgeSentRef.current = true
//         // Inject a synthetic assistant nudge message without calling the API
//         sendMessage('__idle_nudge__')
//       }
//     }, IDLE_TIMEOUT_MS)
//   }, [open, isLoading, sendMessage])

//   // Reset idle timer whenever the widget opens or the user interacts
//   useEffect(() => {
//     if (open) {
//       idleNudgeSentRef.current = false
//       resetIdleTimer()
//     } else {
//       if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
//     }
//     return () => { if (idleTimerRef.current) clearTimeout(idleTimerRef.current) }
//   }, [open])

//   // Also reset on every user message
//   useEffect(() => {
//     const lastMsg = messages[messages.length - 1]
//     if (lastMsg?.role === 'user') {
//       idleNudgeSentRef.current = false
//       resetIdleTimer()
//     }
//   }, [messages])

//   function handleSend() {
//     if (!input.trim() || isLoading) return
//     idleNudgeSentRef.current = false
//     resetIdleTimer()
//     sendMessage(input.trim())
//     setInput('')
//     if (textareaRef.current) textareaRef.current.style.height = 'auto'
//   }

//   function handleKey(e) {
//     if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
//   }

//   function handleInput(e) {
//     setInput(e.target.value)
//     e.target.style.height = 'auto'
//     e.target.style.height = Math.min(e.target.scrollHeight, 112) + 'px'
//     // Typing counts as activity
//     resetIdleTimer()
//   }

//   function handleInteract(value) {
//     // idleNudgeSentRef.current = false
//     // resetIdleTimer()
//     // sendMessage(value)
//      // ✅ UI actions (booking flow)
//   if (typeof value === "object") {
//     handleBookingThroughAgent(value)
//     return
//   }

//   // ✅ normal chat
//    idleNudgeSentRef.current = false
//     resetIdleTimer()
//   sendMessage(value)
//   }
//  function handleBookingThroughAgent(payload) {
//   if (payload.type === "CUSTOMER_DETAILS") {
//     sendMessage(
//       `CUSTOMER_NAME: ${payload.name} | CUSTOMER_EMAIL: ${payload.email}`
//     )
//   }

//   if (payload.type === "SELECT_DATE") {
//     sendMessage(`SELECTED_DATE: ${payload.date}`)
//   }

//   if (payload.type === "SELECT_SLOT") {
//     sendMessage(`SELECTED_SLOT: ${payload.slot}`)
//   }
// }

//   const grouped = groupMessages(messages)

//   return (
//     <>
//       {/* ── Panel ── */}
//       <div className={`
//         fixed bottom-24 right-6 z-[9998]
//         w-[380px] h-[580px]
//         bg-[#0d0d12] border border-white/[0.07]
//         rounded-[20px] flex flex-col overflow-hidden
//         shadow-[0_24px_80px_rgba(0,0,0,0.7),0_4px_20px_rgba(0,0,0,0.4)]
//         transition-all duration-200
//         ${open ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-[0.97] pointer-events-none'}
//       `}>

//         {/* Header */}
//         <div className="flex items-center gap-2.5 px-4 py-3.5
//                         bg-[#16161f] border-b border-white/[0.06] flex-shrink-0">
//           <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/30
//                           flex items-center justify-center text-indigo-400 flex-shrink-0">
//             <IconChat />
//           </div>
//           <div className="flex-1 min-w-0">
//             <p className="text-[#e8e8f2] text-[13px] font-semibold leading-none truncate">
//               {sessionTitle || agentName}
//             </p>
//             <p className="text-white/30 text-[10.5px] mt-0.5">Condense · Powered by Vapr</p>
//           </div>
//           <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d39977] flex-shrink-0" />
//           <button onClick={newChat} title="New chat"
//             className="w-7 h-7 rounded-lg flex items-center justify-center
//                        text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-all">
//             <IconNewChat />
//           </button>
//           <button onClick={() => setOpen(false)} title="Close"
//             className="w-7 h-7 rounded-lg flex items-center justify-center
//                        text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-all">
//             <IconClose />
//           </button>
//         </div>

//         {/* Messages or Welcome */}
//         {messages.length > 0 ? (
//           <div className="flex-1 overflow-y-auto vw-scroll px-3.5 py-4 flex flex-col gap-3">
//             {grouped.map((g, i) => (
//               <Message
//                 key={i}
//                 msg={g.msg}
//                 onInteract={handleInteract}
//                 isLoading={isLoading}
//                 bookingSlots={bookingSlots}
//                 setBookingSlots={setBookingSlots}

//               />
//             ))}
//             <div ref={messagesEndRef} />
//           </div>
//         ) : (
//           <WelcomeScreen
//             agentName={agentName}
//             suggestions={suggestions}
//             onChip={sendMessage}
//           />
//         )}

//         {/* Divider */}
//         <div className="h-px bg-white/[0.05] flex-shrink-0" />

//         {/* Input */}
//         <div className="flex items-end gap-2.5 px-3 py-3 bg-[#0d0d12] flex-shrink-0">
//           <textarea
//             ref={textareaRef}
//             rows={1}
//             value={input}
//             onChange={handleInput}
//             onKeyDown={handleKey}
//             disabled={isLoading}
//             placeholder="Ask anything about Condense…"
//             className="flex-1 bg-[#1a1a26] border border-white/[0.08] rounded-[14px]
//                        px-3.5 py-2.5 text-[13px] text-[#e8e8f2] placeholder-white/25
//                        resize-none overflow-hidden leading-relaxed outline-none
//                        focus:border-indigo-500/50 disabled:opacity-50
//                        transition-colors duration-150 font-sans"
//             style={{ maxHeight: 112 }}
//           />
//           <button onClick={handleSend} disabled={isLoading || !input.trim()}
//             className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0
//                        bg-indigo-500 text-white mb-0.5
//                        hover:bg-indigo-400 active:scale-95
//                        disabled:bg-white/10 disabled:cursor-not-allowed
//                        transition-all duration-150">
//             <IconSend />
//           </button>
//         </div>

//         <p className="text-center text-[10px] text-white/[0.15] pb-2.5 flex-shrink-0 font-sans">
//           Secured by Vapr · Condense AI
//         </p>
//       </div>

//       {/* ── Floating bubble ── */}
//       <button onClick={() => setOpen(o => !o)} title="Chat with Vapr"
//         className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full
//                    bg-indigo-500 text-white flex items-center justify-center
//                    shadow-[0_4px_24px_rgba(99,102,241,0.45)]
//                    hover:bg-indigo-400 hover:scale-110 hover:shadow-[0_6px_32px_rgba(99,102,241,0.6)]
//                    active:scale-95 transition-all duration-200">
//         {open ? <IconClose /> : <IconChat />}
//       </button>
//     </>
//   )
// }


import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useVapr } from './useVapr'
import { Message, groupMessages } from './components/Message'
import WelcomeScreen from './components/WelcomeScreen'
import { IconChat, IconClose, IconNewChat, IconSend } from './components/Icons'

const IDLE_TIMEOUT_MS = 3 * 60 * 1000

export default function ChatWidget({
  vaprUrl   = import.meta.env.VITE_VAPR_URL   ,
  agentName = import.meta.env.VITE_AGENT_NAME ,
  token     = localStorage.getItem('vapr_token') || '',
}) {
  const [open,  setOpen]  = useState(false)
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)
  const textareaRef    = useRef(null)
  const idleTimerRef   = useRef(null)
  const idleNudgeSent  = useRef(false)

  const {
    messages, suggestions, isLoading,
    sessionTitle, sendMessage, sendSilent, loadSuggestions, loadHistory, newChat, sessionId,
  } = useVapr({ vaprUrl, token })

  useEffect(() => {
    if (sessionId) loadHistory(sessionId)
    loadSuggestions('home')
  }, [sessionId])

  useEffect(() => {
    if (open) setTimeout(() => textareaRef.current?.focus(), 120)
  }, [open])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // ── Idle timer ──────────────────────────────────────────────────────────────
  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    if (!open) return
    idleTimerRef.current = setTimeout(() => {
      if (!idleNudgeSent.current && !isLoading) {
        idleNudgeSent.current = true
        sendMessage('__idle_nudge__')
      }
    }, IDLE_TIMEOUT_MS)
  }, [open, isLoading, sendMessage])

  useEffect(() => {
    if (open) { idleNudgeSent.current = false; resetIdleTimer() }
    else if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    return () => { if (idleTimerRef.current) clearTimeout(idleTimerRef.current) }
  }, [open])

  useEffect(() => {
    const last = messages[messages.length - 1]
    if (last?.role === 'user') { idleNudgeSent.current = false; resetIdleTimer() }
  }, [messages])

  function handleSend() {
    if (!input.trim() || isLoading) return
    idleNudgeSent.current = false
    resetIdleTimer()
    sendMessage(input.trim())
    setInput('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  function handleInput(e) {
    setInput(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 112) + 'px'
    resetIdleTimer()
  }

  // onInteract handles non-booking interactions (login flow etc.)
  function handleInteract(value) {
    idleNudgeSent.current = false
    resetIdleTimer()
    sendMessage(value)
  }

  const grouped = groupMessages(messages)

  return (
    <>
      <div className={`
        fixed bottom-24 right-6 z-[9998]
        w-[380px] h-[580px]
        bg-[#0d0d12] border border-white/[0.07]
        rounded-[20px] flex flex-col overflow-hidden
        shadow-[0_24px_80px_rgba(0,0,0,0.7),0_4px_20px_rgba(0,0,0,0.4)]
        transition-all duration-200
        ${open ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-[0.97] pointer-events-none'}
      `}>
        {/* Header */}
        <div className="flex items-center gap-2.5 px-4 py-3.5 bg-[#16161f] border-b border-white/[0.06] flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 flex-shrink-0">
            <IconChat />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[#e8e8f2] text-[13px] font-semibold leading-none truncate">{sessionTitle || agentName}</p>
            <p className="text-white/30 text-[10.5px] mt-0.5">Condense · Powered by Vapr</p>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d39977] flex-shrink-0" />
          <button onClick={newChat} title="New chat" className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-all">
            <IconNewChat />
          </button>
          <button onClick={() => setOpen(false)} title="Close" className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-all">
            <IconClose />
          </button>
        </div>

        {/* Messages or Welcome */}
        {messages.length > 0 ? (
          <div className="flex-1 overflow-y-auto vw-scroll px-3.5 py-4 flex flex-col gap-3">
            {grouped.map((g, i) => (
              <Message
                key={i}
                msg={g.msg}
                onInteract={handleInteract}
                sendSilent={sendSilent}
                isLoading={isLoading}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <WelcomeScreen agentName={agentName} suggestions={suggestions} onChip={sendMessage} />
        )}

        <div className="h-px bg-white/[0.05] flex-shrink-0" />

        {/* Input */}
        <div className="flex items-end gap-2.5 px-3 py-3 bg-[#0d0d12] flex-shrink-0">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKey}
            disabled={isLoading}
            placeholder="Ask anything about Condense…"
            className="flex-1 bg-[#1a1a26] border border-white/[0.08] rounded-[14px] px-3.5 py-2.5 text-[13px] text-[#e8e8f2] placeholder-white/25 resize-none overflow-hidden leading-relaxed outline-none focus:border-indigo-500/50 disabled:opacity-50 transition-colors duration-150 font-sans"
            style={{ maxHeight: 112 }}
          />
          <button onClick={handleSend} disabled={isLoading || !input.trim()}
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 bg-indigo-500 text-white mb-0.5 hover:bg-indigo-400 active:scale-95 disabled:bg-white/10 disabled:cursor-not-allowed transition-all duration-150">
            <IconSend />
          </button>
        </div>

        <p className="text-center text-[10px] text-white/[0.15] pb-2.5 flex-shrink-0 font-sans">
          Secured by Vapr · Condense AI
        </p>
      </div>

      <button onClick={() => setOpen(o => !o)} title="Chat with Vapr"
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-[0_4px_24px_rgba(99,102,241,0.45)] hover:bg-indigo-400 hover:scale-110 hover:shadow-[0_6px_32px_rgba(99,102,241,0.6)] active:scale-95 transition-all duration-200">
        {open ? <IconClose /> : <IconChat />}
      </button>
    </>
  )
}
