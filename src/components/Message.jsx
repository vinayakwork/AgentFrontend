// // // // // // // import React, { useState } from 'react'
// // // // // // // import { IconTool, IconChevron } from './Icons'

// // // // // // // function fmtTime(ts) {
// // // // // // //   if (!ts) return ''
// // // // // // //   return new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
// // // // // // // }

// // // // // // // function prettyJSON(val) {
// // // // // // //   if (!val) return ''
// // // // // // //   try { return JSON.stringify(val, null, 2) } catch { return String(val) }
// // // // // // // }

// // // // // // // // ── Render assistant text with newlines + clickable URLs ──────────────────────
// // // // // // // function AssistantText({ content }) {
// // // // // // //   const parts = content.split(/(https?:\/\/[^\s]+)/g)
// // // // // // //   return (
// // // // // // //     <>
// // // // // // //       {parts.map((part, i) =>
// // // // // // //         part.match(/^https?:\/\//) ? (
// // // // // // //           <a key={i} href={part} target="_blank" rel="noreferrer"
// // // // // // //             className="text-indigo-400 underline hover:text-indigo-300 break-all">
// // // // // // //             {part}
// // // // // // //           </a>
// // // // // // //         ) : (
// // // // // // //           <span key={i} style={{ whiteSpace: 'pre-wrap' }}>{part}</span>
// // // // // // //         )
// // // // // // //       )}
// // // // // // //     </>
// // // // // // //   )
// // // // // // // }

// // // // // // // // ── Tool trace (collapsible) ──────────────────────────────────────────────────
// // // // // // // function ToolTrace({ msg }) {
// // // // // // //   const [open, setOpen] = useState(false)
// // // // // // //   const isCall = msg.role === 'tool_call'
// // // // // // //   const label  = isCall ? 'Called' : 'Response'
// // // // // // //   const name   = isCall ? msg.toolName : msg.agent
// // // // // // //   const body   = prettyJSON(isCall ? msg.toolArgs : msg.toolResponse)

// // // // // // //   return (
// // // // // // //     <button onClick={() => setOpen(o => !o)}
// // // // // // //       className="text-left w-full py-1.5 border-b border-white/[0.04] last:border-0">
// // // // // // //       <div className="flex items-center gap-1.5">
// // // // // // //         <span className={`text-[10px] font-semibold ${isCall ? 'text-indigo-400/60' : 'text-emerald-400/50'}`}>
// // // // // // //           {label}{name ? `: ${name}` : ''}
// // // // // // //         </span>
// // // // // // //         <span className="ml-auto text-white/20"><IconChevron open={open} /></span>
// // // // // // //       </div>
// // // // // // //       {open && (
// // // // // // //         <pre className="mt-1.5 text-[10px] text-white/20 font-mono whitespace-pre-wrap break-all leading-relaxed">
// // // // // // //           {body}
// // // // // // //         </pre>
// // // // // // //       )}
// // // // // // //     </button>
// // // // // // //   )
// // // // // // // }

// // // // // // // // ── Grouped tool trace pill ───────────────────────────────────────────────────
// // // // // // // export function TraceGroup({ items }) {
// // // // // // //   const [open, setOpen] = useState(false)
// // // // // // //   const calls     = items.filter(m => m.role === 'tool_call')
// // // // // // //   const toolNames = [...new Set(calls.map(m => m.toolName).filter(Boolean))]
// // // // // // //   const label     = toolNames.length > 0 ? toolNames.join(', ') : `${calls.length} tool${calls.length !== 1 ? 's' : ''}`

// // // // // // //   return (
// // // // // // //     <div className="self-start">
// // // // // // //       <button onClick={() => setOpen(o => !o)}
// // // // // // //         className="flex items-center gap-1.5 px-2.5 py-1.5
// // // // // // //                    bg-white/[0.03] border border-white/[0.06] rounded-full
// // // // // // //                    text-[11px] text-white/30 hover:text-white/50 hover:bg-white/[0.05]
// // // // // // //                    transition-all cursor-pointer">
// // // // // // //         <span className="text-indigo-400/50"><IconTool /></span>
// // // // // // //         <span>Used <span className="text-indigo-400/70 font-medium">{label}</span></span>
// // // // // // //         <span className="text-white/25"><IconChevron open={open} /></span>
// // // // // // //       </button>

// // // // // // //       {open && (
// // // // // // //         <div className="mt-2 bg-[#0a0a10] border border-white/[0.06]
// // // // // // //                         rounded-xl px-3 py-1 max-h-48 overflow-y-auto vw-scroll">
// // // // // // //           {items.map((m, i) => <ToolTrace key={i} msg={m} />)}
// // // // // // //         </div>
// // // // // // //       )}
// // // // // // //     </div>
// // // // // // //   )
// // // // // // // }

// // // // // // // // ── Thinking dots ─────────────────────────────────────────────────────────────
// // // // // // // export function ThinkingBubble() {
// // // // // // //   return (
// // // // // // //     <div className="self-start flex items-center gap-1.5
// // // // // // //                     bg-[#1e1e2a] border border-white/[0.06]
// // // // // // //                     rounded-2xl rounded-bl-sm px-4 py-3">
// // // // // // //       <div className="vw-dot" />
// // // // // // //       <div className="vw-dot" />
// // // // // // //       <div className="vw-dot" />
// // // // // // //     </div>
// // // // // // //   )
// // // // // // // }

// // // // // // // // ── Single message bubble ─────────────────────────────────────────────────────
// // // // // // // export function Message({ msg }) {
// // // // // // //   if (msg.role === 'thinking') return <ThinkingBubble />

// // // // // // //   const isUser = msg.role === 'user'
// // // // // // //   const isErr  = msg.role === 'error'

// // // // // // //   return (
// // // // // // //     <div className={`flex flex-col gap-1 max-w-[85%] ${isUser ? 'self-end items-end' : 'self-start items-start'}`}>
// // // // // // //       <div className={`px-3.5 py-2.5 text-[13px] leading-relaxed break-words rounded-2xl
// // // // // // //         ${isUser
// // // // // // //           ? 'bg-indigo-500 text-white rounded-br-sm'
// // // // // // //           : isErr
// // // // // // //             ? 'bg-red-500/10 text-red-400 border border-red-500/20 rounded-bl-sm'
// // // // // // //             : 'bg-[#1e1e2a] text-[#e8e8f2] border border-white/[0.06] rounded-bl-sm vw-prose'
// // // // // // //         }`}>
// // // // // // //         {isUser || isErr
// // // // // // //           ? msg.content
// // // // // // //           : <AssistantText content={msg.content || ''} />
// // // // // // //         }
// // // // // // //       </div>
// // // // // // //       <span className="text-[10px] text-white/20 px-1">{fmtTime(msg.ts)}</span>
// // // // // // //     </div>
// // // // // // //   )
// // // // // // // }

// // // // // // // // ── Group messages — batch tool calls into one trace pill ─────────────────────
// // // // // // // export function groupMessages(messages) {
// // // // // // //   const groups = []
// // // // // // //   let batch = []

// // // // // // //   for (const msg of messages) {
// // // // // // //     if (msg.role === 'tool_call' || msg.role === 'tool_response') {
// // // // // // //       batch.push(msg)
// // // // // // //     } else {
// // // // // // //       if (batch.length > 0) { groups.push({ type: 'trace', items: batch }); batch = [] }
// // // // // // //       groups.push({ type: 'message', msg })
// // // // // // //     }
// // // // // // //   }
// // // // // // //   if (batch.length > 0) groups.push({ type: 'trace', items: batch })
// // // // // // //   return groups
// // // // // // // }

// // // // // // import React, { useState } from 'react'
// // // // // // import { IconTool, IconChevron } from './Icons'

// // // // // // function fmtTime(ts) {
// // // // // //   if (!ts) return ''
// // // // // //   return new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
// // // // // // }

// // // // // // function prettyJSON(val) {
// // // // // //   if (!val) return ''
// // // // // //   // If it's a JSON-escaped string (booking agent returns this), unwrap it first
// // // // // //   if (typeof val === 'string') {
// // // // // //     try {
// // // // // //       const trimmed = val.trim()
// // // // // //       if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
// // // // // //         val = JSON.parse(trimmed)
// // // // // //       } else {
// // // // // //         const parsed = JSON.parse(trimmed)
// // // // // //         return JSON.stringify(parsed, null, 2)
// // // // // //       }
// // // // // //     } catch (_) {}
// // // // // //     // Normalise escaped newlines for readability
// // // // // //     return val.replace(/\n/g, '\n')
// // // // // //   }
// // // // // //   try { return JSON.stringify(val, null, 2) } catch { return String(val) }
// // // // // // }

// // // // // // // ── Render assistant text with newlines + clickable URLs ──────────────────────
// // // // // // function AssistantText({ content }) {
// // // // // //   const parts = content.split(/(https?:\/\/[^\s]+)/g)
// // // // // //   return (
// // // // // //     <>
// // // // // //       {parts.map((part, i) =>
// // // // // //         part.match(/^https?:\/\//) ? (
// // // // // //           <a key={i} href={part} target="_blank" rel="noreferrer"
// // // // // //             className="text-indigo-400 underline hover:text-indigo-300 break-all">
// // // // // //             {part}
// // // // // //           </a>
// // // // // //         ) : (
// // // // // //           <span key={i} style={{ whiteSpace: 'pre-wrap' }}>{part}</span>
// // // // // //         )
// // // // // //       )}
// // // // // //     </>
// // // // // //   )
// // // // // // }

// // // // // // // ── Tool trace (collapsible) ──────────────────────────────────────────────────
// // // // // // function ToolTrace({ msg }) {
// // // // // //   const [open, setOpen] = useState(false)
// // // // // //   const isCall = msg.role === 'tool_call'
// // // // // //   const label  = isCall ? 'Called' : 'Response'
// // // // // //   const name   = isCall ? msg.toolName : msg.agent
// // // // // //   const body   = prettyJSON(isCall ? msg.toolArgs : msg.toolResponse)

// // // // // //   return (
// // // // // //     <button onClick={() => setOpen(o => !o)}
// // // // // //       className="text-left w-full py-1.5 border-b border-white/[0.04] last:border-0">
// // // // // //       <div className="flex items-center gap-1.5">
// // // // // //         <span className={`text-[10px] font-semibold ${isCall ? 'text-indigo-400/60' : 'text-emerald-400/50'}`}>
// // // // // //           {label}{name ? `: ${name}` : ''}
// // // // // //         </span>
// // // // // //         <span className="ml-auto text-white/20"><IconChevron open={open} /></span>
// // // // // //       </div>
// // // // // //       {open && (
// // // // // //         <pre className="mt-1.5 text-[10px] text-white/20 font-mono whitespace-pre-wrap break-all leading-relaxed">
// // // // // //           {body}
// // // // // //         </pre>
// // // // // //       )}
// // // // // //     </button>
// // // // // //   )
// // // // // // }

// // // // // // // ── Grouped tool trace pill ───────────────────────────────────────────────────
// // // // // // export function TraceGroup({ items }) {
// // // // // //   const [open, setOpen] = useState(false)
// // // // // //   // Only show tool_calls in the pill label, ignore internal tool_responses
// // // // // //   const calls     = items.filter(m => m.role === 'tool_call')
// // // // // //   const toolNames = [...new Set(calls.map(m => m.toolName).filter(Boolean))]
// // // // // //   const label     = toolNames.length > 0 ? toolNames.join(', ') : `${calls.length} tool${calls.length !== 1 ? 's' : ''}`

// // // // // //   return (
// // // // // //     <div className="self-start">
// // // // // //       <button onClick={() => setOpen(o => !o)}
// // // // // //         className="flex items-center gap-1.5 px-2.5 py-1.5
// // // // // //                    bg-white/[0.03] border border-white/[0.06] rounded-full
// // // // // //                    text-[11px] text-white/30 hover:text-white/50 hover:bg-white/[0.05]
// // // // // //                    transition-all cursor-pointer">
// // // // // //         <span className="text-indigo-400/50"><IconTool /></span>
// // // // // //         <span>Used <span className="text-indigo-400/70 font-medium">{label}</span></span>
// // // // // //         <span className="text-white/25"><IconChevron open={open} /></span>
// // // // // //       </button>

// // // // // //       {open && (
// // // // // //         <div className="mt-2 bg-[#0a0a10] border border-white/[0.06]
// // // // // //                         rounded-xl px-3 py-1 max-h-48 overflow-y-auto vw-scroll">
// // // // // //           {items.map((m, i) => <ToolTrace key={i} msg={m} />)}
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   )
// // // // // // }

// // // // // // // ── Thinking dots ─────────────────────────────────────────────────────────────
// // // // // // export function ThinkingBubble() {
// // // // // //   return (
// // // // // //     <div className="self-start flex items-center gap-1.5
// // // // // //                     bg-[#1e1e2a] border border-white/[0.06]
// // // // // //                     rounded-2xl rounded-bl-sm px-4 py-3">
// // // // // //       <div className="vw-dot" />
// // // // // //       <div className="vw-dot" />
// // // // // //       <div className="vw-dot" />
// // // // // //     </div>
// // // // // //   )
// // // // // // }

// // // // // // // ── Single message bubble ─────────────────────────────────────────────────────
// // // // // // export function Message({ msg }) {
// // // // // //   if (msg.role === 'thinking') return <ThinkingBubble />

// // // // // //   const isUser = msg.role === 'user'
// // // // // //   const isErr  = msg.role === 'error'

// // // // // //   return (
// // // // // //     <div className={`flex flex-col gap-1 max-w-[85%] ${isUser ? 'self-end items-end' : 'self-start items-start'}`}>
// // // // // //       <div className={`px-3.5 py-2.5 text-[13px] leading-relaxed break-words rounded-2xl
// // // // // //         ${isUser
// // // // // //           ? 'bg-indigo-500 text-white rounded-br-sm'
// // // // // //           : isErr
// // // // // //             ? 'bg-red-500/10 text-red-400 border border-red-500/20 rounded-bl-sm'
// // // // // //             : 'bg-[#1e1e2a] text-[#e8e8f2] border border-white/[0.06] rounded-bl-sm vw-prose'
// // // // // //         }`}>
// // // // // //         {isUser || isErr
// // // // // //           ? msg.content
// // // // // //           : <AssistantText content={msg.content || ''} />
// // // // // //         }
// // // // // //       </div>
// // // // // //       <span className="text-[10px] text-white/20 px-1">{fmtTime(msg.ts)}</span>
// // // // // //     </div>
// // // // // //   )
// // // // // // }

// // // // // // // ── Group messages — batch tool calls into one trace pill ─────────────────────
// // // // // // export function groupMessages(messages) {
// // // // // //   const groups = []
// // // // // //   let batch = []

// // // // // //   for (const msg of messages) {
// // // // // //     if (msg.role === 'tool_call' || msg.role === 'tool_response') {
// // // // // //       batch.push(msg)
// // // // // //     } else {
// // // // // //       if (batch.length > 0) { groups.push({ type: 'trace', items: batch }); batch = [] }
// // // // // //       groups.push({ type: 'message', msg })
// // // // // //     }
// // // // // //   }
// // // // // //   if (batch.length > 0) groups.push({ type: 'trace', items: batch })
// // // // // //   return groups
// // // // // // }

