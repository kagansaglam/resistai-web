'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { createClient } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const PAGE_SIZE = 50

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [proteins, setProteins] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [fetchError, setFetchError] = useState('')
  const [search, setSearch] = useState('')
  const [tier, setTier] = useState('')
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }
      setUser(user)
      await Promise.all([fetchStats(), fetchProteins('', 0)])
      setLoading(false)
    }
    init()
  }, [])

  async function fetchStats() {
    try {
      const r = await fetch(`${API_URL}/stats`)
      const data = await r.json()
      setStats(data)
    } catch (e) {
      console.error('Failed to fetch stats:', e)
    }
  }

  async function fetchProteins(tierFilter = '', newOffset = 0) {
    try {
      let url = `${API_URL}/proteins?limit=${PAGE_SIZE}&offset=${newOffset}`
      if (tierFilter) url += `&tier=${tierFilter}`
      const r = await fetch(url)
      if (!r.ok) throw new Error(`API error: ${r.status}`)
      const data = await r.json()
      if (newOffset === 0) {
        setProteins(data)
      } else {
        setProteins(prev => [...prev, ...data])
      }
      setHasMore(data.length === PAGE_SIZE)
      setOffset(newOffset + data.length)
    } catch (e) {
      console.error('Failed to fetch proteins:', e)
      setFetchError('Could not load proteins. Please refresh the page.')
    }
  }

  async function handleLoadMore() {
    setLoadingMore(true)
    await fetchProteins(tier, offset)
    setLoadingMore(false)
  }

  async function handleTierChange(newTier) {
    setTier(newTier)
    setOffset(0)
    setProteins([])
    await fetchProteins(newTier, 0)
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  const filtered = proteins.filter(p =>
    p.gene.toLowerCase().includes(search.toLowerCase()) ||
    p.organism.toLowerCase().includes(search.toLowerCase()) ||
    p.family.toLowerCase().includes(search.toLowerCase())
  )

  const tierColor = (score) => {
    if (score >= 0.7) return 'text-emerald-600 bg-emerald-50'
    if (score >= 0.4) return 'text-amber-600 bg-amber-50'
    return 'text-red-600 bg-red-50'
  }

  const tierLabel = (score) => {
    if (score >= 0.7) return 'High'
    if (score >= 0.4) return 'Medium'
    return 'Low'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50">
        <nav className="bg-white border-b border-stone-200 px-8 py-3 flex items-center justify-between">
          <div className="h-8 w-28 bg-stone-100 rounded-lg animate-pulse" />
          <div className="flex gap-4">
            {[80, 64, 72, 60].map(w => (
              <div key={w} className="h-4 bg-stone-100 rounded animate-pulse" style={{ width: w }} />
            ))}
          </div>
          <div className="h-8 w-20 bg-stone-100 rounded-lg animate-pulse" />
        </nav>
        <div className="px-8 py-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-white border border-stone-200 rounded-xl p-4">
                <div className="h-3 w-20 bg-stone-100 rounded animate-pulse mb-3" />
                <div className="h-7 w-16 bg-stone-100 rounded animate-pulse" />
              </div>
            ))}
          </div>
          <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-100">
              <div className="h-4 w-40 bg-stone-100 rounded animate-pulse" />
            </div>
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="px-6 py-4 border-b border-stone-100 flex gap-6 items-center">
                <div className="h-3 w-20 bg-stone-100 rounded animate-pulse" />
                <div className="h-3 w-36 bg-stone-100 rounded animate-pulse" />
                <div className="h-3 w-28 bg-stone-100 rounded animate-pulse" />
                <div className="h-5 w-14 bg-stone-100 rounded-full animate-pulse ml-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <nav className="bg-white border-b border-stone-200 px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="ResistAI" width={160} height={40} className="h-8 w-auto" style={{width: "auto"}} />
          </Link>
          <div className="flex gap-4 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900 transition">Home</Link>
            <Link href="/dashboard" className="text-emerald-600 font-medium">Proteins</Link>
            <Link href="/dashboard/search" className="hover:text-gray-900 transition">Literature</Link>
            <Link href="/dashboard/results" className="hover:text-gray-900 transition">My Results</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">{user?.email}</span>
          <button onClick={handleSignOut} className="text-sm text-gray-500 hover:text-gray-900 transition">Sign out</button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {stats && (
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Proteins', value: stats.total_proteins },
              { label: 'High Druggability', value: stats.high_druggability, color: 'text-emerald-600' },
              { label: 'Medium', value: stats.medium_druggability, color: 'text-amber-600' },
              { label: 'Best Score', value: stats.best_score?.toFixed(3), color: 'text-emerald-600' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl border border-stone-200 p-5">
                <div className={`text-2xl font-bold ${s.color || 'text-gray-900'}`}>{s.value}</div>
                <div className="text-sm text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Search gene, organism or family..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-white border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400"
          />
          <select
            value={tier}
            onChange={e => handleTierChange(e.target.value)}
            className="bg-white border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400"
          >
            <option value="">All tiers</option>
            <option value="high">High druggability</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {fetchError && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
            {fetchError}
          </div>
        )}
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Resistance Proteins</h2>
            <span className="text-sm text-gray-400">{filtered.length} loaded · {stats?.total_proteins} total</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50">
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Gene</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Organism</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Family</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Score</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Tier</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Pockets</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.uniprot_id} onClick={() => window.location.href=`/dashboard/protein/${p.uniprot_id}`} className="border-b border-stone-50 hover:bg-stone-50 transition cursor-pointer">
                    <td className="px-6 py-3">
                      <div className="font-medium text-gray-900 text-sm">{p.gene}</div>
                      <div className="text-xs text-gray-400">{p.uniprot_id}</div>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600 max-w-xs truncate">{p.organism}</td>
                    <td className="px-6 py-3 text-sm text-gray-500">{p.family}</td>
                    <td className="px-6 py-3 text-sm font-mono font-medium text-gray-900">{p.best_score?.toFixed(3)}</td>
                    <td className="px-6 py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${tierColor(p.best_score)}`}>
                        {tierLabel(p.best_score)}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-500">{p.total_pockets}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="px-6 py-4 border-t border-stone-100 text-center">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="px-6 py-2.5 bg-white border border-stone-200 hover:border-emerald-300 hover:text-emerald-600 text-sm text-gray-600 rounded-lg transition disabled:opacity-50"
              >
                {loadingMore ? 'Loading...' : `Load more proteins`}
              </button>
            </div>
          )}
          {!hasMore && proteins.length > 0 && (
            <div className="px-6 py-4 border-t border-stone-100 text-center text-xs text-gray-400">
              All {proteins.length} proteins loaded
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
