'use client'
import { useEffect, useState } from 'react'
import { createClient } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [proteins, setProteins] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [tier, setTier] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login')
        return
      }
      setUser(user)
      await Promise.all([fetchStats(), fetchProteins()])
      setLoading(false)
    }
    init()
  }, [])

  async function fetchStats() {
    try {
      const r = await fetch('http://localhost:8000/stats')
      const data = await r.json()
      setStats(data)
    } catch (e) {}
  }

  async function fetchProteins(tierFilter = '', limit = 50) {
    try {
      let url = `http://localhost:8000/proteins?limit=${limit}`
      if (tierFilter) url += `&tier=${tierFilter}`
      const r = await fetch(url)
      const data = await r.json()
      setProteins(data)
    } catch (e) {}
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
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-gray-400 text-sm">Loading ResistAI...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-stone-200 px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl">🧬</span>
            <span className="font-bold text-gray-900">ResistAI</span>
          </Link>
          <div className="flex gap-4 text-sm text-gray-500">
            <Link href="/dashboard" className="text-emerald-600 font-medium">Proteins</Link>
            <Link href="/dashboard/search" className="hover:text-gray-900 transition">Literature</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">{user?.email}</span>
          <button
            onClick={handleSignOut}
            className="text-sm text-gray-500 hover:text-gray-900 transition"
          >
            Sign out
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Stats */}
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

        {/* Filters */}
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
            onChange={e => { setTier(e.target.value); fetchProteins(e.target.value) }}
            className="bg-white border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400"
          >
            <option value="">All tiers</option>
            <option value="high">High druggability</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Resistance Proteins</h2>
            <span className="text-sm text-gray-400">{filtered.length} proteins</span>
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
                {filtered.map((p, i) => (
                  <tr key={p.uniprot_id} className="border-b border-stone-50 hover:bg-stone-50 transition cursor-pointer">
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
        </div>
      </div>
    </div>
  )
}