// // // // // import React from 'react'

// // // // // function fmtTime(ts) {
// // // // //   if (!ts) return ''
// // // // //   return new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
// // // // // }

// // // // // function prettyJSON(val) {
// // // // //   if (!val) return ''
// // // // //   // If it's a JSON-escaped string (booking agent returns this), unwrap it first
// // // // //   if (typeof val === 'string') {
// // // // //     try {
// // // // //       const trimmed = val.trim()
// // // // //       if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
// // // // //         val = JSON.parse(trimmed)
// // // // //       } else {
// // // // //         const parsed = JSON.parse(trimmed)
// // // // //         return JSON.stringify(parsed, null, 2)
// // // // //       }
// // // // //     } catch (_) {}
// // // // //     // Normalise escaped newlines for readability
// // // // //     return val.replace(/\n/g, '\n')
// // // // //   }
// // // // //   try { return JSON.stringify(val, null, 2) } catch { return String(val) }
// // // // // }

// // // // // // ── Render markdown-like assistant text ──────────────────────────────────────
// // // // // // Handles: **bold**, * bullets, newlines, URLs
// // // // // function renderMarkdown(text) {
// // // // //   const lines = text.split('\n')
// // // // //   const result = []
// // // // //   let key = 0

// // // // //   for (let i = 0; i < lines.length; i++) {
// // // // //     const line = lines[i]

// // // // //     // Empty line → spacer
// // // // //     if (line.trim() === '') {
// // // // //       result.push(<div key={key++} className="h-2" />)
// // // // //       continue
// // // // //     }

// // // // //     // Bullet: starts with * or -
// // // // //     if (/^[*-]\s/.test(line.trim())) {
// // // // //       result.push(
// // // // //         <div key={key++} className="flex gap-2 text-[13px] leading-relaxed">
// // // // //           <span className="text-indigo-400 mt-0.5 flex-shrink-0">•</span>
// // // // //           <span>{renderInline(line.trim().slice(2))}</span>
// // // // //         </div>
// // // // //       )
// // // // //       continue
// // // // //     }

// // // // //     // Heading: starts with **text:** (bold heading pattern)
// // // // //     if (/^\*\*[^*]+\*\*:?$/.test(line.trim())) {
// // // // //       const cleaned = line.trim().replace(/\*\*/g, '').replace(/:$/, '')
// // // // //       result.push(
// // // // //         <p key={key++} className="text-[13px] font-semibold text-[#e8e8f2] mt-2 first:mt-0">
// // // // //           {cleaned}
// // // // //         </p>
// // // // //       )
// // // // //       continue
// // // // //     }

// // // // //     // Normal line
// // // // //     result.push(
// // // // //       <p key={key++} className="text-[13px] leading-relaxed">
// // // // //         {renderInline(line)}
// // // // //       </p>
// // // // //     )
// // // // //   }

// // // // //   return result
// // // // // }

// // // // // function renderInline(text) {
// // // // //   // Split by **bold**, URLs
// // // // //   const parts = text.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s]+)/g)
// // // // //   return parts.map((part, i) => {
// // // // //     if (part.startsWith('**') && part.endsWith('**'))
// // // // //       return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>
// // // // //     if (part.match(/^https?:\/\//))
// // // // //       return <a key={i} href={part} target="_blank" rel="noreferrer"
// // // // //         className="text-indigo-400 underline hover:text-indigo-300 break-all">{part}</a>
// // // // //     return <span key={i}>{part}</span>
// // // // //   })
// // // // // }

// // // // // function AssistantText({ content }) {
// // // // //   return <>{renderMarkdown(content)}</>
// // // // // }

// // // // // // ── Tool trace (collapsible) ──────────────────────────────────────────────────
// // // // // function ToolTrace() {
// // // // //   return null
// // // // // }

// // // // // // ── Grouped tool trace pill ───────────────────────────────────────────────────
// // // // // export function TraceGroup({ items }) {
// // // // //   return null
// // // // // }

// // // // // // ── Thinking dots ─────────────────────────────────────────────────────────────
// // // // // export function ThinkingBubble() {
// // // // //   return (
// // // // //     <div className="self-start flex items-center gap-1.5
// // // // //                     bg-[#1e1e2a] border border-white/[0.06]
// // // // //                     rounded-2xl rounded-bl-sm px-4 py-3">
// // // // //       <div className="vw-dot" />
// // // // //       <div className="vw-dot" />
// // // // //       <div className="vw-dot" />
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // // ── Single message bubble ─────────────────────────────────────────────────────
// // // // // export function Message({ msg }) {
// // // // //   if (msg.role === 'thinking') return <ThinkingBubble />

// // // // //   const isUser = msg.role === 'user'
// // // // //   const isErr  = msg.role === 'error'

// // // // //   return (
// // // // //     <div className={`flex flex-col gap-1 max-w-[85%] ${isUser ? 'self-end items-end' : 'self-start items-start'}`}>
// // // // //       <div className={`px-3.5 py-2.5 text-[13px] leading-relaxed break-words rounded-2xl
// // // // //         ${isUser
// // // // //           ? 'bg-indigo-500 text-white rounded-br-sm'
// // // // //           : isErr
// // // // //             ? 'bg-red-500/10 text-red-400 border border-red-500/20 rounded-bl-sm'
// // // // //             : 'bg-[#1e1e2a] text-[#e8e8f2] border border-white/[0.06] rounded-bl-sm vw-prose'
// // // // //         }`}>
// // // // //         {isUser || isErr
// // // // //           ? msg.content
// // // // //           : <AssistantText content={msg.content || ''} />
// // // // //         }
// // // // //       </div>
// // // // //       <span className="text-[10px] text-white/20 px-1">{fmtTime(msg.ts)}</span>
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // // ── Group messages — batch tool calls into one trace pill ─────────────────────
// // // // // export function groupMessages(messages) {
// // // // //   return messages
// // // // //     .filter(msg => msg.role !== 'tool_call' && msg.role !== 'tool_response')
// // // // //     .map(msg => ({ type: 'message', msg }))
// // // // // }
// // // // import React, { useState } from 'react'

// // // // function fmtTime(ts) {
// // // //   if (!ts) return ''
// // // //   return new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
// // // // }

// // // // // ── Detect special UI blocks in assistant content ─────────────────────────────
// // // // // The agent wraps slot lists in  %%SLOTS%%...%%END_SLOTS%%
// // // // // and contact prompts in         %%CONTACT_FORM%%
// // // // export function parseSpecialContent(content) {
// // // //   if (!content) return { type: 'text', content }

// // // //   const slotMatch = content.match(/%%SLOTS%%([\s\S]*?)%%END_SLOTS%%/i)
// // // //   if (slotMatch) {
// // // //     const before = content.slice(0, slotMatch.index).trim()
// // // //     const after  = content.slice(slotMatch.index + slotMatch[0].length).trim()
// // // //     const slots  = slotMatch[1]
// // // //       .split('\n')
// // // //       .map(l => l.trim())
// // // //       .filter(Boolean)
// // // //     return { type: 'slots', before, after, slots }
// // // //   }

// // // //   if (content.includes('%%CONTACT_FORM%%')) {
// // // //     const before = content.replace('%%CONTACT_FORM%%', '').trim()
// // // //     return { type: 'contact_form', before }
// // // //   }

// // // //   return { type: 'text', content }
// // // // }

// // // // // ── Slot picker ───────────────────────────────────────────────────────────────
// // // // function SlotPicker({ before, after, slots, onSelect, disabled }) {
// // // //   const [selected, setSelected] = useState(null)

// // // //   function handleClick(slot) {
// // // //     if (disabled || selected) return
// // // //     setSelected(slot)
// // // //     onSelect(slot)
// // // //   }

// // // //   return (
// // // //     <div className="flex flex-col gap-2">
// // // //       {before && (
// // // //         <p className="text-[13px] leading-relaxed text-[#e8e8f2] mb-1">{before}</p>
// // // //       )}
// // // //       <div className="flex flex-col gap-1.5">
// // // //         {slots.map((slot, i) => (
// // // //           <button
// // // //             key={i}
// // // //             onClick={() => handleClick(slot)}
// // // //             disabled={disabled || !!selected}
// // // //             className={`
// // // //               text-left px-3.5 py-2.5 rounded-xl text-[13px] font-medium
// // // //               border transition-all duration-150
// // // //               ${selected === slot
// // // //                 ? 'bg-indigo-500 border-indigo-500 text-white'
// // // //                 : selected
// // // //                   ? 'bg-white/[0.02] border-white/[0.06] text-white/30 cursor-not-allowed'
// // // //                   : 'bg-[#1a1a26] border-white/[0.08] text-[#e8e8f2] hover:bg-indigo-500/10 hover:border-indigo-500/40 cursor-pointer'
// // // //               }
// // // //             `}
// // // //           >
// // // //             {slot}
// // // //           </button>
// // // //         ))}
// // // //       </div>
// // // //       {after && (
// // // //         <p className="text-[13px] leading-relaxed text-[#e8e8f2] mt-1">{after}</p>
// // // //       )}
// // // //     </div>
// // // //   )
// // // // }

// // // // // ── Contact form ──────────────────────────────────────────────────────────────
// // // // function ContactForm({ before, onSubmit, disabled }) {
// // // //   const [name,      setName]      = useState('')
// // // //   const [email,     setEmail]     = useState('')
// // // //   const [submitted, setSubmitted] = useState(false)
// // // //   const [error,     setError]     = useState('')

// // // //   function handleSubmit() {
// // // //     if (!name.trim())  { setError('Please enter your name.');  return }
// // // //     if (!email.trim()) { setError('Please enter your email.'); return }
// // // //     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
// // // //       setError('Please enter a valid email address.')
// // // //       return
// // // //     }
// // // //     setError('')
// // // //     setSubmitted(true)
// // // //      onSubmit(`CUSTOMER_NAME: ${name.trim()} | CUSTOMER_EMAIL: ${email.trim()}`)
// // // //   }

// // // //   return (
// // // //     <div className="flex flex-col gap-3">
// // // //       {before && (
// // // //         <p className="text-[13px] leading-relaxed text-[#e8e8f2]">{before}</p>
// // // //       )}

// // // //       <div className="flex flex-col gap-2">
// // // //         <input
// // // //           type="text"
// // // //           placeholder="Your full name"
// // // //           value={name}
// // // //           onChange={e => setName(e.target.value)}
// // // //           disabled={disabled || submitted}
// // // //           className="
// // // //             bg-[#1a1a26] border border-white/[0.08] rounded-xl
// // // //             px-3.5 py-2.5 text-[13px] text-[#e8e8f2] placeholder-white/25
// // // //             outline-none focus:border-indigo-500/50 disabled:opacity-50
// // // //             transition-colors duration-150
// // // //           "
// // // //         />
// // // //         <input
// // // //           type="email"
// // // //           placeholder="Your email address"
// // // //           value={email}
// // // //           onChange={e => setEmail(e.target.value)}
// // // //           disabled={disabled || submitted}
// // // //           onKeyDown={e => e.key === 'Enter' && handleSubmit()}
// // // //           className="
// // // //             bg-[#1a1a26] border border-white/[0.08] rounded-xl
// // // //             px-3.5 py-2.5 text-[13px] text-[#e8e8f2] placeholder-white/25
// // // //             outline-none focus:border-indigo-500/50 disabled:opacity-50
// // // //             transition-colors duration-150
// // // //           "
// // // //         />
// // // //         {error && (
// // // //           <p className="text-[12px] text-red-400">{error}</p>
// // // //         )}
// // // //       </div>

// // // //       {submitted ? (
// // // //         <p className="text-[13px] text-emerald-400">✓ Details submitted</p>
// // // //       ) : (
// // // //         <button
// // // //           onClick={handleSubmit}
// // // //           disabled={disabled}
// // // //           className="
// // // //             self-start px-4 py-2 rounded-xl text-[13px] font-medium
// // // //             bg-indigo-500 text-white
// // // //             hover:bg-indigo-400 active:scale-95
// // // //             disabled:bg-white/10 disabled:cursor-not-allowed
// // // //             transition-all duration-150
// // // //           "
// // // //         >
// // // //           Confirm booking
// // // //         </button>
// // // //       )}
// // // //     </div>
// // // //   )
// // // // }

// // // // // ── Render markdown-like assistant text ──────────────────────────────────────
// // // // function renderMarkdown(text) {
// // // //   const lines  = text.split('\n')
// // // //   const result = []
// // // //   let key = 0

// // // //   for (const line of lines) {
// // // //     if (line.trim() === '') {
// // // //       result.push(<div key={key++} className="h-2" />)
// // // //       continue
// // // //     }
// // // //     if (/^[*-]\s/.test(line.trim())) {
// // // //       result.push(
// // // //         <div key={key++} className="flex gap-2 text-[13px] leading-relaxed">
// // // //           <span className="text-indigo-400 mt-0.5 flex-shrink-0">•</span>
// // // //           <span>{renderInline(line.trim().slice(2))}</span>
// // // //         </div>
// // // //       )
// // // //       continue
// // // //     }
// // // //     result.push(
// // // //       <p key={key++} className="text-[13px] leading-relaxed">{renderInline(line)}</p>
// // // //     )
// // // //   }
// // // //   return result
// // // // }

// // // // function renderInline(text) {
// // // //   const parts = text.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s]+)/g)
// // // //   return parts.map((part, i) => {
// // // //     if (part.startsWith('**') && part.endsWith('**'))
// // // //       return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>
// // // //     if (part.match(/^https?:\/\//))
// // // //       return <a key={i} href={part} target="_blank" rel="noreferrer"
// // // //         className="text-indigo-400 underline hover:text-indigo-300 break-all">{part}</a>
// // // //     return <span key={i}>{part}</span>
// // // //   })
// // // // }

// // // // function AssistantText({ content }) {
// // // //   return <>{renderMarkdown(content)}</>
// // // // }

// // // // // ── Thinking dots ─────────────────────────────────────────────────────────────
// // // // export function ThinkingBubble() {
// // // //   return (
// // // //     <div className="self-start flex items-center gap-1.5
// // // //                     bg-[#1e1e2a] border border-white/[0.06]
// // // //                     rounded-2xl rounded-bl-sm px-4 py-3">
// // // //       <div className="vw-dot" />
// // // //       <div className="vw-dot" />
// // // //       <div className="vw-dot" />
// // // //     </div>
// // // //   )
// // // // }

// // // // // ── Single message bubble ─────────────────────────────────────────────────────
// // // // export function Message({ msg, onInteract, isLoading }) {
// // // //   if (msg.role === 'thinking') return <ThinkingBubble />

// // // //   const isUser = msg.role === 'user'
// // // //   const isErr  = msg.role === 'error'

// // // //   if (!isUser && !isErr) {
// // // //     const parsed = parseSpecialContent(msg.content)

// // // //     if (parsed.type === 'slots') {
// // // //       return (
// // // //         <div className="self-start flex flex-col gap-1 max-w-[85%]">
// // // //           <div className="px-3.5 py-3 bg-[#1e1e2a] border border-white/[0.06] rounded-2xl rounded-bl-sm">
// // // //             <SlotPicker
// // // //               before={parsed.before}
// // // //               after={parsed.after}
// // // //               slots={parsed.slots}
// // // //               onSelect={onInteract}
// // // //               disabled={isLoading}
// // // //             />
// // // //           </div>
// // // //           <span className="text-[10px] text-white/20 px-1">{fmtTime(msg.ts)}</span>
// // // //         </div>
// // // //       )
// // // //     }

