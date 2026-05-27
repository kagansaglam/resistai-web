'use client'
import { useState } from 'react'
import { createClient } from '../../../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <main className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="ResistAI" className="h-12 w-auto mx-auto" />
          <h1 className="text-2xl font-bold text-gray-900 mt-3">Sign in to ResistAI</h1>
          <p className="text-gray-500 mt-1 text-sm">Antibiotic resistance research platform</p>
        </div>
        <form onSubmit={handleLogin} className="bg-white border border-stone-200 rounded-xl p-8 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-emerald-400"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-emerald-400"
              placeholder="password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg transition text-sm"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
          <div className="flex justify-between items-center">
            <Link href="/auth/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-500">Forgot password?</Link>
            <p className="text-sm text-gray-500">No account?{' '}<Link href="/auth/signup" className="text-emerald-600 hover:text-emerald-500">Sign up</Link></p>
          </div>
        </form>
      </div>
    </main>
  )
}
