import Link from 'next/link'
import Image from 'next/image'

export default function InhACaseStudy() {
  const similar = [
    { id: "P0A5Y7", gene: "inhA", organism: "Mycobacterium bovis (BCG)", similarity: 1.000, score: 0.983, tier: "high" },
    { id: "P9WGR0", gene: "inhA", organism: "Mycobacterium tuberculosis (CDC 1551)", similarity: 1.000, score: 0.983, tier: "high" },
    { id: "P42829", gene: "inhA", organism: "Mycolicibacterium smegmatis", similarity: 0.997, score: 0.973, tier: "high" },
    { id: "P0AEK5", gene: "fabI", organism: "Escherichia coli O157:H7", similarity: 0.980, score: 0.614, tier: "medium" },
    { id: "P0AEK6", gene: "fabI", organism: "Shigella flexneri", similarity: 0.980, score: 0.607, tier: "medium" },
  ]

  const articles = [
    { pmid: "7548091", year: "1994", title: "Inhibition of the InhA enzyme of Mycobacterium tuberculosis by isoniazid", journal: "Science" },
    { pmid: "15013259", year: "2004", title: "Crystal structure of Mycobacterium tuberculosis InhA in complex with the active metabolite of isoniazid", journal: "J Biol Chem" },
    { pmid: "28671677", year: "2017", title: "Direct InhA inhibitors — a new approach to tuberculosis drug discovery", journal: "Drug Discov Today" },
    { pmid: "25695697", year: "2015", title: "GSK693 — a novel direct InhA inhibitor with potent activity against M. tuberculosis", journal: "Antimicrob Agents Chemother" },
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
          <Link href="/case-study/vim2" className="hover:text-gray-900 transition">VIM-7 Case Study</Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-8 py-16">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full">Case study</span>
            <span className="text-xs text-gray-400">WHO Critical Priority Pathogen — Tuberculosis</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">InhA — Enoyl-ACP Reductase</h1>
          <p className="text-gray-500 text-lg max-w-2xl">
            The primary target of isoniazid — the most widely used first-line anti-tuberculosis drug. InhA is a validated, extensively studied druggable target with one of the highest druggability scores in the ResistAI database.
          </p>
        </div>

        {/* Protein overview */}
        <div className="bg-white border border-stone-200 rounded-2xl p-8 mb-8">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-6">Protein overview</h2>
          <div className="grid grid-cols-2 gap-6 text-sm mb-6">
            {[
              { label: "UniProt ID", value: "P9WGR1" },
              { label: "Gene", value: "inhA" },
              { label: "Organism", value: "Mycobacterium tuberculosis H37Rv" },
              { label: "Resistance family", value: "Isoniazid / TB resistance" },
              { label: "WHO priority", value: "Critical — drug-resistant tuberculosis (DR-TB)" },
              { label: "Mechanism", value: "NADH-dependent enoyl-ACP reductase; inhibited by isoniazid-NAD adduct" },
            ].map(r => (
              <div key={r.label} className="flex justify-between gap-4 py-2 border-b border-stone-100 last:border-0">
                <span className="text-gray-400 shrink-0">{r.label}</span>
                <span className="font-medium text-right">{r.value}</span>
              </div>
            ))}
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-red-800 mb-2">Clinical significance</h3>
            <p className="text-sm text-red-700 leading-relaxed">
              Tuberculosis kills ~1.6 million people annually. Isoniazid resistance — predominantly driven by mutations in <em>inhA</em> and <em>katG</em> — is the most common mechanism of first-line drug resistance in <em>M. tuberculosis</em>. InhA mutations (e.g. C15T promoter variant, I21V, I47T) confer low-level isoniazid resistance by reducing enzyme-drug binding affinity. Direct InhA inhibitors — compounds that bypass the need for KatG-mediated activation — represent a major strategy in the current TB drug discovery pipeline.
            </p>
          </div>
        </div>

        {/* Druggability */}
        <div className="bg-white border border-stone-200 rounded-2xl p-8 mb-8">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-6">Druggability analysis — fpocket</h2>
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { value: "0.983", label: "Best druggability score", color: "text-emerald-600" },
              { value: "High", label: "Druggability tier", color: "text-emerald-600" },
              { value: "14", label: "Total pockets detected", color: "text-gray-900" },
              { value: "1", label: "High-druggability pockets", color: "text-gray-900" },
            ].map(s => (
              <div key={s.label} className="bg-stone-50 rounded-xl p-4 text-center border border-stone-100">
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-gray-400 mt-1 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-4">
            <h3 className="text-sm font-semibold text-emerald-800 mb-2">Key finding</h3>
            <p className="text-sm text-emerald-800 leading-relaxed">
              InhA scores 0.983 — placing it in the <strong>top 1% of all 2,433 analysed resistance proteins</strong>. This is consistent with decades of experimental drug discovery: InhA harbours a well-defined, hydrophobic NADH/NAD⁺ binding pocket that has been successfully targeted by both prodrugs (isoniazid) and direct inhibitors (GSK693, triclosan analogues, thiadiazoles).
            </p>
          </div>
          <div className="bg-stone-50 rounded-xl p-5 border border-stone-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Interpretation</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              fpocket identified 14 surface cavities on the AlphaFold-predicted InhA structure. The top-ranked pocket (score 0.983) corresponds to the substrate-binding channel adjacent to the NAD⁺ cofactor — the site occupied by isoniazid-NAD adduct in crystal structures. The high volume, hydrophobicity, and geometric regularity of this cavity explain the exceptional druggability score.
            </p>
          </div>
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-xs text-amber-700 leading-relaxed">
              <strong>Note:</strong> Druggability scores are structural proxies computed by fpocket on AlphaFold-predicted structures (Le Guilloux et al. 2009). Thresholds: high ≥ 0.7, medium ≥ 0.4. Experimental validation is required to confirm binding site tractability.
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
            ESM-2 similarity search against all 2,433 proteins reveals InhA's evolutionary context — and, critically, identifies <strong>fabI</strong> (E. coli enoyl-ACP reductase) as a close homolog (similarity 0.98). This is biologically validated: InhA and FabI are both members of the short-chain dehydrogenase/reductase (SDR) superfamily and share the same catalytic mechanism. Cross-species druggability comparison enables prioritisation of inhibitor scaffolds with broad-spectrum potential.
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
              <strong>Key finding:</strong> ESM-2 correctly identifies FabI (E. coli) as a homolog of InhA despite no explicit structural alignment — demonstrating that sequence-level embeddings capture functionally relevant evolutionary relationships. FabI inhibitors such as triclosan have been explored as InhA inhibitor scaffolds, validating this similarity.
            </p>
          </div>
        </div>

        {/* Literature */}
        <div className="bg-white border border-stone-200 rounded-2xl p-8 mb-8">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-6">Key resistance literature</h2>
          <div className="space-y-3">
            {articles.map(a => (
              <a key={a.pmid} href={`https://pubmed.ncbi.nlm.nih.gov/${a.pmid}`} target="_blank" rel="noopener noreferrer"
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
              { step: "01", text: "UniProt ID P9WGR1 resolved — InhA sequence from M. tuberculosis H37Rv fetched via UniProt REST API" },
              { step: "02", text: "3D structure retrieved from AlphaFold DB v4 — high-confidence predicted model" },
              { step: "03", text: "fpocket detected 14 binding cavities — top pocket scored 0.983 (high druggability, top 1% of all 2,433 proteins)" },
              { step: "04", text: "ESM-2 generated 480-dim embedding — ChromaDB cosine search identified FabI homologs (similarity 0.98) and InhA orthologues across mycobacteria" },
              { step: "05", text: "RAG retrieved literature on isoniazid resistance mechanisms and direct InhA inhibitor development" },
              { step: "06", text: "Llama 3.3 70B generated PMID-cited summary confirming InhA as a high-priority validated drug target" },
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
          <Link href="/dashboard/protein/P9WGR1" className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition">
            View in dashboard →
          </Link>
          <Link href="/dashboard/search?q=InhA+isoniazid+resistance+tuberculosis" className="px-5 py-2.5 border border-stone-200 hover:border-emerald-300 text-gray-700 hover:text-emerald-600 text-sm font-medium rounded-lg transition">
            Search literature →
          </Link>
          <Link href="/case-study/vim2" className="px-5 py-2.5 border border-stone-200 hover:border-stone-300 text-gray-700 text-sm font-medium rounded-lg transition">
            VIM-7 case study →
          </Link>
          <Link href="/architecture" className="px-5 py-2.5 border border-stone-200 hover:border-stone-300 text-gray-700 text-sm font-medium rounded-lg transition">
            View architecture →
          </Link>
        </div>

      </div>
    </main>
  )
}