// // // //     if (parsed.type === 'contact_form') {
// // // //       return (
// // // //         <div className="self-start flex flex-col gap-1 max-w-[85%]">
// // // //           <div className="px-3.5 py-3 bg-[#1e1e2a] border border-white/[0.06] rounded-2xl rounded-bl-sm">
// // // //             <ContactForm
// // // //               before={parsed.before}
// // // //               onSubmit={onInteract}
// // // //               disabled={isLoading}
// // // //             />
// // // //           </div>
// // // //           <span className="text-[10px] text-white/20 px-1">{fmtTime(msg.ts)}</span>
// // // //         </div>
// // // //       )
// // // //     }
// // // //   }

// // // //   return (
// // // //     <div className={`flex flex-col gap-1 max-w-[85%] ${isUser ? 'self-end items-end' : 'self-start items-start'}`}>
// // // //       <div className={`px-3.5 py-2.5 text-[13px] leading-relaxed break-words rounded-2xl
// // // //         ${isUser
// // // //           ? 'bg-indigo-500 text-white rounded-br-sm'
// // // //           : isErr
// // // //             ? 'bg-red-500/10 text-red-400 border border-red-500/20 rounded-bl-sm'
// // // //             : 'bg-[#1e1e2a] text-[#e8e8f2] border border-white/[0.06] rounded-bl-sm'
// // // //         }`}>
// // // //         {isUser || isErr
// // // //           ? msg.content
// // // //           : <AssistantText content={msg.content || ''} />
// // // //         }
// // // //       </div>
// // // //       <span className="text-[10px] text-white/20 px-1">{fmtTime(msg.ts)}</span>
// // // //     </div>
// // // //   )
// // // // }

// // // // // ── Group messages ────────────────────────────────────────────────────────────
// // // // export function TraceGroup() { return null }

// // // // export function groupMessages(messages) {
// // // //   return messages
// // // //     .filter(msg => msg.role !== 'tool_call' && msg.role !== 'tool_response')
// // // //     .map(msg => ({ type: 'message', msg }))
// // // // }

// // // import React, { useState } from 'react'

// // // function fmtTime(ts) {
// // //   if (!ts) return ''
// // //   return new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
// // // }

// // // // ── Detect special UI blocks in assistant content ─────────────────────────────
// // // // %%SLOTS%%...%%END_SLOTS%%     → slot picker buttons
// // // // %%CONTACT_FORM%%              → name/email form
// // // // %%LOGIN_BUTTONS%%             → login / signup buttons
// // // export function parseSpecialContent(content) {
// // //   if (!content) return { type: 'text', content }

// // //   const slotMatch = content.match(/%%SLOTS%%([\s\S]*?)%%END_SLOTS%%/i)
// // //   if (slotMatch) {
// // //     const before = content.slice(0, slotMatch.index).trim()
// // //     const after  = content.slice(slotMatch.index + slotMatch[0].length).trim()
// // //     const slots  = slotMatch[1]
// // //       .split('\n')
// // //       .map(l => l.trim())
// // //       .filter(Boolean)
// // //     return { type: 'slots', before, after, slots }
// // //   }

// // //   if (content.includes('%%CONTACT_FORM%%')) {
// // //     const before = content.replace('%%CONTACT_FORM%%', '').trim()
// // //     return { type: 'contact_form', before }
// // //   }

// // //   // LOGIN_BUTTONS marker — agent asks "do you have an account?"
// // //   if (content.includes('%%LOGIN_BUTTONS%%')) {
// // //     const before = content.replace('%%LOGIN_BUTTONS%%', '').trim()
// // //     return { type: 'login_buttons', before }
// // //   }

// // //   return { type: 'text', content }
// // // }

// // // // ── Login / Signup buttons ────────────────────────────────────────────────────
// // // function LoginButtons({ before }) {
// // //   return (
// // //     <div className="flex flex-col gap-3">
// // //       {before && (
// // //         <p className="text-[13px] leading-relaxed text-[#e8e8f2]">{before}</p>
// // //       )}
// // //       <div className="flex flex-col gap-2">
// // //         {/* Login */}
// // //         <a
// // //           href="https://console.condense.zeliot.in/"
// // //           target="_blank"
// // //           rel="noreferrer"
// // //           className="
// // //             flex items-center justify-center gap-2
// // //             px-4 py-2.5 rounded-xl text-[13px] font-semibold
// // //             bg-indigo-500 text-white
// // //             hover:bg-indigo-400 active:scale-95
// // //             transition-all duration-150 no-underline
// // //           "
// // //         >
// // //           🔑 Login to Condense Console
// // //         </a>

// // //         {/* Sign up */}
// // //         <a
// // //           href="https://console.condense.zeliot.in/try-for-free?utm_source=condense_agent&utm_medium=website_chat_widget"
// // //           target="_blank"
// // //           rel="noreferrer"
// // //           className="
// // //             flex items-center justify-center gap-2
// // //             px-4 py-2.5 rounded-xl text-[13px] font-semibold
// // //             bg-emerald-500 text-white
// // //             hover:bg-emerald-400 active:scale-95
// // //             transition-all duration-150 no-underline
// // //           "
// // //         >
// // //           🚀 Sign Up — Try for Free
// // //         </a>
// // //       </div>
// // //     </div>
// // //   )
// // // }

// // // // ── Slot picker ───────────────────────────────────────────────────────────────
// // // function SlotPicker({ before, after, slots, onSelect, disabled }) {
// // //   const [selected, setSelected] = useState(null)

// // //   function handleClick(slot) {
// // //     if (disabled || selected) return
// // //     setSelected(slot)
// // //     onSelect(slot)
// // //   }

// // //   return (
// // //     <div className="flex flex-col gap-2">
// // //       {before && (
// // //         <p className="text-[13px] leading-relaxed text-[#e8e8f2] mb-1">{before}</p>
// // //       )}
// // //       <div className="flex flex-col gap-1.5">
// // //         {slots.map((slot, i) => (
// // //           <button
// // //             key={i}
// // //             onClick={() => handleClick(slot)}
// // //             disabled={disabled || !!selected}
// // //             className={`
// // //               text-left px-3.5 py-2.5 rounded-xl text-[13px] font-medium
// // //               border transition-all duration-150
// // //               ${selected === slot
// // //                 ? 'bg-indigo-500 border-indigo-500 text-white'
// // //                 : selected
// // //                   ? 'bg-white/[0.02] border-white/[0.06] text-white/30 cursor-not-allowed'
// // //                   : 'bg-[#1a1a26] border-white/[0.08] text-[#e8e8f2] hover:bg-indigo-500/10 hover:border-indigo-500/40 cursor-pointer'
// // //               }
// // //             `}
// // //           >
// // //             {slot}
// // //           </button>
// // //         ))}
// // //       </div>
// // //       {after && (
// // //         <p className="text-[13px] leading-relaxed text-[#e8e8f2] mt-1">{after}</p>
// // //       )}
// // //     </div>
// // //   )
// // // }

// // // // ── Contact form ──────────────────────────────────────────────────────────────
// // // function ContactForm({ before, onSubmit, disabled }) {
// // //   const [name,      setName]      = useState('')
// // //   const [email,     setEmail]     = useState('')
// // //   const [submitted, setSubmitted] = useState(false)
// // //   const [error,     setError]     = useState('')

// // //   function handleSubmit() {
// // //     if (!name.trim())  { setError('Please enter your name.');  return }
// // //     if (!email.trim()) { setError('Please enter your email.'); return }
// // //     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
// // //       setError('Please enter a valid email address.')
// // //       return
// // //     }
// // //     setError('')
// // //     setSubmitted(true)
// // //     onSubmit(`CUSTOMER_NAME: ${name.trim()} | CUSTOMER_EMAIL: ${email.trim()}`)
// // //   }

// // //   return (
// // //     <div className="flex flex-col gap-3">
// // //       {before && (
// // //         <p className="text-[13px] leading-relaxed text-[#e8e8f2]">{before}</p>
// // //       )}

// // //       <div className="flex flex-col gap-2">
// // //         <input
// // //           type="text"
// // //           placeholder="Your full name"
// // //           value={name}
// // //           onChange={e => setName(e.target.value)}
// // //           disabled={disabled || submitted}
// // //           className="
// // //             bg-[#1a1a26] border border-white/[0.08] rounded-xl
// // //             px-3.5 py-2.5 text-[13px] text-[#e8e8f2] placeholder-white/25
// // //             outline-none focus:border-indigo-500/50 disabled:opacity-50
// // //             transition-colors duration-150
// // //           "
// // //         />
// // //         <input
// // //           type="email"
// // //           placeholder="Your email address"
// // //           value={email}
// // //           onChange={e => setEmail(e.target.value)}
// // //           disabled={disabled || submitted}
// // //           onKeyDown={e => e.key === 'Enter' && handleSubmit()}
// // //           className="
// // //             bg-[#1a1a26] border border-white/[0.08] rounded-xl
// // //             px-3.5 py-2.5 text-[13px] text-[#e8e8f2] placeholder-white/25
// // //             outline-none focus:border-indigo-500/50 disabled:opacity-50
// // //             transition-colors duration-150
// // //           "
// // //         />
// // //         {error && (
// // //           <p className="text-[12px] text-red-400">{error}</p>
// // //         )}
// // //       </div>

// // //       {submitted ? (
// // //         <p className="text-[13px] text-emerald-400">✓ Details submitted</p>
// // //       ) : (
// // //         <button
// // //           onClick={handleSubmit}
// // //           disabled={disabled}
// // //           className="
// // //             self-start px-4 py-2 rounded-xl text-[13px] font-medium
// // //             bg-indigo-500 text-white
// // //             hover:bg-indigo-400 active:scale-95
// // //             disabled:bg-white/10 disabled:cursor-not-allowed
// // //             transition-all duration-150
// // //           "
// // //         >
// // //           Confirm booking
// // //         </button>
// // //       )}
// // //     </div>
// // //   )
// // // }

// // // // ── Render markdown-like assistant text ──────────────────────────────────────
// // // function renderMarkdown(text) {
// // //   const lines  = text.split('\n')
// // //   const result = []
// // //   let key = 0

// // //   for (const line of lines) {
// // //     if (line.trim() === '') {
// // //       result.push(<div key={key++} className="h-2" />)
// // //       continue
// // //     }
// // //     if (/^[*-]\s/.test(line.trim())) {
// // //       result.push(
// // //         <div key={key++} className="flex gap-2 text-[13px] leading-relaxed">
// // //           <span className="text-indigo-400 mt-0.5 flex-shrink-0">•</span>
// // //           <span>{renderInline(line.trim().slice(2))}</span>
// // //         </div>
// // //       )
// // //       continue
// // //     }
// // //     result.push(
// // //       <p key={key++} className="text-[13px] leading-relaxed">{renderInline(line)}</p>
// // //     )
// // //   }
// // //   return result
// // // }

// // // function renderInline(text) {
// // //   const parts = text.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s]+)/g)
// // //   return parts.map((part, i) => {
// // //     if (part.startsWith('**') && part.endsWith('**'))
// // //       return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>
// // //     if (part.match(/^https?:\/\//))
// // //       return <a key={i} href={part} target="_blank" rel="noreferrer"
// // //         className="text-indigo-400 underline hover:text-indigo-300 break-all">{part}</a>
// // //     return <span key={i}>{part}</span>
// // //   })
// // // }

// // // function AssistantText({ content }) {
// // //   return <>{renderMarkdown(content)}</>
// // // }

// // // // ── Thinking dots ─────────────────────────────────────────────────────────────
// // // export function ThinkingBubble() {
// // //   return (
// // //     <div className="self-start flex items-center gap-1.5
// // //                     bg-[#1e1e2a] border border-white/[0.06]
// // //                     rounded-2xl rounded-bl-sm px-4 py-3">
// // //       <div className="vw-dot" />
// // //       <div className="vw-dot" />
// // //       <div className="vw-dot" />
// // //     </div>
// // //   )
// // // }

// // // // ── Single message bubble ─────────────────────────────────────────────────────
// // // export function Message({ msg, onInteract, isLoading }) {
// // //   if (msg.role === 'thinking') return <ThinkingBubble />

// // //   const isUser = msg.role === 'user'
// // //   const isErr  = msg.role === 'error'

// // //   if (!isUser && !isErr) {
// // //     const parsed = parseSpecialContent(msg.content)

// // //     if (parsed.type === 'login_buttons') {
// // //       return (
// // //         <div className="self-start flex flex-col gap-1 max-w-[85%]">
// // //           <div className="px-3.5 py-3 bg-[#1e1e2a] border border-white/[0.06] rounded-2xl rounded-bl-sm">
// // //             <LoginButtons before={parsed.before} />
// // //           </div>
// // //           <span className="text-[10px] text-white/20 px-1">{fmtTime(msg.ts)}</span>
// // //         </div>
// // //       )
// // //     }

// // //     if (parsed.type === 'slots') {
// // //       return (
// // //         <div className="self-start flex flex-col gap-1 max-w-[85%]">
// // //           <div className="px-3.5 py-3 bg-[#1e1e2a] border border-white/[0.06] rounded-2xl rounded-bl-sm">
// // //             <SlotPicker
// // //               before={parsed.before}
// // //               after={parsed.after}
// // //               slots={parsed.slots}
// // //               onSelect={onInteract}
// // //               disabled={isLoading}
// // //             />
// // //           </div>
// // //           <span className="text-[10px] text-white/20 px-1">{fmtTime(msg.ts)}</span>
// // //         </div>
// // //       )
// // //     }

// // //     if (parsed.type === 'contact_form') {
// // //       return (
// // //         <div className="self-start flex flex-col gap-1 max-w-[85%]">
// // //           <div className="px-3.5 py-3 bg-[#1e1e2a] border border-white/[0.06] rounded-2xl rounded-bl-sm">
// // //             <ContactForm
// // //               before={parsed.before}
// // //               onSubmit={onInteract}
// // //               disabled={isLoading}
// // //             />
// // //           </div>
// // //           <span className="text-[10px] text-white/20 px-1">{fmtTime(msg.ts)}</span>
// // //         </div>
// // //       )
// // //     }
// // //   }

// // //   return (
// // //     <div className={`flex flex-col gap-1 max-w-[85%] ${isUser ? 'self-end items-end' : 'self-start items-start'}`}>
// // //       <div className={`px-3.5 py-2.5 text-[13px] leading-relaxed break-words rounded-2xl
// // //         ${isUser
// // //           ? 'bg-indigo-500 text-white rounded-br-sm'
// // //           : isErr
// // //             ? 'bg-red-500/10 text-red-400 border border-red-500/20 rounded-bl-sm'
// // //             : 'bg-[#1e1e2a] text-[#e8e8f2] border border-white/[0.06] rounded-bl-sm'
// // //         }`}>
// // //         {isUser || isErr
// // //           ? msg.content
// // //           : <AssistantText content={msg.content || ''} />
// // //         }
// // //       </div>
// // //       <span className="text-[10px] text-white/20 px-1">{fmtTime(msg.ts)}</span>
// // //     </div>
// // //   )
// // // }

