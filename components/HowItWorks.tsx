'use client'
import { useState } from 'react'

const steps = [
  {
    step: "01", icon: "🧬", title: "Protein input",
    sub: "UniProt ID or sequence",
    desc: "Any WHO ESKAPE priority pathogen or M. tuberculosis resistance protein. Input a UniProt accession (e.g. P9WJB0) — the pipeline resolves sequence and metadata automatically.",
    badges: ["UniProt", "2,433 proteins"],
    color: "border-stone-200",
    badgeColor: "bg-stone-100 text-stone-600",
  },
  {
    step: "02", icon: "🏗️", title: "Structure & embedding",
    sub: "AlphaFold DB + ESM-2 35M",
    desc: "High-confidence 3D structures are pulled from AlphaFold DB v4. ESM-2 (35M parameters) generates a 480-dim protein embedding capturing evolutionary and structural context.",
    badges: ["AlphaFold DB", "ESM-2 35M", "ESMFold fallback"],
    color: "border-teal-200",
    badgeColor: "bg-teal-50 text-teal-700",
  },
  {
    step: "03", icon: "🔍", title: "Pocket detection",
    sub: "fpocket cavity analysis",
    desc: "fpocket scans the 3D surface for druggable cavities, scoring each pocket by volume, hydrophobicity, and polarity. Pockets with score ≥ 0.7 are classified as high-druggability.",
    badges: ["fpocket 4.0", "Score ≥ 0.7 = high"],
    color: "border-teal-200",
    badgeColor: "bg-teal-50 text-teal-700",
  },
  {
    step: "04", icon: "📚", title: "Literature retrieval",
    sub: "ChromaDB + PubMed",
    desc: "ChromaDB indexes 2,508 PubMed abstracts as dense vectors. At query time, the top-k most relevant articles are retrieved for context-aware AI synthesis.",
    badges: ["ChromaDB", "2,508 PubMed articles"],
    color: "border-purple-200",
    badgeColor: "bg-purple-50 text-purple-700",
  },
  {
    step: "05", icon: "🤖", title: "AI interpretation",
    sub: "Llama 3.3 70B via Groq",
    desc: "Llama 3.3 70B synthesises structural findings and retrieved literature into a PMID-cited research summary — grounded in real evidence, not hallucination.",
    badges: ["Llama 3.3 70B", "Groq", "PMID-cited"],
    color: "border-amber-200",
    badgeColor: "bg-amber-50 text-amber-700",
  },
  {
    step: "06", icon: "🎯", title: "Ranked targets + report",
    sub: "Dashboard, API, or email",
    desc: "Actionable druggability rankings delivered via interactive dashboard, REST API, or email report. Each result includes pocket geometry, ESM similarity score, and AI-cited literature.",
    badges: ["Dashboard", "REST API", "Email report"],
    color: "border-emerald-200",
    badgeColor: "bg-emerald-50 text-emerald-700",
  },
]

export default function HowItWorks() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {steps.map((s, i) => (
        <div key={s.step} className={`bg-white border ${s.color} rounded-xl overflow-hidden`}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex gap-5 p-5 items-center text-left hover:bg-stone-50 transition"
          >
            <div className="shrink-0 w-10 h-10 bg-stone-50 border border-stone-200 rounded-lg flex items-center justify-center text-lg">{s.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-mono text-emerald-500">{s.step}</span>
                <h3 className="text-sm font-semibold text-gray-900">{s.title}</h3>
              </div>
              <p className="text-xs text-gray-400">{s.sub}</p>
            </div>
            <span className={`text-gray-300 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}>▾</span>
          </button>
          {open === i && (
            <div className="px-5 pb-5 border-t border-stone-100">
              <p className="text-sm text-gray-500 leading-relaxed mb-3 mt-3">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.badges.map((b) => (
                  <span key={b} className={`text-xs px-2.5 py-1 rounded-full font-medium ${s.badgeColor}`}>{b}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
