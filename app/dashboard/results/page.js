'use client'
import { useEffect, useState } from 'react'
import { createClient } from '../../../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function Results() {
  const [proteins, setProteins] = useState([])
  const [loading, setLoading] = useState(true)
  const [authChecked, setAuthChecked] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selected, setSelected] = useState(null)
  const [savingNote, setSavingNote] = useState(null)
  const [userEmail, setUserEmail] = useState('')
  const [emailSending, setEmailSending] = useState(null)
  const [emailSent, setEmailSent] = useState({})
  const [allEmailSending, setAllEmailSending] = useState(false)
  const [allEmailSent, setAllEmailSent] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function saveNote(id, note) {
    setSavingNote(id)
    await supabase.from('saved_proteins').update({ notes: note }).eq('id', id)
    setProteins(prev => prev.map(p => p.id === id ? { ...p, notes: note } : p))
    setSavingNote(null)
  }

  useEffect(() => {
    async function fetchResults() {
      const { data: { session } } = await supabase.auth.getSession()
      setAuthChecked(true)
      if (!session?.user) {
        setIsLoggedIn(false)
        setLoading(false)
        return
      }
      setIsLoggedIn(true)
      setUserEmail(session.user.email || '')
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
      const uid = selected.uniprot_id
      const afUrl = `https://alphafold.ebi.ac.uk/files/AF-${uid}-F1-model_v6.pdb`
      fetch(afUrl)
        .then(r => r.text())
        .then(pdb => {
          viewer.addModel(pdb, "pdb")
          viewer.setStyle({}, { cartoon: { colorscheme: { prop: "ss", map: { h: "#4F46E5", s: "#7C3AED", loop: "#6D28D9" } } } })
          viewer.zoomTo()
          viewer.render()
        })
        .catch(() => {
          if (el) el.innerHTML = '<p style="padding:20px;color:#999;font-size:12px">No AlphaFold structure available for this protein.</p>'
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

  async function sendEmailReport(protein) {
    if (!userEmail) return
    setEmailSending(protein.id)
    try {
      const tier = protein.best_score >= 0.7 ? 'High' : protein.best_score >= 0.4 ? 'Medium' : 'Low'
      await fetch(`${API_URL}/send-report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to_email: userEmail,
          user_name: userEmail.split('@')[0],
          query: `${protein.gene} (${protein.uniprot_id}) — druggability analysis`,
          answer: `Gene: ${protein.gene} | Organism: ${protein.organism} | Family: ${protein.family} | Druggability: ${tier} (score: ${protein.best_score?.toFixed(3)}) | Notes: ${protein.notes || 'None'}`,
          articles: []
        })
      })
      setEmailSent(prev => ({ ...prev, [protein.id]: true }))
    } catch (e) {
      console.error('Email send failed:', e)
    }
    setEmailSending(null)
  }

  async function sendAllEmailReport() {
    if (!userEmail || proteins.length === 0) return
    setAllEmailSending(true)
    try {
      const summary = proteins.map(p => {
        const tier = p.best_score >= 0.7 ? 'High' : p.best_score >= 0.4 ? 'Medium' : 'Low'
        return `${p.gene} (${p.uniprot_id}) — ${tier} druggability (${p.best_score?.toFixed(3)})`
      }).join('\n')
      await fetch(`${API_URL}/send-report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to_email: userEmail,
          user_name: userEmail.split('@')[0],
          query: `My ResistAI Results — ${proteins.length} saved proteins`,
          answer: summary,
          articles: []
        })
      })
      setAllEmailSent(true)
    } catch (e) {
      console.error('Bulk email send failed:', e)
    }
    setAllEmailSending(false)
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
      <nav className="bg-white border-b border-stone-200 px-4 sm:px-8 py-3 flex items-center justify-between overflow-x-auto">
        <div className="flex items-center gap-3 sm:gap-6 shrink-0">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img src="/logo.png" alt="ResistAI" className="h-8 w-auto" />
          </Link>
          <div className="flex gap-3 sm:gap-4 text-sm text-gray-500 shrink-0 whitespace-nowrap">
            <Link href="/" className="hover:text-gray-900 transition">Home</Link>
            <Link href="/dashboard" className="hover:text-gray-900 transition">Proteins</Link>
            <Link href="/dashboard/search" className="hover:text-gray-900 transition">Literature</Link>
            <Link href="/dashboard/results" className="text-emerald-600 font-medium">My Results</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
        {/* Not logged in */}
        {authChecked && !isLoggedIn && (
          <div className="text-center py-16 bg-white rounded-xl border border-stone-200">
            <p className="text-gray-600 text-sm mb-2 font-medium">Sign in to view your saved results</p>
            <p className="text-gray-400 text-sm mb-5">Save proteins from the dashboard to build your research list.</p>
            <div className="flex gap-3 justify-center">
              <Link href="/auth/login" className="px-5 py-2 border border-stone-200 hover:border-stone-300 text-gray-700 text-sm rounded-lg transition">Sign in</Link>
              <Link href="/auth/signup" className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm rounded-lg transition">Sign up free</Link>
            </div>
          </div>
        )}

        {isLoggedIn && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">My Results</h1>
                <p className="text-gray-500 text-sm">Saved proteins for further analysis</p>
              </div>
              {proteins.length > 0 && (
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">{proteins.length} proteins saved</span>
                  {allEmailSent ? (
                    <span className="text-xs text-emerald-600 font-medium">✓ Report sent!</span>
                  ) : (
                    <button
                      onClick={sendAllEmailReport}
                      disabled={allEmailSending}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-medium rounded-lg transition"
                    >
                      {allEmailSending ? 'Sending...' : '📧 Email all results'}
                    </button>
                  )}
                </div>
              )}
            </div>

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
                    <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="min-w-0">
                          <Link href={`/dashboard/protein/${p.uniprot_id}`} className="font-medium text-gray-900 hover:text-emerald-600 transition">{p.gene}</Link>
                          <p className="text-xs text-gray-400 mt-0.5 truncate">{p.uniprot_id} · {p.organism}</p>
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full shrink-0 ${tierColor(p.best_score)}`}>{tierLabel(p.best_score)}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap shrink-0">
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
                        {emailSent[p.id] ? (
                          <span className="text-xs text-emerald-600 font-medium">✓ Sent</span>
                        ) : (
                          <button
                            onClick={() => sendEmailReport(p)}
                            disabled={emailSending === p.id}
                            className="text-xs px-3 py-1.5 bg-stone-50 hover:bg-stone-100 text-gray-600 rounded-lg transition border border-stone-200"
                          >
                            {emailSending === p.id ? '...' : '📧'}
                          </button>
                        )}
                        <button
                          onClick={() => removeProtein(p.id)}
                          className="text-xs w-7 h-7 flex items-center justify-center text-red-400 hover:text-white hover:bg-red-500 rounded-lg transition border border-red-100 hover:border-red-500"
                          title="Remove"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                    <div className="px-4 sm:px-5 pb-4">
                      <textarea
                        defaultValue={p.notes || ''}
                        onBlur={e => saveNote(p.id, e.target.value)}
                        placeholder="Add notes about this protein..."
                        className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-400 resize-none"
                        rows={2}
                      />
                      {savingNote === p.id && <span className="text-xs text-gray-400">Saving...</span>}
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
          </>
        )}
      </div>
    </div>
  )
}