// // // // ── Group messages ────────────────────────────────────────────────────────────
// // // export function TraceGroup() { return null }

// // // export function groupMessages(messages) {
// // //   return messages
// // //     .filter(msg => msg.role !== 'tool_call' && msg.role !== 'tool_response')
// // //     .map(msg => ({ type: 'message', msg }))
// // // }

// // import React, { useState } from 'react'

// // function fmtTime(ts) {
// //   if (!ts) return ''
// //   return new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
// // }

// // // ── Detect special UI blocks ──────────────────────────────────────────────────
// // // %%BOOKING_FORM%%   → Step 1: customer name + email
// // // %%CALENDAR%%       → Step 2: date picker
// // // %%SLOTS%%...%%END_SLOTS%%  → Step 3: time slot buttons
// // // %%CONTACT_FORM%%   → legacy (kept for safety)
// // // %%LOGIN_BUTTONS%%  → login / signup buttons
// // export function parseSpecialContent(content) {
// //   if (!content) return { type: 'text', content }

// //   // Step 1 — booking form (name + email)
// //   if (content.includes('%%BOOKING_FORM%%')) {
// //     const before = content.replace('%%BOOKING_FORM%%', '').trim()
// //     return { type: 'booking_form', before }
// //   }

// //   // Step 2 — calendar date picker
// //   if (content.includes('%%CALENDAR%%')) {
// //     const before = content.replace('%%CALENDAR%%', '').trim()
// //     return { type: 'calendar', before }
// //   }

// //   // Step 3 — time slots
// //   const slotMatch = content.match(/%%SLOTS%%([\s\S]*?)%%END_SLOTS%%/i)
// //   if (slotMatch) {
// //     const before = content.slice(0, slotMatch.index).trim()
// //     const after  = content.slice(slotMatch.index + slotMatch[0].length).trim()
// //     const slots  = slotMatch[1].split('\n').map(l => l.trim()).filter(Boolean)
// //     return { type: 'slots', before, after, slots }
// //   }

// //   // Legacy contact form
// //   if (content.includes('%%CONTACT_FORM%%')) {
// //     const before = content.replace('%%CONTACT_FORM%%', '').trim()
// //     return { type: 'contact_form', before }
// //   }

// //   // Login buttons
// //   if (content.includes('%%LOGIN_BUTTONS%%')) {
// //     const before = content.replace('%%LOGIN_BUTTONS%%', '').trim()
// //     return { type: 'login_buttons', before }
// //   }

// //   return { type: 'text', content }
// // }

// // // ── Step 1: Booking Form (name + email) ───────────────────────────────────────
// // function BookingForm({ before, onSubmit, disabled }) {
// //   const [name,      setName]      = useState('')
// //   const [email,     setEmail]     = useState('')
// //   const [submitted, setSubmitted] = useState(false)
// //   const [error,     setError]     = useState('')

// //   function handleSubmit() {
// //     if (!name.trim())  { setError('Please enter your name.');  return }
// //     if (!email.trim()) { setError('Please enter your email.'); return }
// //     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
// //       setError('Please enter a valid email address.')
// //       return
// //     }
// //     setError('')
// //     setSubmitted(true)
// //     onSubmit(`CUSTOMER_NAME: ${name.trim()} | CUSTOMER_EMAIL: ${email.trim()}`)
// //   }

// //   return (
// //     <div className="flex flex-col gap-3">
// //       {before && (
// //         <p className="text-[13px] leading-relaxed text-[#e8e8f2]">{before}</p>
// //       )}

// //       {/* Step indicator */}
// //       <div className="flex items-center gap-2 mb-1">
// //         <div className="flex items-center gap-1.5">
// //           <span className="w-5 h-5 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center">1</span>
// //           <span className="text-[11px] text-white/50">Your details</span>
// //         </div>
// //         <div className="flex-1 h-px bg-white/[0.08]" />
// //         <div className="flex items-center gap-1.5">
// //           <span className="w-5 h-5 rounded-full bg-white/[0.08] text-white/30 text-[10px] font-bold flex items-center justify-center">2</span>
// //           <span className="text-[11px] text-white/30">Pick date</span>
// //         </div>
// //         <div className="flex-1 h-px bg-white/[0.08]" />
// //         <div className="flex items-center gap-1.5">
// //           <span className="w-5 h-5 rounded-full bg-white/[0.08] text-white/30 text-[10px] font-bold flex items-center justify-center">3</span>
// //           <span className="text-[11px] text-white/30">Time slot</span>
// //         </div>
// //       </div>

// //       <div className="flex flex-col gap-2">
// //         <input
// //           type="text"
// //           placeholder="Your full name"
// //           value={name}
// //           onChange={e => setName(e.target.value)}
// //           disabled={disabled || submitted}
// //           className="bg-[#1a1a26] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-[13px] text-[#e8e8f2] placeholder-white/25 outline-none focus:border-indigo-500/50 disabled:opacity-50 transition-colors duration-150"
// //         />
// //         <input
// //           type="email"
// //           placeholder="Your email address"
// //           value={email}
// //           onChange={e => setEmail(e.target.value)}
// //           disabled={disabled || submitted}
// //           onKeyDown={e => e.key === 'Enter' && handleSubmit()}
// //           className="bg-[#1a1a26] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-[13px] text-[#e8e8f2] placeholder-white/25 outline-none focus:border-indigo-500/50 disabled:opacity-50 transition-colors duration-150"
// //         />
// //         {error && <p className="text-[12px] text-red-400">{error}</p>}
// //       </div>

// //       {submitted ? (
// //         <p className="text-[13px] text-emerald-400">✓ Details saved — pick your date below!</p>
// //       ) : (
// //         <button
// //           onClick={handleSubmit}
// //           disabled={disabled}
// //           className="self-start px-4 py-2 rounded-xl text-[13px] font-semibold bg-indigo-500 text-white hover:bg-indigo-400 active:scale-95 disabled:bg-white/10 disabled:cursor-not-allowed transition-all duration-150"
// //         >
// //           Continue →
// //         </button>
// //       )}
// //     </div>
// //   )
// // }

// // // ── Step 2: Calendar date picker ──────────────────────────────────────────────
// // function CalendarPicker({ before, onSelect, disabled }) {
// //   const today = new Date()
// //   today.setHours(0, 0, 0, 0)

// //   const [viewYear,  setViewYear]  = useState(today.getFullYear())
// //   const [viewMonth, setViewMonth] = useState(today.getMonth())
// //   const [selected,  setSelected]  = useState(null)

// //   const MONTHS = ['January','February','March','April','May','June',
// //                   'July','August','September','October','November','December']
// //   const DAYS   = ['Su','Mo','Tu','We','Th','Fr','Sa']

// //   function prevMonth() {
// //     if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
// //     else setViewMonth(m => m - 1)
// //   }
// //   function nextMonth() {
// //     if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
// //     else setViewMonth(m => m + 1)
// //   }

// //   // Build calendar grid
// //   const firstDay  = new Date(viewYear, viewMonth, 1).getDay()
// //   const daysInMon = new Date(viewYear, viewMonth + 1, 0).getDate()
// //   const cells     = []
// //   for (let i = 0; i < firstDay; i++) cells.push(null)
// //   for (let d = 1; d <= daysInMon; d++) cells.push(d)

// //   function isPast(d) {
// //     const cell = new Date(viewYear, viewMonth, d)
// //     return cell < today
// //   }
// //   function isWeekend(d) {
// //     const day = new Date(viewYear, viewMonth, d).getDay()
// //     return day === 0 || day === 6
// //   }
// //   function isSelected(d) {
// //     if (!selected) return false
// //     return selected.d === d && selected.m === viewMonth && selected.y === viewYear
// //   }

// //   function handleDay(d) {
// //     if (!d || isPast(d) || isWeekend(d) || disabled || selected) return
// //     const chosen = { d, m: viewMonth, y: viewYear }
// //     setSelected(chosen)
// //     const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
// //     onSelect(`SELECTED_DATE: ${dateStr}`)
// //   }

// //   return (
// //     <div className="flex flex-col gap-3">
// //       {before && (
// //         <p className="text-[13px] leading-relaxed text-[#e8e8f2]">{before}</p>
// //       )}

// //       {/* Step indicator */}
// //       <div className="flex items-center gap-2 mb-1">
// //         <div className="flex items-center gap-1.5">
// //           <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] flex items-center justify-center">✓</span>
// //           <span className="text-[11px] text-white/40">Your details</span>
// //         </div>
// //         <div className="flex-1 h-px bg-white/[0.08]" />
// //         <div className="flex items-center gap-1.5">
// //           <span className="w-5 h-5 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center">2</span>
// //           <span className="text-[11px] text-white/50">Pick date</span>
// //         </div>
// //         <div className="flex-1 h-px bg-white/[0.08]" />
// //         <div className="flex items-center gap-1.5">
// //           <span className="w-5 h-5 rounded-full bg-white/[0.08] text-white/30 text-[10px] font-bold flex items-center justify-center">3</span>
// //           <span className="text-[11px] text-white/30">Time slot</span>
// //         </div>
// //       </div>

// //       {/* Month nav */}
// //       <div className="flex items-center justify-between px-1">
// //         <button
// //           onClick={prevMonth}
// //           disabled={viewYear === today.getFullYear() && viewMonth === today.getMonth()}
// //           className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
// //         >‹</button>
// //         <span className="text-[13px] font-semibold text-[#e8e8f2]">
// //           {MONTHS[viewMonth]} {viewYear}
// //         </span>
// //         <button
// //           onClick={nextMonth}
// //           className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/[0.06] transition-all"
// //         >›</button>
// //       </div>

// //       {/* Day headers */}
// //       <div className="grid grid-cols-7 gap-0.5">
// //         {DAYS.map(d => (
// //           <div key={d} className="text-center text-[10px] text-white/30 font-medium py-1">{d}</div>
// //         ))}
// //         {cells.map((d, i) => {
// //           const past    = d ? isPast(d) : false
// //           const weekend = d ? isWeekend(d) : false
// //           const sel     = d ? isSelected(d) : false
// //           const disabled_cell = past || weekend || !d || !!selected

// //           return (
// //             <button
// //               key={i}
// //               onClick={() => handleDay(d)}
// //               disabled={disabled_cell}
// //               className={`
// //                 h-7 w-full rounded-md text-[12px] font-medium transition-all duration-100
// //                 ${!d ? 'invisible' : ''}
// //                 ${sel
// //                   ? 'bg-indigo-500 text-white'
// //                   : past || weekend
// //                     ? 'text-white/20 cursor-not-allowed'
// //                     : selected
// //                       ? 'text-white/20 cursor-not-allowed'
// //                       : 'text-[#e8e8f2] hover:bg-indigo-500/20 hover:text-white cursor-pointer'
// //                 }
// //               `}
// //             >
// //               {d || ''}
// //             </button>
// //           )
// //         })}
// //       </div>

// //       {selected && (
// //         <p className="text-[12px] text-emerald-400 mt-1">
// //           ✓ {MONTHS[selected.m]} {selected.d}, {selected.y} — fetching available slots…
// //         </p>
// //       )}
// //       {!selected && (
// //         <p className="text-[11px] text-white/25 text-center">Weekends & past dates unavailable</p>
// //       )}
// //     </div>
// //   )
// // }

// // // ── Step 3: Slot picker ───────────────────────────────────────────────────────
// // function SlotPicker({ before, after, slots, onSelect, disabled }) {
// //   const [selected, setSelected] = useState(null)

// //   function handleClick(slot) {
// //     if (disabled || selected) return
// //     setSelected(slot)
// //     onSelect(slot)
// //   }

// //   return (
// //     <div className="flex flex-col gap-2">
// //       {/* Step indicator */}
// //       <div className="flex items-center gap-2 mb-1">
// //         <div className="flex items-center gap-1.5">
// //           <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] flex items-center justify-center">✓</span>
// //           <span className="text-[11px] text-white/40">Your details</span>
// //         </div>
// //         <div className="flex-1 h-px bg-white/[0.08]" />
// //         <div className="flex items-center gap-1.5">
// //           <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] flex items-center justify-center">✓</span>
// //           <span className="text-[11px] text-white/40">Date</span>
// //         </div>
// //         <div className="flex-1 h-px bg-white/[0.08]" />
// //         <div className="flex items-center gap-1.5">
// //           <span className="w-5 h-5 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center">3</span>
// //           <span className="text-[11px] text-white/50">Time slot</span>
// //         </div>
// //       </div>

// //       {before && (
// //         <p className="text-[13px] leading-relaxed text-[#e8e8f2] mb-1">{before}</p>
// //       )}
// //       <div className="flex flex-col gap-1.5">
// //         {slots.map((slot, i) => (
// //           <button
// //             key={i}
// //             onClick={() => handleClick(slot)}
// //             disabled={disabled || !!selected}
// //             className={`
// //               text-left px-3.5 py-2.5 rounded-xl text-[13px] font-medium
// //               border transition-all duration-150
// //               ${selected === slot
// //                 ? 'bg-indigo-500 border-indigo-500 text-white'
// //                 : selected
// //                   ? 'bg-white/[0.02] border-white/[0.06] text-white/30 cursor-not-allowed'
// //                   : 'bg-[#1a1a26] border-white/[0.08] text-[#e8e8f2] hover:bg-indigo-500/10 hover:border-indigo-500/40 cursor-pointer'
// //               }
// //             `}
// //           >
// //             {slot}
// //           </button>
// //         ))}
// //       </div>
// //       {after && (
// //         <p className="text-[13px] leading-relaxed text-[#e8e8f2] mt-1">{after}</p>
// //       )}
// //     </div>
// //   )
// // }

// // // ── Login / Signup buttons ────────────────────────────────────────────────────
// // function LoginButtons({ before }) {
// //   return (
// //     <div className="flex flex-col gap-3">
// //       {before && (
// //         <p className="text-[13px] leading-relaxed text-[#e8e8f2]">{before}</p>
// //       )}
// //       <div className="flex flex-col gap-2">
// //         <a
// //           href="https://console.condense.zeliot.in/"
// //           target="_blank"
// //           rel="noreferrer"
// //           className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold bg-indigo-500 text-white hover:bg-indigo-400 active:scale-95 transition-all duration-150 no-underline"
// //         >
// //           🔑 Login to Condense Console
// //         </a>
// //         <a
// //           href="https://console.condense.zeliot.in/try-for-free?utm_source=condense_agent&utm_medium=website_chat_widget"
// //           target="_blank"
// //           rel="noreferrer"
// //           className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold bg-emerald-500 text-white hover:bg-emerald-400 active:scale-95 transition-all duration-150 no-underline"
// //         >
// //           🚀 Sign Up — Try for Free
// //         </a>
// //       </div>
// //     </div>
// //   )
// // }

// // // ── Legacy contact form (kept for backward compat) ────────────────────────────
// // function ContactForm({ before, onSubmit, disabled }) {
// //   const [name,      setName]      = useState('')
// //   const [email,     setEmail]     = useState('')
// //   const [submitted, setSubmitted] = useState(false)
// //   const [error,     setError]     = useState('')

