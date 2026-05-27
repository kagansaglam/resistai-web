'use client'
import { useState } from 'react'
import { createClient } from '../../../lib/supabase'
import Link from 'next/link'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  async function handleSignup(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } }
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">Check your email</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Confirmation link sent to <span className="text-emerald-600">{email}</span>
          </p>
          <Link href="/auth/login" className="inline-block mt-6 text-sm text-emerald-600 hover:text-emerald-500">
            Back to sign in
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="ResistAI" className="h-12 w-auto mx-auto" />
          <h1 className="text-2xl font-bold text-gray-900 mt-3">Create your account</h1>
          <p className="text-gray-500 mt-1 text-sm">Free access to ResistAI platform</p>
        </div>
        <form onSubmit={handleSignup} className="bg-white border border-stone-200 rounded-xl p-8 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Full name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-emerald-400"
              placeholder="Your name"
              required
            />
          </div>
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
              placeholder="Min. 6 characters"
              required
              minLength={6}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg transition text-sm"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-emerald-600 hover:text-emerald-500">Sign in</Link>
          </p>
        </form>
      </div>
    </main>
  )
}
