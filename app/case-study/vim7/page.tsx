import Link from 'next/link'
import Image from 'next/image'

export default function VIM2CaseStudy() {
  const similar = [
    { id: "A0A0F7KYQ8", gene: "VIM-1", organism: "Pseudomonas aeruginosa", similarity: 0.993, score: 0.253, tier: "low" },
    { id: "Q5U7L7", gene: "VIM-2", organism: "Escherichia coli", similarity: 0.988, score: 0.535, tier: "medium" },
    { id: "C7C422", gene: "blaNDM-1", organism: "Klebsiella pneumoniae", similarity: 0.982, score: 0.484, tier: "medium" },
    { id: "P26918", gene: "cphA", organism: "Aeromonas hydrophila", similarity: 0.980, score: 0.407, tier: "medium" },
    { id: "P52700", gene: "Metallo-beta-lactamase", organism: "Stenotrophomonas maltophilia", similarity: 0.970, score: 0.837, tier: "high" },
  ]

  const articles = [
    { pmid: "26477515", year: "2015", title: "Discovery of Novel Inhibitor Scaffolds against the Metallo-β-lactamase VIM-2 by Surface Plasmon Resonance (SPR) Based Fragment Screening", journal: "J Med Chem" },
    { pmid: "34763944", year: "2022", title: "Structure-guided optimization of 1H-imidazole-2-carboxylic acid derivatives affording potent VIM-Type metallo-β-lactamase inhibitors", journal: "Eur J Med Chem" },
    { pmid: "26976213", year: "2016", title: "Fragment-based discovery of inhibitor scaffolds targeting the metallo-β-lactamases NDM-1 and VIM-2", journal: "Bioorg Med Chem Lett" },
    { pmid: "29091730", year: "2018", title: "Probing the Interaction of Aspergillomarasmine A with Metallo-β-lactamases NDM-1, VIM-2, and IMP-7", journal: "ACS Infect Dis" },
  ]

  return (
    <main className="min-h-screen bg-stone-50 text-gray-900">
      <nav className="bg-white border-b border-stone-200 px-8 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="ResistAI" width={160} height={40} className="h-8 w-auto" style={{width: "auto"}} />
        </Link>
        <div className="flex gap-4 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900 transition">Home</Link>
          <Link href="/dashboard" className="hover:text-gray-900 transition">Proteins</Link>
          <Link href="/dashboard/search" className="hover:text-gray-900 transition">Literature</Link>
          <Link href="/architecture" className="hover:text-gray-900 transition">Architecture</Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-8 py-16">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full">Case study</span>
            <span className="text-xs text-gray-400">WHO Critical Priority Pathogen</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">VIM-7 Metallo-β-lactamase</h1>
          <p className="text-gray-500 text-lg max-w-2xl">
            A carbapenem-hydrolysing metallo-β-lactamase from <em>Pseudomonas aeruginosa</em> — one of the most clinically urgent antibiotic resistance targets. Analysed end-to-end by the ResistAI pipeline.
          </p>
        </div>

        {/* Protein overview */}
        <div className="bg-white border border-stone-200 rounded-2xl p-8 mb-8">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-6">Protein overview</h2>
          <div className="grid grid-cols-2 gap-6 text-sm mb-6">
            {[
              { label: "UniProt ID", value: "Q840P9" },
              { label: "Gene", value: "VIM-7" },
              { label: "Organism", value: "Pseudomonas aeruginosa" },
              { label: "Resistance family", value: "Metallo-β-lactamase (MBL)" },
              { label: "WHO priority", value: "Critical — carbapenem-resistant P. aeruginosa" },
              { label: "Mechanism", value: "Zinc-dependent hydrolysis of β-lactam ring" },
            ].map(r => (
              <div key={r.label} className="flex justify-between gap-4 py-2 border-b border-stone-100 last:border-0">
                <span className="text-gray-400">{r.label}</span>
                <span className="font-medium text-right">{r.value}</span>
              </div>
            ))}
          </div>

          {/* Clinical context */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-amber-800 mb-2">Clinical significance</h3>
            <p className="text-sm text-amber-700 leading-relaxed">
              VIM-type MBLs confer resistance to virtually all β-lactam antibiotics including carbapenems — last-resort agents for Gram-negative infections. <em>P. aeruginosa</em> harbouring VIM genes causes life-threatening nosocomial infections with very limited therapeutic options. Inhibitor development targeting the active site zinc coordination is an active area of drug discovery.
            </p>
          </div>
        </div>

        {/* Druggability analysis */}
        <div className="bg-white border border-stone-200 rounded-2xl p-8 mb-8">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-6">Druggability analysis — fpocket</h2>
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { value: "0.747", label: "Best druggability score", color: "text-emerald-600" },
              { value: "High", label: "Druggability tier", color: "text-emerald-600" },
              { value: "11", label: "Total pockets detected", color: "text-gray-900" },
              { value: "1", label: "High-druggability pockets", color: "text-gray-900" },
            ].map(s => (
              <div key={s.label} className="bg-stone-50 rounded-xl p-4 text-center border border-stone-100">
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-gray-400 mt-1 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-xs text-amber-700 leading-relaxed">
              <strong>Note:</strong> Druggability scores are structural proxies computed by fpocket on AlphaFold-predicted structures (Le Guilloux et al. 2009). Thresholds: high ≥ 0.7, medium ≥ 0.4. Experimental validation is required to confirm binding site tractability.
            </p>
          </div>
          <div className="bg-stone-50 rounded-xl p-5 border border-stone-100 mt-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Interpretation</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              fpocket identified 11 surface cavities in the AlphaFold-predicted VIM-7 structure. The top-ranked pocket (druggability score 0.747) corresponds to the active site zinc-binding cleft — a well-characterised pharmacological hotspot. A score above 0.7 indicates high predicted tractability for small-molecule inhibitor binding, consistent with published crystallographic and fragment screening data for VIM-type MBLs.
            </p>
          </div>
        </div>

        {/* ESM-2 similarity */}
        <div className="bg-white border border-stone-200 rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">ESM-2 embedding similarity</h2>
            <span className="text-xs text-gray-400 bg-stone-50 px-2 py-0.5 rounded-full border border-stone-200">480-dim cosine similarity</span>
          </div>
          <p className="text-sm text-gray-500 mb-5 leading-relaxed">
            ESM-2 (esm2_t12_35M_UR50D) generated a 480-dimensional sequence embedding for VIM-7. ChromaDB cosine similarity search identified the five most structurally and evolutionarily related proteins in the 2,433-protein database — all confirmed metallo-β-lactamases, validating the biological coherence of the embedding space.
          </p>
          <div className="space-y-2">
            {similar.map(s => {
              const tc = s.tier === 'high' ? 'text-emerald-600 bg-emerald-50' : s.tier === 'medium' ? 'text-amber-600 bg-amber-50' : 'text-red-600 bg-red-50'
              return (
                <Link key={s.id} href={`/dashboard/protein/${s.id}`}
                  className="flex items-center justify-between py-3 px-4 rounded-lg border border-stone-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{s.gene}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tc}`}>{s.tier}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{s.organism}</p>
                  </div>
                  <div className="flex gap-6 text-right">
                    <div>
                      <div className="text-xs text-gray-400">similarity</div>
                      <div className="text-sm font-mono font-medium text-emerald-600">{s.similarity.toFixed(3)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">druggability</div>
                      <div className="text-sm font-mono font-medium text-gray-700">{s.score.toFixed(3)}</div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
          <div className="mt-5 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <p className="text-sm text-emerald-800 leading-relaxed">
              <strong>Key finding:</strong> All five nearest neighbours are experimentally characterised metallo-β-lactamases (VIM-1, VIM-2, NDM-1, CphA, L1), with cosine similarities of 0.97–0.99. This validates that ESM-2 embeddings capture functionally meaningful protein relationships without requiring structural alignment.
            </p>
          </div>
        </div>

        {/* Literature */}
        <div className="bg-white border border-stone-200 rounded-2xl p-8 mb-8">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-6">Relevant resistance literature</h2>
          <div className="space-y-3">
            {articles.map(a => (
              <a key={a.pmid} href={`https://pubmed.ncbi.nlm.nih.gov/${a.pmid}`} target="_blank" rel="noreferrer"
                className="flex items-start gap-4 py-3 px-4 rounded-lg border border-stone-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 leading-snug">{a.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{a.journal} · {a.year}</p>
                </div>
                <span className="text-xs font-mono text-emerald-600 bg-emerald-50 px-2 py-1 rounded shrink-0">PMID:{a.pmid}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Pipeline summary */}
        <div className="bg-white border border-stone-200 rounded-2xl p-8 mb-8">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Pipeline summary</h2>
          <div className="space-y-2">
            {[
              { step: "01", text: "UniProt ID Q840P9 resolved — sequence and metadata fetched via UniProt REST API" },
              { step: "02", text: "3D structure retrieved from AlphaFold DB v4 (high-confidence predicted model)" },
              { step: "03", text: "fpocket detected 11 binding cavities — top pocket scored 0.747 (high druggability)" },
              { step: "04", text: "ESM-2 generated 480-dim sequence embedding — ChromaDB similarity search returned 5 MBL homologs (similarity 0.97–0.99)" },
              { step: "05", text: "RAG retrieved 4 directly relevant PubMed articles on VIM-type inhibitor discovery" },
              { step: "06", text: "Llama 3.3 70B synthesised PMID-cited research summary validating druggability assessment" },
            ].map(s => (
              <div key={s.step} className="flex gap-4 py-2">
                <span className="text-xs font-mono text-emerald-500 shrink-0 mt-0.5">{s.step}</span>
                <p className="text-sm text-gray-500 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex gap-4 flex-wrap">
          <Link href="/dashboard/protein/Q840P9" className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition">
            View in dashboard →
          </Link>
          <Link href={`/dashboard/search?q=VIM-2+metallo-beta-lactamase+inhibitor`} className="px-5 py-2.5 border border-stone-200 hover:border-emerald-300 text-gray-700 hover:text-emerald-600 text-sm font-medium rounded-lg transition">
            Search literature →
          </Link>
          <Link href="/architecture" className="px-5 py-2.5 border border-stone-200 hover:border-stone-300 text-gray-700 text-sm font-medium rounded-lg transition">
            View architecture →
          </Link>
        </div>

      </div>
    </main>
  )
}
