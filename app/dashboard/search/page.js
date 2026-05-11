'use client'
import { useEffect, useState } from 'react'
import { createClient } from '../../../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function LiteratureSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function doSearch(q) {
    setLoading(true)
    setSearched(true)
    try {
      const r = await fetch(`${API_URL}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, n_results: 15 })
      })
      const data = await r.json()
      setResults(data.results || [])
    } catch (e) {
      setResults([])
    }
    setLoading(false)
  }

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }
      const params = new URLSearchParams(window.location.search)
      const q = params.get('q')
      if (q) {
        setQuery(q)
        doSearch(q)
      }
    }
    init()
  }, [])

  async function handleSearch(e) {
    e.preventDefault()
    if (!query.trim()) return
    doSearch(query)
  }

  const examples = [
    'VIM-2 metallo-beta-lactamase inhibitor',
    'KPC-2 carbapenem resistance mechanism',
    'NDM-1 drug target structure',
    'MRSA methicillin resistance',
    'TB isoniazid resistance InhA',
  ]

  return (
    <div className="min-h-screen bg-stone-50">
      <nav className="bg-white border-b border-stone-200 px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="ResistAI" className="h-8 w-auto" />
          </Link>
          <div className="flex gap-4 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900 transition">Home</Link>
            <Link href="/dashboard" className="hover:text-gray-900 transition">Proteins</Link>
            <Link href="/dashboard/search" className="text-emerald-600 font-medium">Literature</Link>
            <Link href="/dashboard/results" className="hover:text-gray-900 transition">My Results</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Literature Search</h1>
        <p className="text-gray-500 text-sm mb-8">Search across 2,508 indexed PubMed articles on antibiotic resistance</p>

        <form onSubmit={handleSearch} className="flex gap-3 mb-6">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="e.g. VIM-2 metallo-beta-lactamase inhibitor"
            className="flex-1 bg-white border border-stone-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {!searched && (
          <div>
            <p className="text-xs text-gray-400 mb-3">Example searches:</p>
            <div className="flex flex-wrap gap-2">
              {examples.map(ex => (
                <button
                  key={ex}
                  onClick={() => { setQuery(ex); doSearch(ex) }}
                  className="text-xs px-3 py-1.5 bg-white border border-stone-200 rounded-full text-gray-600 hover:border-emerald-300 hover:text-emerald-600 transition"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        )}

        {searched && !loading && results.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">No results found. PubMed API may be temporarily unavailable.</div>
        )}

        {results.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm text-gray-400">{results.length} articles found</p>
            {results.map(a => (
              <div key={a.pmid} className="bg-white border border-stone-200 rounded-xl p-5 hover:border-emerald-200 transition">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 leading-snug">{a.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{a.journal} · {a.year}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="text-xs font-mono text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                      {a.relevance_score?.toFixed(3)}
                    </span>
                    <a href={a.pubmed_url} target="_blank" rel="noreferrer" className="text-xs text-gray-400 hover:text-emerald-600 transition underline">PMID:{a.pmid}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
