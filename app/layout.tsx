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
  description: 'AI-powered platform for druggability analysis of antibiotic resistance proteins',
  verification: {
    google: '<meta name="google-site-verification" content="pSpLZ5O6Ir-QomSXSM4Ha6ZOinFC5TeNTbQwJXtG6_U" />',
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
