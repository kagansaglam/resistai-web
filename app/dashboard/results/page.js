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
      const pdbIds = {
        'P0AES4': '1AB4',
        'P31224': '1IWG',
        'P0AAW9': '4C48',
        'P0AE06': '2F1M',
        'P52477': '1T5E',
        'P9WGR1': '1BVR',
        'P0C002': '7S2I',
        'P52002': '2V50',
        'P9WGT3': '1UZL',
        'P9WIE5': '1SJ2',
        'Q2TR58': '4OH0',
        'P05057': '1KAN',
        'P14488': '6DJA',
        'Q840P9': '2Y87',
        'Q9L4P2': '4JF4',
        'A0A5R8T042': '4HBT',
        'P52700': '1SML',
        'C0HMD9': '7S2L',
        'P59655': '2VEF',
        'P9WMQ5': '6ACA',
        'A0QZ11': '5TW1',
        'P00484': '1CIA',
        'Q43899': '4E8O',
        'P17585': '2PBE',
        'P0AC13': '1AJ0',
        'P0AES6': '1AJ6',
        'A0A1C3NEV1': '5MX9',
        'P05364': '1BLS',
        'P72525': '2NOV',
        'P0AD64': '1ONG',
        'P28585': '7U48',
        'Q51487': '1WP1',
        'Q8ZPX9': '4CS6',
        'P9WFK7': '3R1K',
        'Q9F663': '2OV5',
        'A0QUE0': '6YXU',
        'C7C422': '3PG4',
        'P52699': '1DD6',
        'Q7WYA8': '6R73',
        'A0A0R6L508': '5GOV',
        'P26918': '1X8G',
        'P60281': '5TW1',
        'Q5U7L7': '6BM9',
        'Q47066': '1BZA',
        'Q99QC1': '1ZKJ',
        'O05701': '1AD1',
        'P35804': '1JTG',
        'P9WQG9': '1M44',
        'Q44057': '4EVY',
        'P9WI99': '3ATS',
        'P02930': '1EK9',
        'P9WG47': '3IFZ',
        'A0A0F7KYQ8': '7UYA',
        'O08498': '1M2X',
        'P29808': '7MQK',
        'P25910': '1A7T',
        'P9WGY9': '4KBJ',
        'P9WQB7': '2BMX',
        'A0A649V088': '8SJ3',
        'P0AE05': '4WQK',
        'P04190': '1BC2',
        'P0AG05': '7UY4',
        'P00552': '1ND4',
        'Q9R381': '1S3Z',
        'P0AC11': '7S2J',
        'Q7ATH7': '4QC6',
        'P0A0C1': '4ORK',
        'P9WJG3': '4ILU',
      }
      const pdbId = pdbIds[selected.uniprot_id] || null
      if (!pdbId) { document.getElementById('result-viewer').innerHTML = '<p style="padding:20px;color:#999">No PDB structure available for this protein.</p>'; return }
      fetch(`https://files.rcsb.org/download/${pdbId}.pdb`)
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
