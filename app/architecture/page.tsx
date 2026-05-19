import Link from 'next/link'

export default function Architecture() {
  return (
    <main className="min-h-screen bg-stone-50 text-gray-900">
      <nav className="bg-white border-b border-stone-200 px-8 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="ResistAI" className="h-8 w-auto" />
        </Link>
        <div className="flex gap-4 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900 transition">Home</Link>
          <Link href="/dashboard" className="hover:text-gray-900 transition">Dashboard</Link>
          <Link href="/dashboard/search" className="hover:text-gray-900 transition">Literature</Link>
          <a href="https://github.com/kagansaglam/resistai" target="_blank" className="hover:text-gray-900 transition">GitHub</a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-8 py-16">

        {/* Header */}
        <div className="mb-14">
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Technical architecture</span>
          <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-3">System architecture</h1>
          <p className="text-gray-500 max-w-2xl">ResistAI is a production full-stack platform integrating structural biology, protein language models, vector search, and LLM reasoning into a single automated pipeline.</p>
        </div>

        {/* Pipeline flow */}
        <div className="bg-white border border-stone-200 rounded-2xl p-8 mb-10">
          <h2 className="text-sm font-semibold text-gray-900 mb-6 uppercase tracking-wider">Data pipeline</h2>
          <div className="space-y-3">
            {[
              {
                layer: "Input", color: "bg-stone-100 text-stone-700 border-stone-200",
                items: ["UniProt REST API", "WHO ESKAPE pathogens", "M. tuberculosis targets"],
              },
              {
                layer: "Structure", color: "bg-teal-50 text-teal-700 border-teal-200",
                items: ["AlphaFold DB v4", "ESMFold API (fallback)", "PDB coordinate parsing"],
              },
              {
                layer: "Analysis", color: "bg-purple-50 text-purple-700 border-purple-200",
                items: ["fpocket cavity detection", "Druggability scoring (≥0.7 = high)", "ESM-2 650M embeddings (1,280-dim)"],
              },
              {
                layer: "Storage", color: "bg-amber-50 text-amber-700 border-amber-200",
                items: ["proteins_annotated.csv", "embeddings.parquet", "ChromaDB vector index"],
              },
              {
                layer: "Serving", color: "bg-blue-50 text-blue-700 border-blue-200",
                items: ["FastAPI REST endpoints", "PubMed E-utilities (RAG)", "Llama 3.3 70B via Groq"],
              },
              {
                layer: "Frontend", color: "bg-emerald-50 text-emerald-700 border-emerald-200",
                items: ["Next.js 14 (App Router)", "Supabase auth", "Resend transactional email"],
              },
            ].map((row, i, arr) => (
              <div key={row.layer}>
                <div className="flex items-start gap-4">
                  <div className={`shrink-0 text-xs font-semibold px-3 py-1 rounded-full border ${row.color} w-24 text-center`}>
                    {row.layer}
                  </div>
                  <div className="flex flex-wrap gap-2 flex-1 pt-0.5">
                    {row.items.map((item) => (
                      <span key={item} className="text-xs px-3 py-1 bg-stone-50 border border-stone-200 rounded-full text-gray-600">{item}</span>
                    ))}
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div className="ml-12 mt-2 mb-1 text-gray-200 text-sm">↓</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Two column: Orchestration + Infra */}
        <div className="grid grid-cols-2 gap-6 mb-10">
          <div className="bg-white border border-stone-200 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Pipeline orchestration</h2>
            <div className="space-y-3 text-sm text-gray-600">
              {[
                { label: "Workflow", value: "Nextflow DSL2 — modular, reproducible" },
                { label: "Modules", value: "fetch_card, esmfold, fpocket, summary" },
                { label: "Containers", value: "Docker + Singularity (HPC)" },
                { label: "Scheduler", value: "Slurm-compatible (LSF/PBS ready)" },
                { label: "Scale", value: "2,433 proteins, parallelised" },
              ].map((r) => (
                <div key={r.label} className="flex justify-between gap-4 py-2 border-b border-stone-100 last:border-0">
                  <span className="text-gray-400 shrink-0">{r.label}</span>
                  <span className="text-right">{r.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Infrastructure</h2>
            <div className="space-y-3 text-sm text-gray-600">
              {[
                { label: "API hosting", value: "Render (FastAPI + uvicorn)" },
                { label: "Frontend", value: "Vercel (Next.js 14)" },
                { label: "Auth", value: "Supabase (PostgreSQL + JWT)" },
                { label: "Vector DB", value: "ChromaDB (local persistent)" },
                { label: "Email", value: "Resend (noreply@resistai.bio)" },
                { label: "Domain", value: "resistai.bio (Namecheap)" },
              ].map((r) => (
                <div key={r.label} className="flex justify-between gap-4 py-2 border-b border-stone-100 last:border-0">
                  <span className="text-gray-400 shrink-0">{r.label}</span>
                  <span className="text-right">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scientific methods */}
        <div className="bg-white border border-stone-200 rounded-2xl p-8 mb-10">
          <h2 className="text-sm font-semibold text-gray-900 mb-6 uppercase tracking-wider">Scientific methods</h2>
          <div className="grid grid-cols-2 gap-6 text-sm text-gray-600">
            {[
              {
                title: "Druggability assessment",
                desc: "fpocket 4.0 identifies binding cavities via alpha-sphere clustering on the protein surface. Druggability score integrates volume, hydrophobicity, and polarity. Threshold: score ≥ 0.7 = high, ≥ 0.4 = medium.",
              },
              {
                title: "Protein embeddings",
                desc: "ESM-2 (esm2_t33_650M_UR50D, 650M parameters) generates a 1,280-dimensional per-protein embedding encoding evolutionary and structural context. Used for similarity search and downstream ML classification.",
              },
              {
                title: "Literature retrieval (RAG)",
                desc: "PubMed abstracts are indexed in ChromaDB as dense vectors. At query time, top-k most relevant articles are retrieved by cosine similarity and passed as context to Llama 3.3 70B for PMID-cited synthesis.",
              },
              {
                title: "Structural prediction",
                desc: "AlphaFold DB v4 provides precomputed high-confidence structures for the majority of targets. ESMFold API is used as fallback for proteins not covered by AlphaFold DB, with graceful placeholder handling for unresolvable structures.",
              },
            ].map((m) => (
              <div key={m.title}>
                <h3 className="font-semibold text-gray-900 mb-2">{m.title}</h3>
                <p className="leading-relaxed text-gray-500">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Datasets */}
        <div className="bg-white border border-stone-200 rounded-2xl p-8 mb-10">
          <h2 className="text-sm font-semibold text-gray-900 mb-6 uppercase tracking-wider">Datasets</h2>
          <div className="space-y-3">
            {[
              { name: "UniProt (reviewed)", scope: "2,433 resistance proteins — WHO ESKAPE + M. tuberculosis", source: "rest.uniprot.org" },
              { name: "AlphaFold DB v4", scope: "High-confidence predicted 3D structures", source: "alphafold.ebi.ac.uk" },
              { name: "PubMed / NCBI", scope: "2,508 indexed antibiotic resistance articles", source: "eutils.ncbi.nlm.nih.gov" },
              { name: "ESM-2 model weights", scope: "esm2_t33_650M_UR50D (HuggingFace)", source: "huggingface.co/facebook/esm2_t33_650M_UR50D" },
            ].map((d) => (
              <div key={d.name} className="flex items-start gap-4 py-3 border-b border-stone-100 last:border-0">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{d.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{d.scope}</p>
                </div>
                <a href={`https://${d.source}`} target="_blank" rel="noreferrer" className="text-xs text-emerald-600 hover:underline shrink-0">{d.source}</a>
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-4">
          <a href="https://github.com/kagansaglam/resistai" target="_blank" rel="noreferrer" className="px-5 py-2.5 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition">View on GitHub →</a>
          <a href="https://resistai-api.onrender.com/docs" target="_blank" rel="noreferrer" className="px-5 py-2.5 border border-stone-200 hover:border-emerald-300 text-gray-700 hover:text-emerald-600 text-sm font-medium rounded-lg transition">API docs →</a>
          <Link href="/dashboard" className="px-5 py-2.5 border border-stone-200 hover:border-emerald-300 text-gray-700 hover:text-emerald-600 text-sm font-medium rounded-lg transition">Open dashboard →</Link>
        </div>

      </div>
    </main>
  )
}