// //   function handleSubmit() {
// //     if (!name.trim())  { setError('Please enter your name.');  return }
// //     if (!email.trim()) { setError('Please enter your email.'); return }
// //     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
// //       setError('Please enter a valid email address.')
// //       return
// //     }
// //     setError('')
// //     setSubmitted(true)
// //     onSubmit(`CUSTOMER_NAME: ${name.trim()} | CUSTOMER_EMAIL: ${email.trim()}`)
// //   }

// //   return (
// //     <div className="flex flex-col gap-3">
// //       {before && <p className="text-[13px] leading-relaxed text-[#e8e8f2]">{before}</p>}
// //       <div className="flex flex-col gap-2">
// //         <input type="text" placeholder="Your full name" value={name}
// //           onChange={e => setName(e.target.value)} disabled={disabled || submitted}
// //           className="bg-[#1a1a26] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-[13px] text-[#e8e8f2] placeholder-white/25 outline-none focus:border-indigo-500/50 disabled:opacity-50 transition-colors duration-150"
// //         />
// //         <input type="email" placeholder="Your email address" value={email}
// //           onChange={e => setEmail(e.target.value)} disabled={disabled || submitted}
// //           onKeyDown={e => e.key === 'Enter' && handleSubmit()}
// //           className="bg-[#1a1a26] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-[13px] text-[#e8e8f2] placeholder-white/25 outline-none focus:border-indigo-500/50 disabled:opacity-50 transition-colors duration-150"
// //         />
// //         {error && <p className="text-[12px] text-red-400">{error}</p>}
// //       </div>
// //       {submitted ? (
// //         <p className="text-[13px] text-emerald-400">✓ Details submitted</p>
// //       ) : (
// //         <button onClick={handleSubmit} disabled={disabled}
// //           className="self-start px-4 py-2 rounded-xl text-[13px] font-medium bg-indigo-500 text-white hover:bg-indigo-400 active:scale-95 disabled:bg-white/10 disabled:cursor-not-allowed transition-all duration-150">
// //           Confirm booking
// //         </button>
// //       )}
// //     </div>
// //   )
// // }

// // // ── Render markdown-like assistant text ───────────────────────────────────────
// // function renderMarkdown(text) {
// //   const lines  = text.split('\n')
// //   const result = []
// //   let key = 0
// //   for (const line of lines) {
// //     if (line.trim() === '') { result.push(<div key={key++} className="h-2" />); continue }
// //     if (/^[*-]\s/.test(line.trim())) {
// //       result.push(
// //         <div key={key++} className="flex gap-2 text-[13px] leading-relaxed">
// //           <span className="text-indigo-400 mt-0.5 flex-shrink-0">•</span>
// //           <span>{renderInline(line.trim().slice(2))}</span>
// //         </div>
// //       )
// //       continue
// //     }
// //     result.push(<p key={key++} className="text-[13px] leading-relaxed">{renderInline(line)}</p>)
// //   }
// //   return result
// // }

// // function renderInline(text) {
// //   const parts = text.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s]+)/g)
// //   return parts.map((part, i) => {
// //     if (part.startsWith('**') && part.endsWith('**'))
// //       return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>
// //     if (part.match(/^https?:\/\//))
// //       return <a key={i} href={part} target="_blank" rel="noreferrer"
// //         className="text-indigo-400 underline hover:text-indigo-300 break-all">{part}</a>
// //     return <span key={i}>{part}</span>
// //   })
// // }

// // function AssistantText({ content }) {
// //   return <>{renderMarkdown(content)}</>
// // }

// // // ── Thinking dots ──────────────────────────────────────────────────────────────
// // export function ThinkingBubble() {
// //   return (
// //     <div className="self-start flex items-center gap-1.5 bg-[#1e1e2a] border border-white/[0.06] rounded-2xl rounded-bl-sm px-4 py-3">
// //       <div className="vw-dot" /><div className="vw-dot" /><div className="vw-dot" />
// //     </div>
// //   )
// // }

// // // ── Single message bubble ──────────────────────────────────────────────────────
// // export function Message({ msg, onInteract, isLoading }) {
// //   if (msg.role === 'thinking') return <ThinkingBubble />

// //   const isUser = msg.role === 'user'
// //   const isErr  = msg.role === 'error'

// //   if (!isUser && !isErr) {
// //     const parsed = parseSpecialContent(msg.content)

// //     if (parsed.type === 'booking_form') {
// //       return (
// //         <div className="self-start flex flex-col gap-1 max-w-[92%]">
// //           <div className="px-3.5 py-3 bg-[#1e1e2a] border border-white/[0.06] rounded-2xl rounded-bl-sm">
// //             <BookingForm before={parsed.before} onSubmit={onInteract} disabled={isLoading} />
// //           </div>
// //           <span className="text-[10px] text-white/20 px-1">{fmtTime(msg.ts)}</span>
// //         </div>
// //       )
// //     }

// //     if (parsed.type === 'calendar') {
// //       return (
// //         <div className="self-start flex flex-col gap-1 max-w-[92%]">
// //           <div className="px-3.5 py-3 bg-[#1e1e2a] border border-white/[0.06] rounded-2xl rounded-bl-sm">
// //             <CalendarPicker before={parsed.before} onSelect={onInteract} disabled={isLoading} />
// //           </div>
// //           <span className="text-[10px] text-white/20 px-1">{fmtTime(msg.ts)}</span>
// //         </div>
// //       )
// //     }

// //     if (parsed.type === 'slots') {
// //       return (
// //         <div className="self-start flex flex-col gap-1 max-w-[92%]">
// //           <div className="px-3.5 py-3 bg-[#1e1e2a] border border-white/[0.06] rounded-2xl rounded-bl-sm">
// //             <SlotPicker before={parsed.before} after={parsed.after} slots={parsed.slots} onSelect={onInteract} disabled={isLoading} />
// //           </div>
// //           <span className="text-[10px] text-white/20 px-1">{fmtTime(msg.ts)}</span>
// //         </div>
// //       )
// //     }

// //     if (parsed.type === 'login_buttons') {
// //       return (
// //         <div className="self-start flex flex-col gap-1 max-w-[85%]">
// //           <div className="px-3.5 py-3 bg-[#1e1e2a] border border-white/[0.06] rounded-2xl rounded-bl-sm">
// //             <LoginButtons before={parsed.before} />
// //           </div>
// //           <span className="text-[10px] text-white/20 px-1">{fmtTime(msg.ts)}</span>
// //         </div>
// //       )
// //     }

// //     if (parsed.type === 'contact_form') {
// //       return (
// //         <div className="self-start flex flex-col gap-1 max-w-[85%]">
// //           <div className="px-3.5 py-3 bg-[#1e1e2a] border border-white/[0.06] rounded-2xl rounded-bl-sm">
// //             <ContactForm before={parsed.before} onSubmit={onInteract} disabled={isLoading} />
// //           </div>
// //           <span className="text-[10px] text-white/20 px-1">{fmtTime(msg.ts)}</span>
// //         </div>
// //       )
// //     }
// //   }

// //   return (
// //     <div className={`flex flex-col gap-1 max-w-[85%] ${isUser ? 'self-end items-end' : 'self-start items-start'}`}>
// //       <div className={`px-3.5 py-2.5 text-[13px] leading-relaxed break-words rounded-2xl
// //         ${isUser
// //           ? 'bg-indigo-500 text-white rounded-br-sm'
// //           : isErr
// //             ? 'bg-red-500/10 text-red-400 border border-red-500/20 rounded-bl-sm'
// //             : 'bg-[#1e1e2a] text-[#e8e8f2] border border-white/[0.06] rounded-bl-sm'
// //         }`}>
// //         {isUser || isErr
// //           ? msg.content
// //           : <AssistantText content={msg.content || ''} />
// //         }
// //       </div>
// //       <span className="text-[10px] text-white/20 px-1">{fmtTime(msg.ts)}</span>
// //     </div>
// //   )
// // }

// // // ── Group messages ─────────────────────────────────────────────────────────────
// // export function TraceGroup() { return null }

// // export function groupMessages(messages) {
// //   return messages
// //     .filter(msg => msg.role !== 'tool_call' && msg.role !== 'tool_response')
// //     .map(msg => ({ type: 'message', msg }))
// // }


// import React, { useState, useEffect, useRef, useCallback } from 'react'

// function fmtTime(ts) {
//   if (!ts) return ''
//   return new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
// }

// // ── Detect special UI blocks ──────────────────────────────────────────────────
// export function parseSpecialContent(content) {
//   if (!content) return { type: 'text', content }

//   // Unified booking widget — triggered on first booking intent
//   if (content.includes('%%BOOKING_FORM%%')) {
//     const before = content.replace('%%BOOKING_FORM%%', '').trim()
//     return { type: 'booking_widget', before, slots: [], availabilityData: [] }
//   }

//   // When agent sends back slots after date selection
//   const slotMatch = content.match(/%%SLOTS%%([\s\S]*?)%%END_SLOTS%%/i)
//   if (slotMatch) {
//     const before = content.slice(0, slotMatch.index).trim()
//     const slots  = slotMatch[1].split('\n').map(l => l.trim()).filter(Boolean)
//     return { type: 'slots_only', before, slots }
//   }

//   // Login buttons
//   if (content.includes('%%LOGIN_BUTTONS%%')) {
//     const before = content.replace('%%LOGIN_BUTTONS%%', '').trim()
//     return { type: 'login_buttons', before }
//   }

//   // Legacy contact form
//   if (content.includes('%%CONTACT_FORM%%')) {
//     const before = content.replace('%%CONTACT_FORM%%', '').trim()
//     return { type: 'contact_form', before }
//   }

//   // Legacy calendar only
//   if (content.includes('%%CALENDAR%%')) {
//     const before = content.replace('%%CALENDAR%%', '').trim()
//     return { type: 'booking_widget', before, slots: [], availabilityData: [] }
//   }

//   return { type: 'text', content }
// }

// // ── Unified Booking Widget ────────────────────────────────────────────────────
// // Matches screenshot: details form → calendar → time slots, all in one card,
// // each section activating after the previous is completed.
// function BookingWidget({ before, onSubmit, disabled, externalSlots }) {
//   // Step tracking
//   const [step, setStep] = useState(1) // 1=details, 2=calendar, 3=slots

//   // Step 1 state
//   const [name,      setName]      = useState('')
//   const [email,     setEmail]     = useState('')
//   const [formError, setFormError] = useState('')
//   const [detailsDone, setDetailsDone] = useState(false)

//   // Step 2 state
//   const [selectedDate, setSelectedDate] = useState(null) // { y, m, d }
//   const today = new Date(); today.setHours(0,0,0,0)
//   const [viewYear,  setViewYear]  = useState(today.getFullYear())
//   const [viewMonth, setViewMonth] = useState(today.getMonth())

//   // Step 3 state
//   const [slots,        setSlots]        = useState(externalSlots || [])
//   const [selectedSlot, setSelectedSlot] = useState(null)
//   const [waitingSlots, setWaitingSlots] = useState(false)

//   // Update slots from parent when agent responds
//   React.useEffect(() => {
//     if (externalSlots && externalSlots.length > 0) {
//       setSlots(externalSlots)
//       setWaitingSlots(false)
//       setStep(3)
//     }
//   }, [externalSlots])

//   // ── Step 1: Submit details ──
//   function handleDetailsSubmit() {
//     if (!name.trim())  { setFormError('Please enter your name.'); return }
//     if (!email.trim()) { setFormError('Please enter your email.'); return }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
//       setFormError('Please enter a valid email address.'); return
//     }
//     setFormError('')
//     setDetailsDone(true)
//     setStep(2)
//     // Tell agent details are in, ask for calendar
//    onSubmit({
//   type: "CUSTOMER_DETAILS",
//   name: name.trim(),
//   email: email.trim()
// })
//   }

//   // ── Step 2: Pick a date ──
//   const MONTHS = ['January','February','March','April','May','June',
//                   'July','August','September','October','November','December']
//   const DAYS_SHORT = ['SUN','MON','TUE','WED','THU','FRI','SAT']

//   function prevMonth() {
//     if (viewMonth === 0) { setViewYear(y => y-1); setViewMonth(11) }
//     else setViewMonth(m => m-1)
//   }
//   function nextMonth() {
//     if (viewMonth === 11) { setViewYear(y => y+1); setViewMonth(0) }
//     else setViewMonth(m => m+1)
//   }

//   const firstDay   = new Date(viewYear, viewMonth, 1).getDay()
//   const daysInMon  = new Date(viewYear, viewMonth+1, 0).getDate()
//   const calCells   = []
//   for (let i = 0; i < firstDay; i++) calCells.push(null)
//   for (let d = 1; d <= daysInMon; d++) calCells.push(d)

//   function isPast(d) {
//     return new Date(viewYear, viewMonth, d) < today
//   }
//   function isWeekend(d) {
//     const day = new Date(viewYear, viewMonth, d).getDay()
//     return day === 0 || day === 6
//   }
//   function isSelected(d) {
//     return selectedDate &&
//       selectedDate.d === d &&
//       selectedDate.m === viewMonth &&
//       selectedDate.y === viewYear
//   }

//   function handleDateClick(d) {
//     if (!d || isPast(d) || isWeekend(d) || selectedDate || step !== 2) return
//     const chosen = { d, m: viewMonth, y: viewYear }
//     setSelectedDate(chosen)
//     setWaitingSlots(true)
//     const dateStr = `${viewYear}-${String(viewMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`
//     // onSubmit(`SELECTED_DATE: ${dateStr}`)
//     onSubmit({
//   type: "SELECT_DATE",
//   date: dateStr
// })
//   }

//   // ── Step 3: Pick a slot ──
//   function handleSlotClick(slot) {
//     if (selectedSlot || disabled || step !== 3) return
//     setSelectedSlot(slot)
//     // onSubmit(slot)
//   onSubmit({
//   type: "SELECT_SLOT",
//   slot
// })
//   }

//   // ── Render ──
//   return (
//     <div style={{
//       background: '#fff',
//       borderRadius: 12,
//       overflow: 'hidden',
//       fontFamily: 'DM Sans, system-ui, sans-serif',
//       fontSize: 14,
//       color: '#111',
//       width: '100%',
//       boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
//     }}>

//       {/* ── Section 1: Details ── */}
//       <div style={{ padding: '16px 16px 12px' }}>
//         {before && (
//           <p style={{ margin: '0 0 12px', color: '#222', fontSize: 14, lineHeight: 1.5 }}>{before}</p>
//         )}

//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={e => setName(e.target.value)}
//           disabled={detailsDone || disabled}
//           style={{
//             display: 'block', width: '100%', boxSizing: 'border-box',
//             padding: '9px 12px', marginBottom: 8,
//             border: '1px solid #ddd', borderRadius: 8,
//             fontSize: 14, color: '#111', background: detailsDone ? '#f7f7f7' : '#fff',
//             outline: 'none', opacity: detailsDone ? 0.6 : 1
//           }}
//         />
//         <input
//           type="email"
//           placeholder="Email address"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           disabled={detailsDone || disabled}
//           onKeyDown={e => e.key === 'Enter' && handleDetailsSubmit()}
//           style={{
//             display: 'block', width: '100%', boxSizing: 'border-box',
//             padding: '9px 12px', marginBottom: formError ? 6 : 10,
//             border: '1px solid #ddd', borderRadius: 8,
//             fontSize: 14, color: '#111', background: detailsDone ? '#f7f7f7' : '#fff',
//             outline: 'none', opacity: detailsDone ? 0.6 : 1
//           }}
//         />
//         {formError && (
//           <p style={{ margin: '0 0 8px', color: '#e53e3e', fontSize: 12 }}>{formError}</p>
//         )}

