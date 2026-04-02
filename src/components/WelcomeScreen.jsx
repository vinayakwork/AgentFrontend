import React from 'react'
import { IconChat } from './Icons'

export default function WelcomeScreen({ agentName, suggestions, onChip }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 py-8 text-center gap-5">
      <div className="relative">
        <div className="w-14 h-14 rounded-full bg-indigo-500/10 border border-indigo-500/30
                        flex items-center justify-center text-indigo-400">
          <IconChat />
        </div>
        <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-400
                         border-2 border-[#0d0d12] shadow-[0_0_8px_#34d39966]" />
      </div>

      <div className="space-y-1.5">
        <h4 className="text-[#e8e8f2] font-semibold text-[15px] tracking-tight">
          Hi, I'm {agentName}
        </h4>
        <p className="text-white/35 text-[12.5px] leading-relaxed max-w-[260px]">
          Ask me anything about Condense — pipelines, features, docs, or book a demo.
        </p>
      </div>

      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mt-1">
          {suggestions.slice(0, 4).map((s, i) => (
            <button key={i} onClick={() => onChip(s)}
              className="bg-[#1e1e2a] border border-white/[0.08] rounded-full
                         px-3.5 py-1.5 text-[11.5px] text-white/55 font-medium
                         hover:bg-indigo-500/15 hover:border-indigo-500/40 hover:text-white/80
                         transition-all duration-150 cursor-pointer">
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
