import type { Metadata } from 'next'
import { IBM_Plex_Sans } from 'next/font/google'
import './globals.css'

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ResistAI — Antibiotic Resistance Research Platform',
  description: 'AI-powered platform for druggability analysis of antibiotic resistance proteins. Integrates AlphaFold, ESM-2, fpocket, and RAG to identify druggable targets across 2,433 WHO priority pathogens.',
  verification: {
    google: 'pSpLZ5O6Ir-QomSXSM4Ha6ZOinFC5TeNTbQwJXtG6_U',
  },
  metadataBase: new URL('https://resistai.bio'),
  openGraph: {
    title: 'ResistAI — Antibiotic Resistance Research Platform',
    description: 'Identify druggable targets in antibiotic resistance proteins. AlphaFold + ESM-2 + fpocket + RAG — fully automated.',
    url: 'https://resistai.bio',
    siteName: 'ResistAI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ResistAI — Antibiotic Resistance Research Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ResistAI — Antibiotic Resistance Research Platform',
    description: 'Identify druggable targets in antibiotic resistance proteins. Fully automated pipeline: AlphaFold + ESM-2 + fpocket + RAG.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ibmPlexSans.className}>{children}</body>
    </html>
  )
}