//         {detailsDone ? (
//           <p style={{ margin: 0, color: '#38a169', fontSize: 13, fontWeight: 500 }}>✓ Details saved</p>
//         ) : (
//           <button
//             onClick={handleDetailsSubmit}
//             disabled={disabled}
//             style={{
//               padding: '9px 20px', borderRadius: 8, border: 'none', cursor: 'pointer',
//               background: '#2563eb', color: '#fff', fontWeight: 600, fontSize: 14,
//               opacity: disabled ? 0.5 : 1
//             }}
//           >
//             Submit Details
//           </button>
//         )}
//       </div>

//       {/* Divider */}
//       <div style={{ height: 1, background: '#f0f0f0' }} />

//       {/* ── Section 2: Calendar ── */}
//       <div style={{
//         padding: '14px 16px',
//         opacity: step >= 2 ? 1 : 0.35,
//         pointerEvents: step >= 2 && !selectedDate ? 'auto' : 'none',
//         transition: 'opacity 0.3s'
//       }}>
//         {step < 2 && (
//           <p style={{ margin: '0 0 10px', color: '#555', fontSize: 13 }}>
//             Hello there! Please select a preferred date -
//           </p>
//         )}
//         {step >= 2 && (
//           <p style={{ margin: '0 0 10px', color: '#222', fontSize: 13, fontWeight: 500 }}>
//             Hello there! Please select a preferred date -
//           </p>
//         )}

//         {/* Month nav */}
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
//           <span style={{ fontWeight: 600, fontSize: 14 }}>{MONTHS[viewMonth]} {viewYear}</span>
//           <div style={{ display: 'flex', gap: 4 }}>
//             <button
//               onClick={prevMonth}
//               disabled={viewYear === today.getFullYear() && viewMonth === today.getMonth()}
//               style={{
//                 width: 28, height: 28, borderRadius: 6, border: '1px solid #e5e7eb',
//                 background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center',
//                 justifyContent: 'center', fontSize: 16, color: '#555',
//                 opacity: (viewYear === today.getFullYear() && viewMonth === today.getMonth()) ? 0.3 : 1
//               }}
//             >‹</button>
//             <button
//               onClick={nextMonth}
//               style={{
//                 width: 28, height: 28, borderRadius: 6, border: '1px solid #e5e7eb',
//                 background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center',
//                 justifyContent: 'center', fontSize: 16, color: '#555'
//               }}
//             >›</button>
//           </div>
//         </div>

//         {/* Day headers */}
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 4 }}>
//           {DAYS_SHORT.map(d => (
//             <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color: '#999', paddingBottom: 4 }}>{d}</div>
//           ))}
//         </div>

//         {/* Date cells */}
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
//           {calCells.map((d, i) => {
//             const past    = d ? isPast(d) : false
//             const weekend = d ? isWeekend(d) : false
//             const sel     = d ? isSelected(d) : false
//             const inactive = !d || past || weekend

//             return (
//               <button
//                 key={i}
//                 onClick={() => handleDateClick(d)}
//                 disabled={inactive || !!selectedDate}
//                 style={{
//                   height: 32, width: '100%', border: 'none', borderRadius: 6,
//                   cursor: inactive || selectedDate ? 'default' : 'pointer',
//                   background: sel ? '#2563eb' : 'transparent',
//                   color: sel ? '#fff' : inactive ? '#ccc' : '#111',
//                   fontWeight: sel ? 700 : 400,
//                   fontSize: 13,
//                   transition: 'background 0.1s',
//                   visibility: !d ? 'hidden' : 'visible'
//                 }}
//                 onMouseEnter={e => {
//                   if (!inactive && !sel && !selectedDate) e.currentTarget.style.background = '#eff6ff'
//                 }}
//                 onMouseLeave={e => {
//                   if (!sel) e.currentTarget.style.background = 'transparent'
//                 }}
//               >
//                 {d || ''}
//               </button>
//             )
//           })}
//         </div>

//         {selectedDate && (
//           <p style={{ margin: '10px 0 0', color: '#38a169', fontSize: 13, fontWeight: 500 }}>
//             ✓ {MONTHS[selectedDate.m]} {selectedDate.d}, {selectedDate.y} selected
//           </p>
//         )}
//         {waitingSlots && !slots.length && (
//           <p style={{ margin: '8px 0 0', color: '#888', fontSize: 12 }}>Fetching available slots…</p>
//         )}
//       </div>

//       {/* Divider */}
//       <div style={{ height: 1, background: '#f0f0f0' }} />

//       {/* ── Section 3: Time slots ── */}
//       <div style={{
//         padding: '14px 16px',
//         opacity: step >= 3 ? 1 : 0.35,
//         pointerEvents: step >= 3 ? 'auto' : 'none',
//         transition: 'opacity 0.3s'
//       }}>
//         <p style={{ margin: '0 0 10px', color: step >= 3 ? '#222' : '#555', fontSize: 13, fontWeight: step >= 3 ? 500 : 400 }}>
//           Now can please select a preferred time slot -
//         </p>

//         {step >= 3 && slots.length > 0 ? (
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
//             {slots.map((slot, i) => (
//               <button
//                 key={i}
//                 onClick={() => handleSlotClick(slot)}
//                 style={{
//                   padding: '9px 4px', border: '1px solid',
//                   borderColor: selectedSlot === slot ? '#2563eb' : '#e5e7eb',
//                   borderRadius: 8, cursor: selectedSlot ? 'default' : 'pointer',
//                   background: selectedSlot === slot ? '#2563eb' : '#fff',
//                   color: selectedSlot === slot ? '#fff' : selectedSlot ? '#bbb' : '#222',
//                   fontWeight: selectedSlot === slot ? 600 : 400,
//                   fontSize: 13, textAlign: 'center',
//                   transition: 'all 0.15s'
//                 }}
//                 onMouseEnter={e => {
//                   if (!selectedSlot && selectedSlot !== slot) e.currentTarget.style.borderColor = '#2563eb'
//                 }}
//                 onMouseLeave={e => {
//                   if (selectedSlot !== slot) e.currentTarget.style.borderColor = '#e5e7eb'
//                 }}
//               >
//                 {slot}
//               </button>
//             ))}
//           </div>
//         ) : step >= 3 && slots.length === 0 ? (
//           <p style={{ color: '#888', fontSize: 13 }}>No slots available for this date.</p>
//         ) : (
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
//             {['','','','','','','','',''].map((_, i) => (
//               <div key={i} style={{
//                 height: 36, borderRadius: 8, background: '#f5f5f5', border: '1px solid #eee'
//               }} />
//             ))}
//           </div>
//         )}

//         {selectedSlot && (
//           <p style={{ margin: '10px 0 0', color: '#38a169', fontSize: 13, fontWeight: 500 }}>
//             ✓ {selectedSlot} selected — confirming your booking…
//           </p>
//         )}
//       </div>
//     </div>
//   )
// }

// // ── Slots-only component (when agent pushes slots into an existing conversation) ─
// function StandaloneSlots({ before, slots, onSelect, disabled }) {
//   const [selected, setSelected] = useState(null)
//   function handleClick(slot) {
//     if (disabled || selected) return
//     setSelected(slot)
//     onSelect(slot)
//   }
//   return (
//     <div style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
//       {before && <p style={{ margin: '0 0 10px', fontSize: 13, color: '#222' }}>{before}</p>}
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
//         {slots.map((slot, i) => (
//           <button key={i} onClick={() => handleClick(slot)}
//             disabled={disabled || !!selected}
//             style={{
//               padding: '9px 4px', border: '1px solid',
//               borderColor: selected === slot ? '#2563eb' : '#e5e7eb',
//               borderRadius: 8, cursor: selected ? 'default' : 'pointer',
//               background: selected === slot ? '#2563eb' : '#fff',
//               color: selected === slot ? '#fff' : selected ? '#bbb' : '#222',
//               fontSize: 13, fontWeight: selected === slot ? 600 : 400, textAlign: 'center'
//             }}
//           >{slot}</button>
//         ))}
//       </div>
//     </div>
//   )
// }

// // ── Login / Signup buttons ────────────────────────────────────────────────────
// function LoginButtons({ before }) {
//   return (
//     <div className="flex flex-col gap-3">
//       {before && <p className="text-[13px] leading-relaxed text-[#e8e8f2]">{before}</p>}
//       <div className="flex flex-col gap-2">
//         <a href="https://console.condense.zeliot.in/" target="_blank" rel="noreferrer"
//           className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold bg-indigo-500 text-white hover:bg-indigo-400 active:scale-95 transition-all duration-150 no-underline">
//           🔑 Login to Condense Console
//         </a>
//         <a href="https://console.condense.zeliot.in/try-for-free?utm_source=condense_agent&utm_medium=website_chat_widget"
//           target="_blank" rel="noreferrer"
//           className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold bg-emerald-500 text-white hover:bg-emerald-400 active:scale-95 transition-all duration-150 no-underline">
//           🚀 Sign Up — Try for Free
//         </a>
//       </div>
//     </div>
//   )
// }

// // ── Legacy contact form ───────────────────────────────────────────────────────
// function ContactForm({ before, onSubmit, disabled }) {
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [submitted, setSubmitted] = useState(false)
//   const [error, setError] = useState('')
//   function handleSubmit() {
//     if (!name.trim())  { setError('Please enter your name.'); return }
//     if (!email.trim()) { setError('Please enter your email.'); return }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setError('Please enter a valid email address.'); return }
//     setError(''); setSubmitted(true)
//     onSubmit(`CUSTOMER_NAME: ${name.trim()} | CUSTOMER_EMAIL: ${email.trim()}`)
//   }
//   return (
//     <div className="flex flex-col gap-3">
//       {before && <p className="text-[13px] leading-relaxed text-[#e8e8f2]">{before}</p>}
//       <div className="flex flex-col gap-2">
//         <input type="text" placeholder="Your full name" value={name} onChange={e => setName(e.target.value)}
//           disabled={disabled || submitted}
//           className="bg-[#1a1a26] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-[13px] text-[#e8e8f2] placeholder-white/25 outline-none focus:border-indigo-500/50 disabled:opacity-50 transition-colors duration-150" />
//         <input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)}
//           disabled={disabled || submitted} onKeyDown={e => e.key === 'Enter' && handleSubmit()}
//           className="bg-[#1a1a26] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-[13px] text-[#e8e8f2] placeholder-white/25 outline-none focus:border-indigo-500/50 disabled:opacity-50 transition-colors duration-150" />
//         {error && <p className="text-[12px] text-red-400">{error}</p>}
//       </div>
//       {submitted
//         ? <p className="text-[13px] text-emerald-400">✓ Details submitted</p>
//         : <button onClick={handleSubmit} disabled={disabled}
//             className="self-start px-4 py-2 rounded-xl text-[13px] font-medium bg-indigo-500 text-white hover:bg-indigo-400 active:scale-95 disabled:bg-white/10 disabled:cursor-not-allowed transition-all duration-150">
//             Confirm booking
//           </button>
//       }
//     </div>
//   )
// }

// // ── Render markdown ───────────────────────────────────────────────────────────
// function renderMarkdown(text) {
//   const lines = text.split('\n'); const result = []; let key = 0
//   for (const line of lines) {
//     if (line.trim() === '') { result.push(<div key={key++} className="h-2" />); continue }
//     if (/^[*-]\s/.test(line.trim())) {
//       result.push(<div key={key++} className="flex gap-2 text-[13px] leading-relaxed">
//         <span className="text-indigo-400 mt-0.5 flex-shrink-0">•</span>
//         <span>{renderInline(line.trim().slice(2))}</span>
//       </div>); continue
//     }
//     result.push(<p key={key++} className="text-[13px] leading-relaxed">{renderInline(line)}</p>)
//   }
//   return result
// }
// function renderInline(text) {
//   return text.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s]+)/g).map((part, i) => {
//     if (part.startsWith('**') && part.endsWith('**'))
//       return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>
//     if (part.match(/^https?:\/\//))
//       return <a key={i} href={part} target="_blank" rel="noreferrer"
//         className="text-indigo-400 underline hover:text-indigo-300 break-all">{part}</a>
//     return <span key={i}>{part}</span>
//   })
// }
// function AssistantText({ content }) { return <>{renderMarkdown(content)}</> }

// // ── Thinking dots ──────────────────────────────────────────────────────────────
// export function ThinkingBubble() {
//   return (
//     <div className="self-start flex items-center gap-1.5 bg-[#1e1e2a] border border-white/[0.06] rounded-2xl rounded-bl-sm px-4 py-3">
//       <div className="vw-dot" /><div className="vw-dot" /><div className="vw-dot" />
//     </div>
//   )
// }

// // ── Single message bubble ──────────────────────────────────────────────────────
// export function Message({ msg, onInteract, isLoading,bookingSlots,setBookingSlots }) {
//   if (msg.role === 'thinking') return <ThinkingBubble />

//   const isUser = msg.role === 'user'
//   const isErr  = msg.role === 'error'

//   const parsed = !isUser && !isErr
//     ? parseSpecialContent(msg.content)
//     : null

//   // ✅ SAFE SIDE EFFECT
//   useEffect(() => {
//     if (parsed?.type === 'slots_only') {
//       setBookingSlots(parsed.slots)
//       return
//     }
//   }, [msg])

//   // // ✅ HIDE SLOT MESSAGE
//   // if (parsed?.type === 'slots_only') {
//   //   return null
//   // }

//   if (parsed?.type === 'booking_widget') {
//     return (
//       <div className="self-start flex flex-col gap-1" style={{ width: '100%', maxWidth: 340 }}>
//         <BookingWidget
//           before={parsed.before}
//           onSubmit={onInteract}
//           disabled={isLoading}
//           externalSlots={bookingSlots}
//         />
//         <span className="text-[10px] text-white/20 px-1">{fmtTime(msg.ts)}</span>
//       </div>
//     )
//   }

//   //   if (parsed.type === 'slots_only') {
//   //     // return (
//   //     //   <div className="self-start flex flex-col gap-1 max-w-[92%]">
//   //     //     <div className="px-3.5 py-3 bg-white rounded-2xl rounded-bl-sm">
//   //     //       <StandaloneSlots before={parsed.before} slots={parsed.slots} onSelect={onInteract} disabled={isLoading} />
//   //     //     </div>
//   //     //     <span className="text-[10px] text-white/20 px-1">{fmtTime(msg.ts)}</span>
//   //     //   </div>
//   //     // )
//   //     //  setBookingSlots(parsed.slots)
//   // // return null
  
//   //   }
// //   if (parsed?.type === 'slots_only') {
// //   setBookingSlots(parsed.slots)
// //   return null
// // }

