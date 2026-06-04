import Link from 'next/link'
import Image from 'next/image'

export default function KPC2CaseStudy() {
  const similar = [
    { id: "Q848S6", gene: "bla (KPC-like)", organism: "Klebsiella oxytoca", similarity: 1.000, score: 0.515, tier: "medium" },
    { id: "P22391", gene: "bla", organism: "Klebsiella oxytoca", similarity: 0.985, score: 0.606, tier: "medium" },
    { id: "P23954", gene: "bla", organism: "Klebsiella oxytoca", similarity: 0.984, score: 0.531, tier: "medium" },
    { id: "A0A649V088", gene: "bla", organism: "Escherichia coli", similarity: 0.983, score: 0.147, tier: "low" },
    { id: "Q01166", gene: "blaA", organism: "Yersinia enterocolitica", similarity: 0.983, score: 0.216, tier: "low" },
  ]

  const articles = [
    { pmid: "35980232", year: "2022", title: "Klebsiella pneumoniae Carbapenemase Variants Resistant to Ceftazidime-Avibactam: an Evolutionary Overview", journal: "Antimicrob Agents Chemother" },
    { pmid: "39382274", year: "2024", title: "Assessment of the activity and mechanisms of resistance to cefiderocol and combinations of β-lactams and novel β-lactamase inhibitors in carbapenemase-producing Enterobacterales", journal: "Antimicrob Agents Chemother" },
    { pmid: "40669819", year: "2025", title: "Emerging resistance to novel β-lactam β-lactamase inhibitor combinations in Klebsiella pneumoniae bearing KPC variants", journal: "J Glob Antimicrob Resist" },
    { pmid: "39734051", year: "2025", title: "Multiple mechanisms mediate aztreonam-avibactam resistance in Klebsiella pneumoniae: Driven by KPC-2 and OmpK36 mutations", journal: "Int J Antimicrob Agents" },
  ]

  return (
    <main className="min-h-screen bg-stone-50 text-gray-900">
      <nav className="bg-white border-b border-stone-200 px-4 sm:px-8 py-3 flex items-center justify-between overflow-x-auto">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.png" alt="ResistAI" width={160} height={40} className="h-8 w-auto" style={{width: "auto"}} />
        </Link>
        <div className="flex gap-3 sm:gap-4 text-sm text-gray-500 shrink-0 whitespace-nowrap">
          <Link href="/" className="hover:text-gray-900 transition">Home</Link>
          <Link href="/dashboard" className="hover:text-gray-900 transition">Proteins</Link>
          <Link href="/dashboard/search" className="hover:text-gray-900 transition">Literature</Link>
          <Link href="/architecture" className="hover:text-gray-900 transition">Architecture</Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-16">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full">Case study</span>
            <span className="text-xs text-gray-400">WHO Critical Priority Pathogen</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">KPC-2 Carbapenemase</h1>
          <p className="text-gray-500 text-lg max-w-2xl">
            A class A serine carbapenemase from <em>Klebsiella pneumoniae</em> — the enzyme behind much of the world&apos;s carbapenem-resistant <em>Enterobacteriaceae</em> (CRE) burden. Analysed end-to-end by the ResistAI pipeline.
          </p>
        </div>

        {/* Protein overview */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-8 mb-8">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-6">Protein overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm mb-6">
            {[
              { label: "UniProt ID", value: "Q9F663" },
              { label: "Gene", value: "KPC-2 (blaKPC-2)" },
              { label: "Organism", value: "Klebsiella pneumoniae" },
              { label: "Resistance family", value: "Class A serine carbapenemase" },
              { label: "WHO priority", value: "Critical — carbapenem-resistant Enterobacteriaceae" },
              { label: "Mechanism", value: "Serine-based hydrolysis of the β-lactam ring" },
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
              KPC-2 is the most globally disseminated carbapenemase, hydrolysing virtually all β-lactams including carbapenems — the last-resort agents for serious Gram-negative infections. Unlike metallo-β-lactamases (e.g. VIM, NDM), KPC-2 uses a serine-based catalytic mechanism, which makes it susceptible to the β-lactamase inhibitor <strong>avibactam</strong>. Ceftazidime-avibactam is now a frontline therapy against KPC-producing strains — though resistance via KPC point mutations is already emerging, keeping this an active drug-discovery target.
            </p>
          </div>
        </div>

        {/* Druggability analysis */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-8 mb-8">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-6">Druggability analysis — fpocket</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: "0.427", label: "Best druggability score", color: "text-amber-600" },
              { value: "Medium", label: "Druggability tier", color: "text-amber-600" },
              { value: "17", label: "Total pockets detected", color: "text-gray-900" },
              { value: "0", label: "High-druggability pockets", color: "text-gray-900" },
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
              fpocket identified 17 surface cavities in the AlphaFold-predicted KPC-2 structure, with a top pocket score of 0.427 (medium druggability). This is a biologically honest result: KPC-2&apos;s active site is a relatively shallow, solvent-exposed serine cleft — harder to target with conventional small molecules than a deep hydrophobic pocket. This is precisely why clinically successful inhibitors like avibactam are covalent, diazabicyclooctane-based agents rather than classical competitive binders. The medium structural score, read alongside the literature, captures a real pharmacological challenge rather than overstating tractability.
            </p>
          </div>
        </div>

        {/* ESM-2 similarity */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">ESM-2 embedding similarity</h2>
            <span className="text-xs text-gray-400 bg-stone-50 px-2 py-0.5 rounded-full border border-stone-200">480-dim cosine similarity</span>
          </div>
          <p className="text-sm text-gray-500 mb-5 leading-relaxed">
            ESM-2 (esm2_t12_35M_UR50D) generated a 480-dimensional sequence embedding for KPC-2. ChromaDB cosine similarity search identified the five most evolutionarily related proteins in the 2,433-protein database — all class A serine β-lactamases from Enterobacteriaceae, confirming the biological coherence of the embedding space.
          </p>
          <div className="space-y-2">
            {similar.map(s => {
              const tc = s.tier === 'high' ? 'text-emerald-600 bg-emerald-50' : s.tier === 'medium' ? 'text-amber-600 bg-amber-50' : 'text-red-600 bg-red-50'
              return (
                <Link key={s.id} href={`/dashboard/protein/${s.id}`}
                  className="flex items-center justify-between py-3 px-4 rounded-lg border border-stone-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-gray-900">{s.gene}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tc}`}>{s.tier}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">{s.organism}</p>
                  </div>
                  <div className="flex gap-6 text-right shrink-0 ml-3">
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
              <strong>Key finding:</strong> All five nearest neighbours are class A serine β-lactamases from Enterobacteriaceae, with cosine similarities of 0.98–1.00. Notably, the embedding groups KPC-2 with other serine enzymes rather than with metallo-β-lactamases like VIM or NDM — mirroring the true mechanistic divide between the two carbapenemase classes, captured from sequence alone.
            </p>
          </div>
        </div>

        {/* Literature */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-8 mb-8">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-6">Relevant resistance literature</h2>
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
        <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-8 mb-8">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Pipeline summary</h2>
          <div className="space-y-2">
            {[
              { step: "01", text: "UniProt ID Q9F663 resolved — sequence and metadata fetched via UniProt REST API" },
              { step: "02", text: "3D structure retrieved from AlphaFold DB (high-confidence predicted model)" },
              { step: "03", text: "fpocket detected 17 binding cavities — top pocket scored 0.427 (medium druggability)" },
              { step: "04", text: "ESM-2 generated 480-dim sequence embedding — ChromaDB similarity search returned 5 serine β-lactamase homologs (similarity 0.98–1.00)" },
              { step: "05", text: "RAG retrieved 4 directly relevant PubMed articles on KPC-2 / ceftazidime-avibactam resistance" },
              { step: "06", text: "Llama 3.3 70B synthesised a PMID-cited research summary contextualising the druggability assessment" },
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
          <Link href="/dashboard/protein/Q9F663" className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition">
            View in dashboard →
          </Link>
          <Link href={`/dashboard/search?q=KPC-2+carbapenemase+inhibitor+avibactam`} className="px-5 py-2.5 border border-stone-200 hover:border-emerald-300 text-gray-700 hover:text-emerald-600 text-sm font-medium rounded-lg transition">
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
