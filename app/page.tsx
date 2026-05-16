import Link from 'next/link'
import HeroViewer from '../components/HeroViewer'

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 text-gray-900">
      <nav className="border-b border-stone-200 px-8 py-4 flex items-center justify-between bg-white">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="ResistAI" className="h-10 w-auto" />
        </Link>
<div className="flex gap-6 text-sm text-gray-500">
          <a href="#features" className="hover:text-gray-900 transition">Features</a>
          <a href="#results" className="hover:text-gray-900 transition">Results</a>
          <a href="https://github.com/kagansaglam/resistai" target="_blank" className="hover:text-gray-900 transition">GitHub</a>
        </div>
        <div className="flex gap-3">
          <Link href="/auth/login" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 rounded-lg transition">Sign in</Link>
          <Link href="/auth/signup" className="px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition font-medium">Sign up</Link>
        </div>
      </nav>
<section className="px-8 py-20 text-center max-w-5xl mx-auto">
        <div className="inline-block px-3 py-1 text-xs bg-emerald-100 text-emerald-700 rounded-full mb-6 border border-emerald-200">2,433 Resistance Proteins Analysed</div>
        <h1 className="text-5xl font-bold mb-6 leading-tight text-gray-900">AI-powered antibiotic<br /><span className="text-emerald-600">resistance research</span></h1>
        <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto">ResistAI combines protein structure prediction, binding pocket detection, and generative AI to identify druggable targets across WHO priority resistance proteins.</p>
        <div className="flex gap-4 justify-center mb-16">
          <Link href="/auth/signup" className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition">Get started &mdash; free &rarr;</Link>
          <a href="https://github.com/kagansaglam/resistai" target="_blank" className="px-6 py-3 border border-gray-300 hover:border-gray-400 rounded-lg font-medium transition text-gray-700">View on GitHub</a>
        </div>
        <HeroViewer />
      </section>
<section id="results" className="px-8 py-12 border-y border-stone-200 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-4 gap-8 text-center">
          {[
            { value: "2,433", label: "Proteins analysed" },
            { value: "48", label: "High druggability" },
            { value: "2,508", label: "PubMed articles" },
            { value: "0.983", label: "Best score" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-emerald-600">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
<section id="features" className="px-8 py-24 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">Everything you need for resistance research</h2>
        <div className="grid grid-cols-3 gap-8">
          {[
            { icon: "🔬", title: "3D Protein Viewer", desc: "Interactive 3D structures with binding pocket overlay. Powered by 3Dmol.js.", href: "/dashboard" },
            { icon: "📊", title: "Druggability Dashboard", desc: "Compare druggability across resistance families with interactive charts.", href: "/dashboard" },
            { icon: "🤖", title: "AI Research Assistant", desc: "Ask questions grounded in 2,508 PubMed articles via RAG + Llama 3.3.", href: "/dashboard/search" },
            { icon: "⚡", title: "Nextflow Pipeline", desc: "Reproducible DSL2 pipeline. Runs locally, on Docker, SLURM, or LSF.", href: "https://github.com/kagansaglam/resistai" },
            { icon: "🗄️", title: "PostgreSQL Backend", desc: "All results persisted to a relational database with GFF3 export.", href: "https://github.com/kagansaglam/resistai-api" },
            { icon: "📧", title: "Email Reports", desc: "Export and email your analysis results directly to your inbox.", href: "/dashboard/report" },
          ].map((f) => (
            f.href ? (
<Link key={f.title} href={f.href} className="p-6 border border-stone-200 bg-white rounded-xl hover:border-emerald-300 hover:shadow-sm transition block">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-semibold mb-2 text-gray-900">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </Link>
            ) : (
              <div key={f.title} className="p-6 border border-stone-200 bg-white rounded-xl opacity-70">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-semibold mb-2 text-gray-900">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
                <span className="text-xs text-amber-500 mt-2 block">Coming soon</span>
              </div>
)
          ))}
        </div>
      </section>
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