//     if (parsed?.type === 'login_buttons') {
//       return (
//         <div className="self-start flex flex-col gap-1 max-w-[85%]">
//           <div className="px-3.5 py-3 bg-[#1e1e2a] border border-white/[0.06] rounded-2xl rounded-bl-sm">
//             <LoginButtons before={parsed.before} />
//           </div>
//           <span className="text-[10px] text-white/20 px-1">{fmtTime(msg.ts)}</span>
//         </div>
//       )
//     }

//     if (parsed?.type === 'contact_form') {
//       return (
//         <div className="self-start flex flex-col gap-1 max-w-[85%]">
//           <div className="px-3.5 py-3 bg-[#1e1e2a] border border-white/[0.06] rounded-2xl rounded-bl-sm">
//             <ContactForm before={parsed.before} onSubmit={onInteract} disabled={isLoading} />
//           </div>
//           <span className="text-[10px] text-white/20 px-1">{fmtTime(msg.ts)}</span>
//         </div>
//       )
//     }
  
  
//   return (
//     <div className={`flex flex-col gap-1 max-w-[85%] ${isUser ? 'self-end items-end' : 'self-start items-start'}`}>
//       <div className={`px-3.5 py-2.5 text-[13px] leading-relaxed break-words rounded-2xl
//         ${isUser
//           ? 'bg-indigo-500 text-white rounded-br-sm'
//           : isErr
//             ? 'bg-red-500/10 text-red-400 border border-red-500/20 rounded-bl-sm'
//             : 'bg-[#1e1e2a] text-[#e8e8f2] border border-white/[0.06] rounded-bl-sm'
//         }`}>
//         {isUser || isErr ? msg.content : <AssistantText content={msg.content || ''} />}
//       </div>
//       <span className="text-[10px] text-white/20 px-1">{fmtTime(msg.ts)}</span>
//     </div>
//   )
// }

// // ── Group messages ─────────────────────────────────────────────────────────────
// export function TraceGroup() { return null }
// export function groupMessages(messages) {
//   return messages
//     .filter(msg => msg.role !== 'tool_call' && msg.role !== 'tool_response')
//     .map(msg => ({ type: 'message', msg }))
// }


import React, { useState, useRef } from 'react'

function fmtTime(ts) {
  if (!ts) return ''
  return new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// Extract %%SLOTS%%...%%END_SLOTS%% from agent reply text
function extractSlots(text) {
  if (!text) return { slots: [], intro: '' }
  const m = text.match(/%%SLOTS%%([\s\S]*?)%%END_SLOTS%%/i)
  if (!m) return { slots: [], intro: text.trim() }
  const slots = m[1].split('\n').map(l => l.trim()).filter(Boolean)
  const intro = text.slice(0, m.index).trim()
  return { slots, intro }
}
function stripTimezoneLabel(slot) {
  return slot.replace(/(AM|PM)\s+[A-Za-z][\w\s]*/gi, '$1').trim()
}

// ── Content parser ────────────────────────────────────────────────────────────
// export function parseSpecialContent(content) {
//   if (!content) return { type: 'text', content }

//   if (content.includes('%%BOOKING_FORM%%')) {
//     return { type: 'booking_widget', before: content.replace('%%BOOKING_FORM%%', '').trim() }
//   }
//   // Raw slots message — should be hidden (widget handles it via sendSilent)
//   if (content.match(/%%SLOTS%%[\s\S]*?%%END_SLOTS%%/i)) {
//     return { type: 'slots_raw' }
//   }
//   if (content.includes('%%LOGIN_BUTTONS%%')) {
//     return { type: 'login_buttons', before: content.replace('%%LOGIN_BUTTONS%%', '').trim() }
//   }
//   if (content.includes('%%CONTACT_FORM%%')) {
//     return { type: 'contact_form', before: content.replace('%%CONTACT_FORM%%', '').trim() }
//   }
//   return { type: 'text', content }
// }
export function parseSpecialContent(content) {
  if (!content) return { type: 'text', content }

  if (content.includes('%%BOOKING_FORM%%')) {
    return { type: 'booking_widget', before: content.replace('%%BOOKING_FORM%%', '').trim() }
  }

  if (content.match(/%%SLOTS%%[\s\S]*?%%END_SLOTS%%/i)) {
    return { type: 'slots_raw' }
  }

  if (content.includes('%%LOGIN_ONLY%%')) {
    return { type: 'login_only', before: content.replace('%%LOGIN_ONLY%%', '').trim() }
  }

  if (content.includes('%%SIGNUP_ONLY%%')) {
    return { type: 'signup_only', before: content.replace('%%SIGNUP_ONLY%%', '').trim() }
  }

  if (content.includes('%%LOGIN_BUTTONS%%')) {
    return { type: 'login_buttons', before: content.replace('%%LOGIN_BUTTONS%%', '').trim() }
  }

  if (content.includes('%%CONTACT_FORM%%')) {
    return { type: 'contact_form', before: content.replace('%%CONTACT_FORM%%', '').trim() }
  }

  return { type: 'text', content }
}
function LoginOnlyButton({ before }) {
  return (
    <div className="flex flex-col gap-3">
      {before && <p className="text-[13px] leading-relaxed text-[#e8e8f2]">{before}</p>}
      <a
        href="https://console.condense.zeliot.in/"
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold bg-indigo-500 text-white hover:bg-indigo-400 active:scale-95 transition-all duration-150 no-underline"
      >
        Login to Condense Console
      </a>
    </div>
  )
}

function SignupOnlyButton({ before }) {
  return (
    <div className="flex flex-col gap-3">
      {before && <p className="text-[13px] leading-relaxed text-[#e8e8f2]">{before}</p>}
      <a
        href="https://console.condense.zeliot.in/try-for-free?utm_source=condense_agent&utm_medium=website_chat_widget"
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold bg-emerald-500 text-white hover:bg-emerald-400 active:scale-95 transition-all duration-150 no-underline"
      >
        Sign Up - Try for Free
      </a>
    </div>
  )
}


// ══════════════════════════════════════════════════════════════════════════════
// BOOKING WIDGET — fully self-contained, uses sendSilent for all API calls
// Nothing leaks into the chat thread
// ══════════════════════════════════════════════════════════════════════════════
function BookingWidget({ before, sendSilent }) {
  const [step,        setStep]        = useState(1)  // 1=details  2=calendar  3=slots  4=done

  // Step 1
  const [name,        setName]        = useState('')
  const [email,       setEmail]       = useState('')
  const [formError,   setFormError]   = useState('')
  const [detailsDone, setDetailsDone] = useState(false)
  const storedName  = useRef('')
  const storedEmail = useRef('')
   
  // Step 2
  const today = new Date(); today.setHours(0,0,0,0)
  const [viewYear,     setViewYear]     = useState(today.getFullYear())
  const [viewMonth,    setViewMonth]    = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState(null)
  const [calLoading,   setCalLoading]   = useState(false)

  // Step 3
  const [slots,        setSlots]        = useState([])
  const [slotsIntro,   setSlotsIntro]   = useState('')
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [slotLoading,  setSlotLoading]  = useState(false)
  const [bookingDone,  setBookingDone]  = useState(false)
  const [bookingError, setBookingError] = useState('')
const [bookingNote, setBookingNote] = useState('')

  // ── Step 1 ─────────────────────────────────────────────────────────────────
  async function handleDetailsSubmit() {
    if (!name.trim())  { setFormError('Please enter your name.'); return }
    if (!email.trim()) { setFormError('Please enter your email.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormError('Please enter a valid email address.'); return
    }
    setFormError('')
    storedName.current  = name.trim()
    storedEmail.current = email.trim()
    setDetailsDone(true)
    setStep(2)
    // Silent — no chat bubble, just keeps session context
    sendSilent(`CUSTOMER_NAME: ${name.trim()} | CUSTOMER_EMAIL: ${email.trim()}`)
  }

  // ── Step 2 — Calendar ──────────────────────────────────────────────────────
  const MONTHS     = ['January','February','March','April','May','June',
                      'July','August','September','October','November','December']
  const DAYS_SHORT = ['SUN','MON','TUE','WED','THU','FRI','SAT']

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y-1); setViewMonth(11) }
    else setViewMonth(m => m-1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y+1); setViewMonth(0) }
    else setViewMonth(m => m+1)
  }

  const firstDay  = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMon = new Date(viewYear, viewMonth+1, 0).getDate()
  const calCells  = []
  for (let i = 0; i < firstDay; i++) calCells.push(null)
  for (let d = 1; d <= daysInMon; d++) calCells.push(d)

  const isPast    = d => new Date(viewYear, viewMonth, d) < today
  const isWeekend = d => { const day = new Date(viewYear, viewMonth, d).getDay(); return day === 0 || day === 6 }
  const isSel     = d => selectedDate && selectedDate.d === d && selectedDate.m === viewMonth && selectedDate.y === viewYear

  // async function handleDateClick(d) {
  //   if (!d || isPast(d) || isWeekend(d) || selectedDate || calLoading || step !== 2) return
  //   setSelectedDate({ d, m: viewMonth, y: viewYear })
  //   setCalLoading(true)
  //   const dateStr = `${viewYear}-${String(viewMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`

  //   const reply = await sendSilent(`SELECTED_DATE: ${dateStr}`)
  //   setCalLoading(false)

  //   if (reply) {
  //     const { slots: parsed, intro } = extractSlots(reply)
  //     setSlots(parsed)
  //     setSlotsIntro(intro || 'Now please select a preferred time slot -')
  //   } else {
  //     setSlots([])
  //     setSlotsIntro('No slots available for this date.')
  //   }
  //   setStep(3)
  // }
//   async function handleDateClick(d) {
//   if (!d || isPast(d) || isWeekend(d) || calLoading || bookingDone || step < 2) return

//   setBookingError('')
//   setBookingNote('')
//   setSelectedSlot(null)
//   setSlots([])
//   setSlotsIntro('')

//   setSelectedDate({ d, m: viewMonth, y: viewYear })
//   setCalLoading(true)

//   const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
//   const reply = await sendSilent(`SELECTED_DATE: ${dateStr}`)

//   setCalLoading(false)

//   if (reply) {
//     const { slots: parsed, intro } = extractSlots(reply)
//     setSlots(parsed)
//     setSlotsIntro(intro || 'Now please select a preferred time slot -')
//   } else {
//     setSlots([])
//     setSlotsIntro('We could not load slots for this date. Please try again.')
//   }

//   setStep(3)
// }

async function handleDateClick(d) {
  if (!d || isPast(d) || isWeekend(d) || calLoading || bookingDone || step < 2) return

  setSelectedDate({ d, m: viewMonth, y: viewYear })
  setCalLoading(true)

  const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
  const reply = await sendSilent(`SELECTED_DATE: ${dateStr}`)

  setCalLoading(false)

  if (reply) {
    const { slots: parsed, intro } = extractSlots(reply)
    setSlots(parsed)
    setSlotsIntro(intro || 'Now please select a preferred time slot -')
  } else {
    setSlots([])
    setSlotsIntro('No slots available for this date.')
  }

  setStep(3)
}

  // ── Step 3 — Slot pick ─────────────────────────────────────────────────────
  // async function handleSlotClick(slot) {
  //   if (selectedSlot || slotLoading || step !== 3) return
  //   setSelectedSlot(slot)
  //   setSlotLoading(true)
  //   // await sendSilent(slot)
  //   const reply = await sendSilent(`SELECTED_SLOT: ${slot}`)

  //   setSlotLoading(false)
  //   setBookingDone(true)
  //   setStep(4)
  // }
//   async function handleSlotClick(slot) {
//   if (selectedSlot || slotLoading || step !== 3) return

//   setBookingError('')
//   setBookingNote('')
//   setSelectedSlot(slot)
//   setSlotLoading(true)

//   const reply = await sendSilent(`SELECTED_SLOT: ${slot}`)

//   setSlotLoading(false)

//   if (reply && /successfully booked|confirmation email|booked/i.test(reply)) {
//     setBookingDone(true)
//     setBookingNote(reply)
//     setStep(4)
//     return
//   }

