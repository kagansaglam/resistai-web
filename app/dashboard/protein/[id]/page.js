'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '../../../../lib/supabase'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function ProteinDetail() {
  const { id } = useParams()
  const [protein, setProtein] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const supabase = createClient()

useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }
      const r = await fetch(`${API_URL}/proteins/${id}`)
      if (r.ok) { const data = await r.json(); setProtein(data) }
      setLoading(false)
    }
    init()
  }, [id])

async function saveProtein() {
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/auth/login'); return }
    await supabase.from('saved_proteins').upsert({
      user_id: user.id,
      uniprot_id: protein.uniprot_id,
      gene: protein.gene,
      organism: protein.organism,
      family: protein.family,
      best_score: protein.druggability.best_score,
    })
    setSaved(true)
    setSaving(false)
  }

if (loading) return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="text-gray-400 text-sm">Loading...</div>
    </div>
  )

  if (!protein) return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="text-gray-400 text-sm">Protein not found.</div>
    </div>
  )

const d = protein.druggability
  const tierColor = d.tier === 'high' ? 'text-emerald-600 bg-emerald-50' : d.tier === 'medium' ? 'text-amber-600 bg-amber-50' : 'text-red-600 bg-red-50'

  return (
    <div className="min-h-screen bg-stone-50">
      <nav className="bg-white border-b border-stone-200 px-8 py-3 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="ResistAI" className="h-8 w-auto" />
        </Link>

<div className="flex gap-4 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900 transition">Home</Link>
          <Link href="/dashboard" className="hover:text-gray-900 transition">Proteins</Link>
          <Link href="/dashboard/search" className="hover:text-gray-900 transition">Literature</Link>
          <Link href="/dashboard/results" className="hover:text-gray-900 transition">My Results</Link>
        </div>
      </nav>
<div className="max-w-4xl mx-auto px-8 py-10">
        <Link href="/dashboard" className="text-sm text-gray-400 hover:text-gray-700 transition mb-6 inline-block">&larr; Back to proteins</Link>

        <div className="bg-white rounded-xl border border-stone-200 p-8 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{protein.gene}</h1>
              <p className="text-gray-500 mt-1">{protein.organism}</p>
              <p className="text-sm text-gray-400 mt-1">UniProt: {protein.uniprot_id} · Family: {protein.family}</p>
            </div>
            <span className={`text-sm font-medium px-3 py-1.5 rounded-full ${tierColor}`}>
              {d.tier.charAt(0).toUpperCase() + d.tier.slice(1)} druggability
            </span>
          </div>

<div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-stone-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600">{d.best_score?.toFixed(3)}</div>
              <div className="text-xs text-gray-400 mt-1">Best score</div>
            </div>
            <div className="bg-stone-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{d.total_pockets}</div>
              <div className="text-xs text-gray-400 mt-1">Total pockets</div>
            </div>
            <div className="bg-stone-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{d.high_pockets}</div>
              <div className="text-xs text-gray-400 mt-1">High pockets</div>
            </div>
          </div>
        </div>

{protein.top_pockets?.length > 0 && (
          <div className="bg-white rounded-xl border border-stone-200 p-8 mb-6">
            <h2 className="font-semibold text-gray-900 mb-4">Top Binding Pockets</h2>
            <div className="space-y-3">
              {protein.top_pockets.map(p => (
                <div key={p.pocket_id} className="flex items-center justify-between py-3 border-b border-stone-100 last:border-0">
                  <div>
                    <span className="text-sm font-medium text-gray-900">Pocket #{p.pocket_id}</span>
                    <span className="text-xs text-gray-400 ml-3">Volume: {p.volume_A3?.toFixed(1)} A3</span>
                  </div>

<div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">{p.druggability_tier}</span>
                    <span className="text-sm font-mono font-medium text-emerald-600">{p.druggability_score?.toFixed(3)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

<div className="flex gap-3 flex-wrap">
          <a href={`https://www.uniprot.org/uniprot/${protein.uniprot_id}`} target="_blank" rel="noreferrer" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm rounded-lg transition">UniProt</a>
          <a href={`https://alphafold.ebi.ac.uk/entry/${protein.uniprot_id}`} target="_blank" rel="noreferrer" className="px-4 py-2 border border-stone-200 hover:border-stone-300 text-gray-700 text-sm rounded-lg transition">AlphaFold</a>
          <Link href="/dashboard/search" className="px-4 py-2 border border-stone-200 hover:border-stone-300 text-gray-700 text-sm rounded-lg transition">Search Literature</Link>
          <button onClick={saveProtein} disabled={saving || saved} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm rounded-lg transition">
            {saved ? 'Saved!' : saving ? 'Saving...' : 'Save to Results'}
          </button>
        </div>
      </div>
    </div>
  )
}
