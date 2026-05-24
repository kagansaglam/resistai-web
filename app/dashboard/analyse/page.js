'use client'
import { useState, useEffect } from 'react'
import { createClient } from '../../../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function AnalysePage() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [similar, setSimilar] = useState([])
  const [mlPrediction, setMlPrediction] = useState(null)
  const [aiAnswer, setAiAnswer] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) router.push('/auth/login')
    }
    init()
  }, [])

  async function handleAnalyse(e) {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setResult(null)
    setError('')
    setSimilar([])
    setMlPrediction(null)
    setAiAnswer('')

    try {
      const uid = query.trim().toUpperCase()

      // 1. Analyse
      const r = await fetch(`${API_URL}/analyse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: uid })
      })
      const data = await r.json()
      if (!r.ok) { setError(data.detail || 'Analysis failed.'); setLoading(false); return }
      setResult(data)

      // 2. Similar proteins
      try {
        const sr = await fetch(`${API_URL}/similar-proteins/${uid}?n=5`)
        if (sr.ok) { const sd = await sr.json(); setSimilar(sd.results || []) }
      } catch (e) {}

      // 3. ML prediction
      try {
        const mlR = await fetch(`${API_URL}/predict-druggability`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uniprot_id: uid })
        })
        if (mlR.ok) { const mlData = await mlR.json(); setMlPrediction(mlData) }
      } catch (e) {}

      // 4. AI literature
      setAiLoading(true)
      try {
        const searchR = await fetch(`${API_URL}/search`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: uid + ' antibiotic resistance drug target', n_results: 5 })
        })
        if (searchR.ok) {
          const searchData = await searchR.json()
          if (searchData.results?.length > 0) {
            const askR = await fetch(`${API_URL}/ask`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ query: `Is ${uid} a good drug target for antibiotic resistance?`, articles: searchData.results })
            })
            if (askR.ok) { const askData = await askR.json(); setAiAnswer(askData.answer || '') }
          }
        }
      } catch (e) {}
      setAiLoading(false)

    } catch (e) {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  const examples = ['Q840P9', 'P9WGR1', 'C7C422', 'P60184', 'O53044']

  const tierColor = (tier) => tier === 'high' ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : tier === 'medium' ? 'text-amber-600 bg-amber-50 border-amber-200' : 'text-red-600 bg-red-50 border-red-200'

  return (
    <div className="min-h-screen bg-stone-50">
      <nav className="bg-white border-b border-stone-200 px-8 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="ResistAI" className="h-8 w-auto" />
        </Link>
        <div className="flex gap-4 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900 transition">Home</Link>
          <Link href="/dashboard" className="hover:text-gray-900 transition">Proteins</Link>
          <Link href="/dashboard/search" className="hover:text-gray-900 transition">Literature</Link>
          <Link href="/dashboard/analyse" className="text-emerald-600 font-medium">Analyse</Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Analyse a protein</h1>
          <p className="text-gray-500 text-sm">Enter any UniProt ID to get druggability analysis, ESM-2 similarity search, ML prediction, and AI-powered literature summary.</p>
        </div>

        <form onSubmit={handleAnalyse} className="flex gap-3 mb-4">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="e.g. Q840P9"
            className="flex-1 bg-white border border-stone-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-400 font-mono"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition"
          >
            {loading ? 'Analysing...' : 'Analyse →'}
          </button>
        </form>

        <div className="flex items-center gap-2 mb-8">
          <span className="text-xs text-gray-400">Examples:</span>
          {examples.map(ex => (
            <button key={ex} onClick={() => setQuery(ex)}
              className="text-xs px-2.5 py-1 bg-white border border-stone-200 rounded-full text-gray-600 hover:border-emerald-300 hover:text-emerald-600 transition font-mono">
              {ex}
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-sm text-red-700">{error}</div>
        )}

        {loading && (
          <div className="bg-white border border-stone-200 rounded-xl p-8 text-center mb-6">
            <div className="flex items-center justify-center gap-3 text-gray-400">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm">Running pipeline — AlphaFold → fpocket → ESM-2 → literature...</span>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-4">

            {/* Header */}
            <div className="bg-white border border-stone-200 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{result.uniprot_id}</h2>
                  <p className="text-xs text-gray-400 mt-1">
                    {result.source === 'database' ? '✅ Found in pre-computed database' : '🔄 On-demand analysis'}
                  </p>
                </div>
                {result.druggability && (
                  <span className={`text-sm font-medium px-3 py-1.5 rounded-full border ${tierColor(result.druggability.tier)}`}>
                    {result.druggability.tier.charAt(0).toUpperCase() + result.druggability.tier.slice(1)} druggability
                  </span>
                )}
              </div>

              {result.druggability && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-stone-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-emerald-600">{result.druggability.best_score?.toFixed(3)}</div>
                    <div className="text-xs text-gray-400 mt-1">Best score</div>
                  </div>
                  <div className="bg-stone-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">{result.druggability.total_pockets}</div>
                    <div className="text-xs text-gray-400 mt-1">Total pockets</div>
                  </div>
                  <div className="bg-stone-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">{result.druggability.high_pockets}</div>
                    <div className="text-xs text-gray-400 mt-1">High pockets</div>
                  </div>
                </div>
              )}

              {result.message && (
                <p className="text-xs text-gray-400 mt-4 border-t border-stone-100 pt-3">{result.message}</p>
              )}
            </div>

            {/* ML Prediction */}
            {mlPrediction && (
              <div className="bg-white border border-stone-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="font-semibold text-gray-900 text-sm">ML prediction</h3>
                  <span className="text-xs text-gray-400 bg-stone-50 px-2 py-0.5 rounded-full border border-stone-200">XGBoost + ESM-2</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-stone-50 rounded-lg p-4 text-center">
                    <div className={`text-xl font-bold ${mlPrediction.predicted_tier === 'high' ? 'text-emerald-600' : mlPrediction.predicted_tier === 'medium' ? 'text-amber-600' : 'text-red-600'}`}>
                      {mlPrediction.predicted_tier.charAt(0).toUpperCase() + mlPrediction.predicted_tier.slice(1)}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Predicted tier</div>
                  </div>
                  <div className="bg-stone-50 rounded-lg p-4 text-center">
                    <div className="text-xl font-bold text-gray-900">{(mlPrediction.confidence * 100).toFixed(1)}%</div>
                    <div className="text-xs text-gray-400 mt-1">Confidence</div>
                  </div>
                  <div className="bg-stone-50 rounded-lg p-4 text-center">
                    <div className="text-xs text-gray-500 mt-1">
                      H: {(mlPrediction.probabilities?.high * 100).toFixed(0)}% ·
                      M: {(mlPrediction.probabilities?.medium * 100).toFixed(0)}% ·
                      L: {(mlPrediction.probabilities?.low * 100).toFixed(0)}%
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Probabilities</div>
                  </div>
                </div>
              </div>
            )}

            {/* Similar proteins */}
            {similar.length > 0 && (
              <div className="bg-white border border-stone-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="font-semibold text-gray-900 text-sm">Similar proteins</h3>
                  <span className="text-xs text-gray-400 bg-stone-50 px-2 py-0.5 rounded-full border border-stone-200">ESM-2 cosine similarity</span>
                </div>
                <div className="space-y-2">
                  {similar.map(s => (
                    <Link key={s.uniprot_id} href={`/dashboard/protein/${s.uniprot_id}`}
                      className="flex items-center justify-between py-2 px-3 rounded-lg border border-stone-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition">
                      <div>
                        <span className="text-sm font-medium text-gray-900">{s.gene}</span>
                        <span className={`text-xs ml-2 px-2 py-0.5 rounded-full font-medium ${s.druggability_tier === 'high' ? 'text-emerald-600 bg-emerald-50' : s.druggability_tier === 'medium' ? 'text-amber-600 bg-amber-50' : 'text-red-600 bg-red-50'}`}>{s.druggability_tier}</span>
                        <p className="text-xs text-gray-400 mt-0.5">{s.organism}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-400">similarity</div>
                        <div className="text-sm font-mono font-medium text-emerald-600">{s.similarity?.toFixed(3)}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* AI Summary */}
            {(aiLoading || aiAnswer) && (
              <div className="bg-white border border-emerald-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-semibold text-gray-900 text-sm">AI research summary</h3>
                  <span className="text-xs text-gray-400 ml-auto">Powered by Llama 3.3</span>
                </div>
                {aiLoading ? (
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    Searching literature...
                  </div>
                ) : (
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{aiAnswer}</p>
                )}
              </div>
            )}

            {/* Links */}
            <div className="flex gap-3 flex-wrap">
              <a href={`https://www.uniprot.org/uniprot/${result.uniprot_id}`} target="_blank" rel="noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm rounded-lg transition">UniProt →</a>
              <a href={`https://alphafold.ebi.ac.uk/entry/${result.uniprot_id}`} target="_blank" rel="noreferrer"
                className="px-4 py-2 border border-stone-200 hover:border-stone-300 text-gray-700 text-sm rounded-lg transition">AlphaFold →</a>
              <Link href={`/dashboard/search?q=${result.uniprot_id}`}
                className="px-4 py-2 border border-stone-200 hover:border-stone-300 text-gray-700 text-sm rounded-lg transition">Search literature →</Link>
              {result.source === 'database' && (
                <Link href={`/dashboard/protein/${result.uniprot_id}`}
                  className="px-4 py-2 border border-stone-200 hover:border-emerald-300 text-gray-700 hover:text-emerald-600 text-sm rounded-lg transition">Full protein page →</Link>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  )
}
