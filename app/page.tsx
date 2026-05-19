import Link from 'next/link'
import HeroViewer from '../components/HeroViewer'
import HowItWorks from '../components/HowItWorks'

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 text-gray-900">
      <nav className="border-b border-stone-200 px-8 py-4 flex items-center justify-between bg-white">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="ResistAI" className="h-10 w-auto" />
        </Link>
        <div className="flex gap-6 text-sm text-gray-500">
          <a href="#how-it-works" className="hover:text-gray-900 transition">How it works</a>
          <a href="#features" className="hover:text-gray-900 transition">Features</a>
          <a href="#results" className="hover:text-gray-900 transition">Results</a>
          <a href="https://github.com/kagansaglam/resistai" target="_blank" className="hover:text-gray-900 transition">GitHub</a>
        </div>
        <div className="flex gap-3">
          <Link href="/auth/login" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 rounded-lg transition">Sign in</Link>
          <Link href="/auth/signup" className="px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition font-medium">Sign up</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-8 py-20 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs bg-red-50 text-red-600 rounded-full mb-6 border border-red-200">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full inline-block"></span>
          700,000 deaths/year from antibiotic resistance — and rising
        </div>
        <h1 className="text-5xl font-bold mb-5 leading-tight text-gray-900">
          Identify druggable targets in<br />
          <span className="text-emerald-600">antibiotic resistance proteins</span>
        </h1>
        <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-10 text-left">
          <div className="p-4 bg-white border border-stone-200 rounded-xl">
            <div className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-2">Problem</div>
            <p className="text-sm text-gray-600 leading-relaxed">Druggability analysis and literature mining are fragmented across incompatible tools.</p>
          </div>
          <div className="p-4 bg-white border border-emerald-200 rounded-xl">
            <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-2">Solution</div>
            <p className="text-sm text-gray-600 leading-relaxed">ResistAI integrates AlphaFold, ESM-2 embeddings, fpocket, and RAG into one automated pipeline.</p>
          </div>
          <div className="p-4 bg-white border border-stone-200 rounded-xl">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Outcome</div>
            <p className="text-sm text-gray-600 leading-relaxed">Ranked druggable pockets + AI-cited literature in seconds — for any WHO priority pathogen.</p>
          </div>
        </div>
        <div className="flex gap-4 justify-center mb-16">
          <Link href="/auth/signup" className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition">Get started — free →</Link>
          <Link href="/dashboard/search?q=VIM-2+metallo-beta-lactamase" className="px-6 py-3 border border-stone-200 hover:border-emerald-300 hover:text-emerald-600 rounded-lg font-medium transition text-gray-700">Try with VIM-2 →</Link>
          <a href="https://github.com/kagansaglam/resistai" target="_blank" className="px-6 py-3 border border-gray-300 hover:border-gray-400 rounded-lg font-medium transition text-gray-700">GitHub</a>
        </div>
        <HeroViewer />
      </section>

      {/* Stats */}
      <section id="results" className="px-8 py-12 border-y border-stone-200 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-4 gap-8 text-center">
          {[
            { value: "2,433", label: "Proteins analysed" },
            { value: "1,198", label: "High druggability" },
            { value: "2,508", label: "PubMed articles" },
            { value: "1.000", label: "Best score" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-emerald-600">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works — interactive */}
      <section id="how-it-works" className="px-8 py-24 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How it works</h2>
          <p className="text-gray-500">From protein identifier to ranked druggable targets — fully automated, reproducible, and AI-native.</p>
        </div>
        <div className="space-y-3">
          <HowItWorks />
            <details key={s.step} className={`group bg-white border ${s.color} rounded-xl overflow-hidden`}>
              <summary className="flex gap-5 p-5 cursor-pointer list-none items-center select-none hover:bg-stone-50 transition">
                <div className="shrink-0 w-10 h-10 bg-stone-50 border border-stone-200 rounded-lg flex items-center justify-center text-lg">{s.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-mono text-emerald-500">{s.step}</span>
                    <h3 className="text-sm font-semibold text-gray-900">{s.title}</h3>
                  </div>
                  <p className="text-xs text-gray-400">{s.sub}</p>
                </div>
                <span className="text-gray-300 group-open:rotate-180 transition-transform shrink-0">▾</span>
              </summary>
              <div className="px-5 pb-5 pt-0 border-t border-stone-100">
                <p className="text-sm text-gray-500 leading-relaxed mb-3 mt-3">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.badges.map((b) => (
                    <span key={b} className={`text-xs px-2.5 py-1 rounded-full font-medium ${s.badgeColor}`}>{b}</span>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>

        {/* Tech stack */}
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-400 mb-4 uppercase tracking-wider">Built with</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Nextflow DSL2", "AlphaFold DB", "fpocket", "ESM-2 (650M)", "ChromaDB", "Llama 3.3 70B", "FastAPI", "Next.js", "Docker", "Slurm", "Supabase"].map((t) => (
              <span key={t} className="px-3 py-1 text-xs bg-white border border-stone-200 rounded-full text-gray-600">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-8 py-24 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">Everything you need for resistance research</h2>
        <div className="grid grid-cols-3 gap-8">
          {[
            { icon: "🔬", title: "3D Protein Viewer", desc: "Interactive 3D structures with binding pocket overlay. Powered by 3Dmol.js.", href: "/dashboard" },
            { icon: "📊", title: "Druggability Dashboard", desc: "Compare druggability across resistance families with interactive charts.", href: "/dashboard" },
            { icon: "🤖", title: "AI Research Assistant", desc: "Ask questions grounded in 2,508 PubMed articles via RAG + Llama 3.3.", href: "/dashboard/search" },
            { icon: "⚡", title: "Nextflow Pipeline", desc: "Reproducible DSL2 pipeline. Runs locally, on Docker, SLURM, or LSF.", href: "https://github.com/kagansaglam/resistai" },
            { icon: "🗄️", title: "REST API & CLI", desc: "FastAPI backend with ChromaDB vector search. Full OpenAPI docs available.", href: "https://resistai-api.onrender.com/docs" },
            { icon: "📧", title: "Email Reports", desc: "Export and email your analysis results directly to your inbox.", href: "/dashboard/report" },
          ].map((f) => (
            <Link key={f.title} href={f.href} className="p-6 border border-stone-200 bg-white rounded-xl hover:border-emerald-300 hover:shadow-sm transition block">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-semibold mb-2 text-gray-900">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-20 text-center border-t border-stone-200 bg-white">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Start your research today</h2>
        <p className="text-gray-500 mb-8 max-w-xl mx-auto">Free access to 2,433 analysed resistance proteins, 2,508 indexed articles, and AI-powered literature synthesis.</p>
        <Link href="/auth/signup" className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition inline-block">Create free account &rarr;</Link>
      </section>

      <footer className="border-t border-stone-200 px-8 py-8 text-center text-sm text-gray-400 bg-white">
        <p>ResistAI &mdash; Kagan Saglam &middot; MIT License &middot; <a href="https://github.com/kagansaglam/resistai" target="_blank" rel="noreferrer" className="hover:text-gray-700 transition">GitHub</a> &middot; <a href="https://doi.org/10.5281/zenodo.19697274" target="_blank" rel="noreferrer" className="hover:text-gray-700 transition">DOI</a></p>
      </footer>
    </main>
  )
}
