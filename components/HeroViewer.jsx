'use client'
import { useEffect, useRef, useState } from 'react'

const PROTEINS = [
  { pdb: '1KZN', name: 'KPC-2', org: 'Klebsiella pneumoniae', score: '0.427' },
  { pdb: '2FQU', name: 'VIM-2', org: 'Pseudomonas aeruginosa', score: '0.755' },
  { pdb: '3ZR9', name: 'NDM-1', org: 'Escherichia coli', score: '0.168' },
  { pdb: '4K0X', name: 'OXA-23', org: 'Acinetobacter baumannii', score: '0.180' },
  { pdb: '1E4E', name: 'VanA', org: 'Enterococcus faecium', score: '0.566' },
]

export default function HeroViewer() {
  const viewerRef = useRef(null)
  const [protein, setProtein] = useState(null)

  useEffect(() => {
    const p = PROTEINS[Math.floor(Math.random() * PROTEINS.length)]
    setProtein(p)

    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/3Dmol/2.1.0/3Dmol-min.js'
    script.onload = () => {
      if (!viewerRef.current) return
      const viewer = window.$3Dmol.createViewer(viewerRef.current, {
        backgroundColor: '#f5f0eb'
      })
window.$3Dmol.download('pdb:' + p.pdb, viewer, {}, () => {
        viewer.setStyle({}, {
          cartoon: {
            colorscheme: {
              prop: 'ss',
              map: { h: '#4F46E5', s: '#7C3AED', loop: '#6D28D9' }
            }
          }
        })
        viewer.zoomTo()
        viewer.render()
      })
    }
    document.head.appendChild(script)
  }, [])

return (
    <div
      className="relative mx-auto rounded-2xl overflow-hidden shadow-xl border border-stone-200"
      style={{ maxWidth: '600px', height: '420px', background: '#f5f0eb' }}
    >
      <div className="absolute top-3 left-4 text-xs text-gray-400 z-10 font-mono">
        {protein ? `${protein.name} · ${protein.org} · Score: ${protein.score}` : 'Loading...'}
      </div>
      <div className="absolute top-3 right-4 text-xs text-gray-400 z-10">
        drag to rotate · scroll to zoom
      </div>
      <div ref={viewerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}