//   setSelectedSlot(null)
//   setBookingError(reply || 'We could not confirm the booking. Please try another slot.')
// }
async function handleSlotClick(slot) {
  if (selectedSlot || slotLoading || step !== 3) return

  setSelectedSlot(slot)
  setSlotLoading(true)

  const cleanSlot = slot.split('Additional information for reference:')[0].trim()
  const reply = await sendSilent(`SELECTED_SLOT: ${cleanSlot}`)

  setSlotLoading(false)

  if (reply && /successfully booked|confirmation email|booked/i.test(reply)) {
    setBookingDone(true)
    setStep(4)
    return
  }

  setSelectedSlot(null)
}


  // ── Shared styles ──────────────────────────────────────────────────────────
  const inp = (locked) => ({
    display: 'block', width: '100%', boxSizing: 'border-box',
    padding: '9px 12px', border: '1.5px solid #e5e7eb', borderRadius: 8,
    fontSize: 13.5, color: '#111', background: locked ? '#f9f9f9' : '#fff',
    outline: 'none', fontFamily: 'inherit', opacity: locked ? 0.65 : 1,
    marginBottom: 8,
  })

  const section = (active) => ({
    padding: '14px 16px',
    opacity: active ? 1 : 0.38,
    pointerEvents: active ? 'auto' : 'none',
    transition: 'opacity 0.25s',
  })

  const divider = <div style={{ height: 1, background: '#f0f0f0' }} />

  return (
    <div style={{
      background: '#fff', borderRadius: 12, overflow: 'hidden',
      fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 13.5, color: '#111',
      width: '100%', maxWidth: 340, boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
    }}>

      {/* ── Section 1: Details ── */}
      <div style={section(step === 1)}>
        {before && <p style={{ margin: '0 0 12px', color: '#333', lineHeight: 1.5 }}>{before}</p>}

        <input type="text" placeholder="Name" value={name}
          onChange={e => setName(e.target.value)} disabled={detailsDone}
          onKeyDown={e => e.key === 'Enter' && handleDetailsSubmit()}
          style={inp(detailsDone)} />
        <input type="email" placeholder="Email address" value={email}
          onChange={e => setEmail(e.target.value)} disabled={detailsDone}
          onKeyDown={e => e.key === 'Enter' && handleDetailsSubmit()}
          style={{ ...inp(detailsDone), marginBottom: formError ? 6 : 10 }} />
        {formError && <p style={{ margin: '0 0 8px', color: '#e53e3e', fontSize: 12 }}>{formError}</p>}

        {detailsDone
          ? <p style={{ margin: 0, color: '#16a34a', fontSize: 13, fontWeight: 500 }}>✓ Details saved</p>
          : <button onClick={handleDetailsSubmit} style={{
              padding: '9px 22px', borderRadius: 8, border: 'none', cursor: 'pointer',
              background: '#2563eb', color: '#fff', fontWeight: 600, fontSize: 13.5, fontFamily: 'inherit',
            }}>Submit Details</button>
        }
      </div>

      {divider}

      {/* ── Section 2: Calendar ── */}
      {/* <div style={section(step === 2)}> */}
      <div style={section(step >= 2 && !bookingDone)}>

        <p style={{ margin: '0 0 10px', color: '#333', fontWeight: step >= 2 ? 500 : 400 }}>
          Hello there! Please select a preferred date -
        </p>

        {/* Month nav */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontWeight: 600, fontSize: 14 }}>{MONTHS[viewMonth]} {viewYear}</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {[['‹', prevMonth, viewYear === today.getFullYear() && viewMonth === today.getMonth()],
              ['›', nextMonth, false]].map(([lbl, fn, dis], i) => (
              <button key={i} onClick={fn} disabled={dis} style={{
                width: 28, height: 28, borderRadius: 6, border: '1px solid #e5e7eb',
                background: '#fff', cursor: dis ? 'default' : 'pointer', fontSize: 15, color: '#555',
                display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: dis ? 0.3 : 1,
              }}>{lbl}</button>
            ))}
          </div>
        </div>

        {/* Day labels */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 2 }}>
          {DAYS_SHORT.map(d => (
            <div key={d} style={{ textAlign: 'center', fontSize: 10.5, fontWeight: 600, color: '#aaa', paddingBottom: 4 }}>{d}</div>
          ))}
        </div>

        {/* Date grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
          {calCells.map((d, i) => {
            const past    = d ? isPast(d) : false
            const weekend = d ? isWeekend(d) : false
            const sel     = d ? isSel(d) : false
            const off     = !d || past || weekend
            return (
              <button key={i} onClick={() => handleDateClick(d)}
                disabled={off || calLoading || bookingDone}
                style={{
                  height: 32, border: 'none', borderRadius: 6,
                  cursor: off || bookingDone ? 'default' : 'pointer',
                  background: sel ? '#2563eb' : 'transparent',
                  color: sel ? '#fff' : off ? '#d1d5db' : '#111',
                  fontWeight: sel ? 700 : 400, fontSize: 13,
                  visibility: !d ? 'hidden' : 'visible', fontFamily: 'inherit',
                }}
                onMouseEnter={e => { if (!off && !sel && !bookingDone) e.currentTarget.style.background = '#eff6ff' }}
                onMouseLeave={e => { if (!sel) e.currentTarget.style.background = 'transparent' }}
              >{d || ''}</button>
            )
          })}
        </div>

        {calLoading && <p style={{ margin: '10px 0 0', color: '#6b7280', fontSize: 12 }}>Fetching available slots…</p>}
        {selectedDate && !calLoading && (
          <p style={{ margin: '10px 0 0', color: '#16a34a', fontSize: 12, fontWeight: 500 }}>
            ✓ {MONTHS[selectedDate.m]} {selectedDate.d}, {selectedDate.y} selected
          </p>
        )}
      </div>

      {divider}

      {/* ── Section 3: Slots ── */}
      <div style={section(step >= 3)}>
        <p style={{ margin: '0 0 10px', color: '#333', fontWeight: step >= 3 ? 500 : 400 }}>
          {slotsIntro || 'Now can please select a preferred time slot -'}
        </p>

        {step < 3 ? (
          // Placeholder skeleton
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {Array(9).fill(0).map((_, i) => (
              <div key={i} style={{ height: 34, borderRadius: 8, background: '#f3f4f6', border: '1px solid #e9ecef' }} />
            ))}
          </div>
        ) : bookingDone ? (
          <p style={{ color: '#16a34a', fontSize: 13, fontWeight: 500 }}>
            {/* ✅ Booking confirmed! A confirmation will be sent to {storedEmail.current} */}
            {bookingNote || `✅ Booking confirmed! A confirmation will be sent to ${storedEmail.current}`}

          </p>
        ) : slots.length === 0 ? (
          <p style={{ color: '#9ca3af', fontSize: 13 }}>No slots available. Please pick another date.</p>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {slots.map((slot, i) => (
                <button key={i} onClick={() => handleSlotClick(slot)}
                  disabled={!!selectedSlot || slotLoading}
                  style={{
                    padding: '8px 4px', border: '1.5px solid',
                    borderColor: selectedSlot === slot ? '#2563eb' : '#e5e7eb',
                    borderRadius: 8, cursor: selectedSlot ? 'default' : 'pointer',
                    background: selectedSlot === slot ? '#2563eb' : '#fff',
                    color: selectedSlot === slot ? '#fff' : selectedSlot ? '#c0c0c0' : '#222',
                    fontWeight: selectedSlot === slot ? 600 : 400,
                    fontSize: 13, textAlign: 'center', fontFamily: 'inherit',
                    opacity: selectedSlot && selectedSlot !== slot ? 0.45 : 1,
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { if (!selectedSlot) e.currentTarget.style.borderColor = '#2563eb' }}
                  onMouseLeave={e => { if (selectedSlot !== slot) e.currentTarget.style.borderColor = '#e5e7eb' }}
                >{stripTimezoneLabel(slot)}</button>
              ))}
            </div>
            {slotLoading && <p style={{ margin: '10px 0 0', color: '#6b7280', fontSize: 12 }}>Confirming your booking…</p>}
          {bookingError && <p style={{ margin: '10px 0 0', color: '#dc2626', fontSize: 12 }}>{bookingError}</p>}

          </>
        )}
      </div>
    </div>
  )
}

// ── Login buttons ─────────────────────────────────────────────────────────────
function LoginButtons({ before }) {
  return (
    <div className="flex flex-col gap-3">
      {before && <p className="text-[13px] leading-relaxed text-[#e8e8f2]">{before}</p>}
      <div className="flex flex-col gap-2">
        <a href="https://console.condense.zeliot.in/" target="_blank" rel="noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold bg-indigo-500 text-white hover:bg-indigo-400 active:scale-95 transition-all duration-150 no-underline">
          🔑 Login to Condense Console
        </a>
        <a href="https://console.condense.zeliot.in/try-for-free?utm_source=condense_agent&utm_medium=website_chat_widget"
          target="_blank" rel="noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold bg-emerald-500 text-white hover:bg-emerald-400 active:scale-95 transition-all duration-150 no-underline">
          🚀 Sign Up — Try for Free
        </a>
      </div>
    </div>
  )
}

// ── Legacy contact form ───────────────────────────────────────────────────────
function ContactForm({ before, onSubmit, disabled }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  function handleSubmit() {
    if (!name.trim())  { setError('Please enter your name.'); return }
    if (!email.trim()) { setError('Please enter your email.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setError('Please enter a valid email.'); return }
    setError(''); setSubmitted(true)
    onSubmit(`CUSTOMER_NAME: ${name.trim()} | CUSTOMER_EMAIL: ${email.trim()}`)
  }
  return (
    <div className="flex flex-col gap-3">
      {before && <p className="text-[13px] leading-relaxed text-[#e8e8f2]">{before}</p>}
      <div className="flex flex-col gap-2">
        <input type="text" placeholder="Your full name" value={name} onChange={e => setName(e.target.value)}
          disabled={disabled || submitted}
          className="bg-[#1a1a26] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-[13px] text-[#e8e8f2] placeholder-white/25 outline-none focus:border-indigo-500/50 disabled:opacity-50 transition-colors duration-150" />
        <input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)}
          disabled={disabled || submitted} onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          className="bg-[#1a1a26] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-[13px] text-[#e8e8f2] placeholder-white/25 outline-none focus:border-indigo-500/50 disabled:opacity-50 transition-colors duration-150" />
        {error && <p className="text-[12px] text-red-400">{error}</p>}
      </div>
      {submitted
        ? <p className="text-[13px] text-emerald-400">✓ Details submitted</p>
        : <button onClick={handleSubmit} disabled={disabled}
            className="self-start px-4 py-2 rounded-xl text-[13px] font-medium bg-indigo-500 text-white hover:bg-indigo-400 active:scale-95 disabled:bg-white/10 disabled:cursor-not-allowed transition-all duration-150">
            Confirm booking
          </button>
      }
    </div>
  )
}

// ── Markdown renderer ─────────────────────────────────────────────────────────
function renderMarkdown(text) {
  const lines = text.split('\n'); const result = []; let key = 0
  for (const line of lines) {
    if (line.trim() === '') { result.push(<div key={key++} className="h-2" />); continue }
    if (/^[*-]\s/.test(line.trim())) {
      result.push(<div key={key++} className="flex gap-2 text-[13px] leading-relaxed">
        <span className="text-indigo-400 mt-0.5 flex-shrink-0">•</span>
        <span>{renderInline(line.trim().slice(2))}</span>
      </div>); continue
    }
    result.push(<p key={key++} className="text-[13px] leading-relaxed">{renderInline(line)}</p>)
  }
  return result
}
function renderInline(text) {
  return text.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s]+)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>
    if (part.match(/^https?:\/\//))
      return <a key={i} href={part} target="_blank" rel="noreferrer"
        className="text-indigo-400 underline hover:text-indigo-300 break-all">{part}</a>
    return <span key={i}>{part}</span>
  })
}
function AssistantText({ content }) { return <>{renderMarkdown(content)}</> }

// ── Thinking dots ──────────────────────────────────────────────────────────────
export function ThinkingBubble() {
  return (
    <div className="self-start flex items-center gap-1.5 bg-[#1e1e2a] border border-white/[0.06] rounded-2xl rounded-bl-sm px-4 py-3">
      <div className="vw-dot" /><div className="vw-dot" /><div className="vw-dot" />
    </div>
  )
}

// ── Single message bubble ──────────────────────────────────────────────────────
// export function Message({ msg, onInteract, sendSilent, isLoading }) {
//   if (msg.role === 'thinking') return <ThinkingBubble />

//   const isUser = msg.role === 'user'
//   const isErr  = msg.role === 'error'

//   if (!isUser && !isErr) {
//     const parsed = parseSpecialContent(msg.content)

//     // Completely hide raw slots messages — widget handles them internally
//     if (parsed.type === 'slots_raw') return null

//     if (parsed.type === 'booking_widget') {
//       return (
//         <div className="self-start flex flex-col gap-1" style={{ width: '100%', maxWidth: 340 }}>
//           <BookingWidget before={parsed.before} sendSilent={sendSilent} />
//           <span className="text-[10px] text-white/20 px-1">{fmtTime(msg.ts)}</span>
//         </div>
//       )
//     }

//     if (parsed.type === 'login_buttons') {
//       return (
//         <div className="self-start flex flex-col gap-1 max-w-[85%]">
//           <div className="px-3.5 py-3 bg-[#1e1e2a] border border-white/[0.06] rounded-2xl rounded-bl-sm">
//             <LoginButtons before={parsed.before} />
//           </div>
//           <span className="text-[10px] text-white/20 px-1">{fmtTime(msg.ts)}</span>
//         </div>
//       )
//     }

//     if (parsed.type === 'contact_form') {
//       return (
//         <div className="self-start flex flex-col gap-1 max-w-[85%]">
//           <div className="px-3.5 py-3 bg-[#1e1e2a] border border-white/[0.06] rounded-2xl rounded-bl-sm">
//             <ContactForm before={parsed.before} onSubmit={onInteract} disabled={isLoading} />
//           </div>
//           <span className="text-[10px] text-white/20 px-1">{fmtTime(msg.ts)}</span>
//         </div>
//       )
//     }
//   }

//   return (
//     <div className={`flex flex-col gap-1 max-w-[85%] ${isUser ? 'self-end items-end' : 'self-start items-start'}`}>
//       <div className={`px-3.5 py-2.5 text-[13px] leading-relaxed break-words rounded-2xl
//         ${isUser
//           ? 'bg-indigo-500 text-white rounded-br-sm'
//           : isErr
//             ? 'bg-red-500/10 text-red-400 border border-red-500/20 rounded-bl-sm'
//             : 'bg-[#1e1e2a] text-[#e8e8f2] border border-white/[0.06] rounded-bl-sm'
//         }`}>
//         {isUser || isErr ? msg.content : <AssistantText content={msg.content || ''} />}
//       </div>
//       <span className="text-[10px] text-white/20 px-1">{fmtTime(msg.ts)}</span>
//     </div>
//   )
// }
export function Message({ msg, onInteract, sendSilent, isLoading }) {
  if (msg.role === 'thinking') return <ThinkingBubble />

  const isUser = msg.role === 'user'
  const isErr  = msg.role === 'error'

  if (!isUser && !isErr) {
    const parsed = parseSpecialContent(msg.content)

    if (parsed.type === 'slots_raw') return null

    if (parsed.type === 'booking_widget') {
      return (
        <div className="self-start flex flex-col gap-1" style={{ width: '100%', maxWidth: 340 }}>
          <BookingWidget before={parsed.before} sendSilent={sendSilent} />
          <span className="text-[10px] text-white/20 px-1">{fmtTime(msg.ts)}</span>
        </div>
      )
    }

    if (parsed.type === 'login_only') {
      return (
        <div className="self-start flex flex-col gap-1 max-w-[85%]">
          <div className="px-3.5 py-3 bg-[#1e1e2a] border border-white/[0.06] rounded-2xl rounded-bl-sm">
            <LoginOnlyButton before={parsed.before} />
          </div>
          <span className="text-[10px] text-white/20 px-1">{fmtTime(msg.ts)}</span>
        </div>
      )
    }

    if (parsed.type === 'signup_only') {
      return (
        <div className="self-start flex flex-col gap-1 max-w-[85%]">
          <div className="px-3.5 py-3 bg-[#1e1e2a] border border-white/[0.06] rounded-2xl rounded-bl-sm">
            <SignupOnlyButton before={parsed.before} />
          </div>
          <span className="text-[10px] text-white/20 px-1">{fmtTime(msg.ts)}</span>
        </div>
      )
    }

    if (parsed.type === 'login_buttons') {
      return (
        <div className="self-start flex flex-col gap-1 max-w-[85%]">
          <div className="px-3.5 py-3 bg-[#1e1e2a] border border-white/[0.06] rounded-2xl rounded-bl-sm">
            <LoginButtons before={parsed.before} />
          </div>
          <span className="text-[10px] text-white/20 px-1">{fmtTime(msg.ts)}</span>
        </div>
      )
    }

    if (parsed.type === 'contact_form') {
      return (
        <div className="self-start flex flex-col gap-1 max-w-[85%]">
          <div className="px-3.5 py-3 bg-[#1e1e2a] border border-white/[0.06] rounded-2xl rounded-bl-sm">
            <ContactForm before={parsed.before} onSubmit={onInteract} disabled={isLoading} />
          </div>
          <span className="text-[10px] text-white/20 px-1">{fmtTime(msg.ts)}</span>
        </div>
      )
    }
  }

  return (
    <div className={`flex flex-col gap-1 max-w-[85%] ${isUser ? 'self-end items-end' : 'self-start items-start'}`}>
      <div className={`px-3.5 py-2.5 text-[13px] leading-relaxed break-words rounded-2xl
        ${isUser
          ? 'bg-indigo-500 text-white rounded-br-sm'
          : isErr
            ? 'bg-red-500/10 text-red-400 border border-red-500/20 rounded-bl-sm'
            : 'bg-[#1e1e2a] text-[#e8e8f2] border border-white/[0.06] rounded-bl-sm'
        }`}>
        {isUser || isErr ? msg.content : <AssistantText content={msg.content || ''} />}
      </div>
      <span className="text-[10px] text-white/20 px-1">{fmtTime(msg.ts)}</span>
    </div>
  )
}

export function TraceGroup() { return null }
export function groupMessages(messages) {
  return messages
    .filter(msg => msg.role !== 'tool_call' && msg.role !== 'tool_response')
    .map(msg => ({ type: 'message', msg }))
}
