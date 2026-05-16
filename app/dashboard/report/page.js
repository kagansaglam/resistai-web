'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const steps = [
  {
    number: '01',
    title: 'Search the Literature',
    description: 'Go to the Literature Search page and type your research query — for example "VIM-2 metallo-beta-lactamase inhibitor" or "KPC-2 carbapenem resistance".',
    icon: '🔍',
  },
  {
    number: '02',
    title: 'Get AI Analysis',
    description: 'ResistAI automatically retrieves relevant PubMed articles and generates an AI-powered research summary using Llama 3.3, citing each paper by PMID.',
    icon: '🤖',
  },
  {
    number: '03',
    title: 'Send Report to Your Email',
    description: 'Once the AI summary appears, click the "📧 Email Report" button. The full report — including the AI analysis and all referenced articles with PubMed links — will be sent to your registered email address instantly.',
    icon: '📧',
  },
  {
    number: '04',
    title: 'Review & Share',
    description: 'Check your inbox for the ResistAI report. It includes your query, the complete AI interpretation, and clickable PubMed links for every referenced article — ready to share or save.',
    icon: '✅',
  },
]

export default function ReportPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Nav */}
      <nav className="bg-white border-b border-stone-200 px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="ResistAI" className="h-8 w-auto" />
          </Link>
          <div className="flex gap-4 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900 transition">Home</Link>
            <Link href="/dashboard" className="hover:text-gray-900 transition">Proteins</Link>
            <Link href="/dashboard/search" className="hover:text-gray-900 transition">Literature</Link>
            <Link href="/dashboard/results" className="hover:text-gray-900 transition">My Results</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-8 py-16">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-5xl mb-4 block">📧</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Email Reports</h1>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Export your AI-powered research analysis directly to your inbox — including the full literature summary and PubMed references.
          </p>
        </div>

        {/* Example report preview */}
        <div className="bg-white border border-emerald-200 rounded-2xl p-6 mb-12 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-semibold text-gray-700">Example Report</span>
            <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">noreply@resistai.bio</span>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-400 mb-1">Subject</p>
              <p className="text-sm font-medium text-gray-800">ResistAI Report: VIM-2 metallo-beta-lactamase inhibitor</p>
            </div>
            <div className="border-t border-stone-100 pt-3">
              <p className="text-xs text-gray-400 mb-1">AI Analysis</p>
              <p className="text-sm text-gray-600 leading-relaxed">VIM-2 is a valid target for drug discovery. Studies have employed structure-guided optimization (PMID:34763944) and fragment screening (PMID:26477515) to identify effective inhibitors...</p>
            </div>
            <div className="border-t border-stone-100 pt-3">
              <p className="text-xs text-gray-400 mb-2">Referenced Articles</p>
              <ul className="space-y-1">
                <li className="text-xs text-emerald-600 underline">↗ [PMID:34763944] (2022) Structure-guided optimization of VIM-Type metallo-β-lactamase inhibitors</li>
                <li className="text-xs text-emerald-600 underline">↗ [PMID:26477515] (2015) Novel Inhibitor Scaffolds against VIM-2 by SPR Fragment Screening</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Steps */}
        <h2 className="text-lg font-semibold text-gray-900 mb-6">How to generate a report</h2>
        <div className="space-y-4 mb-12">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-5 bg-white border border-stone-200 rounded-xl p-5">
              <div className="shrink-0 w-10 h-10 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-center text-lg">
                {step.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-emerald-500">{step.number}</span>
                  <h3 className="text-sm font-semibold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/dashboard/search"
            className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl transition text-sm shadow-sm"
          >
            🔍 Start a Literature Search
          </Link>
          <p className="text-xs text-gray-400 mt-3">Reports are sent to your registered email address</p>
        </div>
      </div>
    </div>
  )
}
