'use client'
import { useEffect, useState } from 'react'
import { createClient } from '../../../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
export default function Results() {
  const [proteins, setProteins] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

useEffect(() => {
    async function fetchResults() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }
      const { data } = await supabase
        .from('saved_proteins')
        .select('*')
        .order('saved_at', { ascending: false })
      setProteins(data || [])
      setLoading(false)
    }
    fetchResults()
  }, [])

async function removeProtein(id) {
    await supabase.from('saved_proteins').delete().eq('id', id)
    setProteins(prev => prev.filter(p => p.id !== id))
  }

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
            <Link href="/dashboard/search" className="hover:text-gray-900 transition">Literature</Link>
            <Link href="/dashboard/results" className="text-emerald-600 font-medium">My Results</Link>
          </div>
        </div>
      </nav>

<div className="max-w-4xl mx-auto px-8 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Results</h1>
        <p className="text-gray-500 text-sm mb-8">Proteins you have saved for further analysis</p>

        {loading && <div className="text-gray-400 text-sm">Loading...</div>}
{!loading && proteins.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-stone-200">
            <p className="text-gray-400 text-sm mb-4">No saved proteins yet.</p>
            <Link href="/dashboard" className="text-emerald-600 hover:text-emerald-500 text-sm">Browse proteins &rarr;</Link>
          </div>
        )}
{proteins.length > 0 && (
          <div className="space-y-3">
            {proteins.map(p => (
              <div key={p.id} className="bg-white border border-stone-200 rounded-xl p-5 flex items-center justify-between hover:border-emerald-200 transition">
                <div className="flex items-center gap-4">
                  <div>
<Link href={`/dashboard/protein/${p.uniprot_id}`} className="font-medium text-gray-900 hover:text-emerald-600 transition">{p.gene}</Link>
                    <p className="text-xs text-gray-400 mt-0.5">{p.uniprot_id} · {p.organism}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${tierColor(p.best_score)}`}>{tierLabel(p.best_score)}</span>
                </div>
<div className="flex items-center gap-4">
                  <span className="text-sm font-mono text-gray-900">{p.best_score?.toFixed(3)}</span>
                  <button onClick={() => removeProtein(p.id)} className="text-xs text-red-400 hover:text-red-600 transition">Remove</button>
                </div>
              </div>
            ))}
          </div>
)}
      </div>
    </div>
  )
}
