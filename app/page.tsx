export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-gray-800 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧬</span>
          <span className="text-xl font-bold">ResistAI</span>
        </div>
        <div className="flex gap-6 text-sm text-gray-400">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#results" className="hover:text-white transition">Results</a>
          <a href="https://github.com/kagansaglam/resistai" className="hover:text-white transition">GitHub</a>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm text-gray-300 hover:text-white transition">Sign in</button>
          <button className="px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-500 rounded-lg transition">Get started</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-8 py-24 text-center max-w-4xl mx-auto">
        <div className="inline-block px-3 py-1 text-xs bg-emerald-900 text-emerald-300 rounded-full mb-6">
          144 WHO Priority Proteins Analysed
        </div>
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          AI-powered antibiotic<br />
          <span className="text-emerald-400">resistance research</span>
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
          ResistAI combines protein structure prediction, binding pocket detection,
          and generative AI to identify druggable targets across WHO priority
          resistance proteins.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium transition">
            Launch App →
          </button>
          <a href="https://github.com/kagansaglam/resistai"
            className="px-6 py-3 border border-gray-700 hover:border-gray-500 rounded-lg font-medium transition">
            View on GitHub
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="px-8 py-12 border-y border-gray-800">
        <div className="max-w-4xl mx-auto grid grid-cols-4 gap-8 text-center">
          {[
            { value: "144", label: "Proteins analysed" },
            { value: "48", label: "High druggability" },
            { value: "2,508", label: "PubMed articles" },
            { value: "0.983", label: "Best score" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-emerald-400">{stat.value}</div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-8 py-24 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">Everything you need for resistance research</h2>
        <div className="grid grid-cols-3 gap-8">
          {[
            {
              icon: "🔬",
              title: "3D Protein Viewer",
              desc: "Interactive 3D structures with binding pocket overlay. Powered by 3Dmol.js."
            },
            {
              icon: "📊",
              title: "Druggability Dashboard",
              desc: "Compare druggability across resistance families with interactive Plotly charts."
            },
            {
              icon: "🤖",
              title: "AI Research Assistant",
              desc: "Ask questions, get answers grounded in 2,508 PubMed articles via RAG + Llama 3.3."
            },
            {
              icon: "⚡",
              title: "Nextflow Pipeline",
              desc: "Reproducible DSL2 pipeline. Runs locally, on Docker, SLURM, or LSF clusters."
            },
            {
              icon: "🗄️",
              title: "PostgreSQL Backend",
              desc: "All results persisted to a relational database with GFF3 export."
            },
            {
              icon: "📧",
              title: "Email Reports",
              desc: "Export and email your analysis results as a PDF report. Coming soon."
            },
          ].map((f) => (
            <div key={f.title} className="p-6 border border-gray-800 rounded-xl hover:border-gray-600 transition">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-8 py-8 text-center text-sm text-gray-500">
        <p>ResistAI — Kagan Saglam · MIT License ·{" "}
          <a href="https://github.com/kagansaglam/resistai" className="hover:text-white transition">GitHub</a> ·{" "}
          <a href="https://doi.org/10.5281/zenodo.19697274" className="hover:text-white transition">DOI</a>
        </p>
      </footer>
    </main>
  );
}
