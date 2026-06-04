'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const CASE_STUDIES = [
  { href: '/case-study/vim7', label: 'VIM-7 metallo-β-lactamase' },
  { href: '/case-study/inha', label: 'InhA (TB target)' },
  { href: '/case-study/kpc2', label: 'KPC-2 carbapenemase' },
]

const NAV_LINKS = [
  { href: '#why-resistai', label: 'Why ResistAI', anchor: true },
  { href: '/dashboard/analyse', label: 'Analyse' },
  { href: '#how-it-works', label: 'How it works', anchor: true },
  { href: '#features', label: 'Features', anchor: true },
  { href: '/architecture', label: 'Architecture' },
]

const GITHUB_URL = 'https://github.com/kagansaglam/resistai'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [csOpen, setCsOpen] = useState(false)
  const [csMobileOpen, setCsMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClose = () => { setOpen(false); setCsMobileOpen(false) }

  return (
    <>
      <nav className={`sticky top-0 z-50 border-b border-stone-200 px-6 py-3 flex items-center justify-between bg-white transition-shadow duration-200 ${scrolled ? 'shadow-sm' : ''}`}>
        <Link href="/" className="flex items-center gap-2 shrink-0" onClick={handleClose}>
          <Image src="/logo.png" alt="ResistAI" width={160} height={40} className="h-9 w-auto" style={{ width: 'auto' }} />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-5 text-sm text-gray-500 items-center">
          {NAV_LINKS.map(link =>
            link.anchor ? (
              <a key={link.href} href={link.href} className="hover:text-gray-900 transition">{link.label}</a>
            ) : (
              <Link key={link.href} href={link.href} className="hover:text-gray-900 transition">{link.label}</Link>
            )
          )}

          {/* Case Studies dropdown (hover) */}
          <div
            className="relative"
            onMouseEnter={() => setCsOpen(true)}
            onMouseLeave={() => setCsOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-gray-900 transition">
              Case Studies
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className={`transition-transform ${csOpen ? 'rotate-180' : ''}`}>
                <path d="M3 4.5L6 7.5L9 4.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {csOpen && (
              <div className="absolute top-full left-0 pt-2 w-60">
                <div className="bg-white border border-stone-200 rounded-lg shadow-lg py-1.5">
                  {CASE_STUDIES.map(cs => (
                    <Link
                      key={cs.href}
                      href={cs.href}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50/50 transition"
                    >
                      {cs.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* GitHub (after case studies) */}
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition">GitHub</a>
        </div>

        <div className="hidden md:flex gap-3 shrink-0">
          <Link href="/auth/login" className="px-4 py-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 rounded-lg transition">Sign in</Link>
          <Link href="/auth/signup" className="px-4 py-1.5 text-sm bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition font-medium">Sign up</Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="md:hidden p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-stone-100 transition"
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="4" y1="4" x2="16" y2="16"/><line x1="16" y1="4" x2="4" y2="16"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="3" y1="6" x2="17" y2="6"/><line x1="3" y1="10" x2="17" y2="10"/><line x1="3" y1="14" x2="17" y2="14"/>
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 flex flex-col" style={{ top: '57px' }}>
          <div className="bg-white border-b border-stone-200 px-6 py-4 flex flex-col gap-1 shadow-lg">
            {NAV_LINKS.map(link =>
              link.anchor ? (
                <a key={link.href} href={link.href}
                  className="py-2.5 text-sm text-gray-600 hover:text-gray-900 border-b border-stone-100 transition"
                  onClick={handleClose}>
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href}
                  className="py-2.5 text-sm text-gray-600 hover:text-gray-900 border-b border-stone-100 transition"
                  onClick={handleClose}>
                  {link.label}
                </Link>
              )
            )}

            {/* Case Studies (mobile accordion) */}
            <button
              onClick={() => setCsMobileOpen(v => !v)}
              className="flex items-center justify-between py-2.5 text-sm text-gray-600 hover:text-gray-900 border-b border-stone-100 transition"
            >
              Case Studies
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className={`transition-transform ${csMobileOpen ? 'rotate-180' : ''}`}>
                <path d="M3 4.5L6 7.5L9 4.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {csMobileOpen && (
              <div className="flex flex-col border-b border-stone-100">
                {CASE_STUDIES.map(cs => (
                  <Link key={cs.href} href={cs.href} onClick={handleClose}
                    className="py-2.5 pl-4 text-sm text-gray-500 hover:text-emerald-600 transition">
                    {cs.label}
                  </Link>
                ))}
              </div>
            )}

            {/* GitHub (after case studies) */}
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
              className="py-2.5 text-sm text-gray-600 hover:text-gray-900 border-b border-stone-100 transition"
              onClick={handleClose}>
              GitHub ↗
            </a>

            <div className="flex gap-3 pt-3">
              <Link href="/auth/login" onClick={handleClose} className="flex-1 text-center px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg transition">Sign in</Link>
              <Link href="/auth/signup" onClick={handleClose} className="flex-1 text-center px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg font-medium transition">Sign up</Link>
            </div>
          </div>
          <div className="flex-1 bg-black/20" onClick={handleClose} />
        </div>
      )}
    </>
  )
}
