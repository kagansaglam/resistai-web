'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const NAV_LINKS = [
  { href: '#why-resistai', label: 'Why ResistAI', anchor: true },
  { href: '/dashboard/analyse', label: 'Analyse' },
  { href: '#how-it-works', label: 'How it works', anchor: true },
  { href: '#features', label: 'Features', anchor: true },
  { href: '/architecture', label: 'Architecture' },
  { href: '/case-study/vim7', label: 'VIM-7' },
  { href: '/case-study/inha', label: 'InhA' },
  { href: '/case-study/kpc2', label: 'KPC-2' },
  { href: 'https://github.com/kagansaglam/resistai', label: 'GitHub', external: true },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change / anchor click
  const handleClose = () => setOpen(false)

  return (
    <>
      <nav className={`sticky top-0 z-50 border-b border-stone-200 px-6 py-3 flex items-center justify-between bg-white transition-shadow duration-200 ${scrolled ? 'shadow-sm' : ''}`}>
        <Link href="/" className="flex items-center gap-2 shrink-0" onClick={handleClose}>
          <Image src="/logo.png" alt="ResistAI" width={160} height={40} className="h-9 w-auto" style={{ width: 'auto' }} />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-5 text-sm text-gray-500">
          {NAV_LINKS.map(link =>
            link.external ? (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition">{link.label}</a>
            ) : link.anchor ? (
              <a key={link.href} href={link.href} className="hover:text-gray-900 transition">{link.label}</a>
            ) : (
              <Link key={link.href} href={link.href} className="hover:text-gray-900 transition">{link.label}</Link>
            )
          )}
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
              link.external ? (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
                  className="py-2.5 text-sm text-gray-600 hover:text-gray-900 border-b border-stone-100 last:border-0 transition"
                  onClick={handleClose}>
                  {link.label} ↗
                </a>
              ) : link.anchor ? (
                <a key={link.href} href={link.href}
                  className="py-2.5 text-sm text-gray-600 hover:text-gray-900 border-b border-stone-100 last:border-0 transition"
                  onClick={handleClose}>
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href}
                  className="py-2.5 text-sm text-gray-600 hover:text-gray-900 border-b border-stone-100 last:border-0 transition"
                  onClick={handleClose}>
                  {link.label}
                </Link>
              )
            )}
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
