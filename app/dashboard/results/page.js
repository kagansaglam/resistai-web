'use client'
import { useEffect, useState } from 'react'
import { createClient } from '../../../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
export default function Results() {
  const [proteins, setProteins] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
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

useEffect(() => {
    if (!selected) return
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/3Dmol/2.1.0/3Dmol-min.js'
    script.onload = () => {
      const el = document.getElementById('result-viewer')
      if (!el) return
      const viewer = window.$3Dmol.createViewer(el, { backgroundColor: '#f5f0eb' })
      fetch(`https://alphafold.ebi.ac.uk/files/AF-${selected.uniprot_id}-F1-model_v4.pdb`)
        .then(r => r.text())
        .then(pdb => {
viewer.addModel(pdb, 'pdb')
          viewer.setStyle({}, { cartoon: { colorscheme: { prop: 'ss', map: { h: '#4F46E5', s: '#7C3AED', loop: '#6D28D9' } } } })
          viewer.zoomTo()
          viewer.render()
        })
        .catch(() => {
          window.$3Dmol.download('pdb:1KZN', viewer, {}, () => {
            viewer.setStyle({}, { cartoon: { color: 'spectrum' } })
            viewer.zoomTo()
            viewer.render()
          })
        })
    }
if (!window.$3Dmol) {
      document.head.appendChild(script)
    } else {
      script.onload()
    }
  }, [selected])

async function removeProtein(id) {
    await supabase.from('saved_proteins').delete().eq('id', id)
    setProteins(prev => prev.filter(p => p.id !== id))
    if (selected?.id === id) setSelected(null)
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

<div className="max-w-6xl mx-auto px-8 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Results</h1>
        <p className="text-gray-500 text-sm mb-8">Saved proteins for further analysis</p>

        {loading && <div className="text-gray-400 text-sm">Loading...</div>}

{!loading && proteins.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-stone-200">
            <p className="text-gray-400 text-sm mb-4">No saved proteins yet.</p>
            <Link href="/dashboard" className="text-emerald-600 hover:text-emerald-500 text-sm">Browse proteins &rarr;</Link>
          </div>
        )}

{proteins.length > 0 && (
          <div className="grid grid-cols-1 gap-4">
            {proteins.map(p => (
              <div key={p.id} className={`bg-white border rounded-xl transition ${selected?.id === p.id ? 'border-emerald-300 shadow-sm' : 'border-stone-200'}`}>
                <div className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>

<Link href={`/dashboard/protein/${p.uniprot_id}`} className="font-medium text-gray-900 hover:text-emerald-600 transition">{p.gene}</Link>
                      <p className="text-xs text-gray-400 mt-0.5">{p.uniprot_id} · {p.organism}</p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${tierColor(p.best_score)}`}>{tierLabel(p.best_score)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono text-gray-900">{p.best_score?.toFixed(3)}</span>
                    <button
                      onClick={() => setSelected(selected?.id === p.id ? null : p)}
                      className="text-xs px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg transition"
                    >

{selected?.id === p.id ? 'Hide 3D' : 'View 3D'}
                    </button>
                    <Link href={`/dashboard/search?q=${p.gene}`} className="text-xs px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg transition">
                      Literature
                    </Link>
                    <button onClick={() => removeProtein(p.id)} className="text-xs text-red-400 hover:text-red-600 transition">Remove</button>
                  </div>
                </div>

{selected?.id === p.id && (
                  <div className="border-t border-stone-100 p-4">
                    <div className="flex gap-2 mb-3">
                      <span className="text-xs text-gray-400">drag to rotate · scroll to zoom</span>
                    </div>
                    <div id="result-viewer" style={{ width: '100%', height: '380px', background: '#f5f0eb', borderRadius: '8px' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
