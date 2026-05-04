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
      <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <span className="text-5xl">✅</span>
          <h1 className="text-2xl font-bold text-white mt-4">Check your email</h1>
          <p className="text-gray-400 mt-2 text-sm">
            Confirmation link sent to <span className="text-emerald-400">{email}</span>
          </p>
          <Link href="/auth/login" className="inline-block mt-6 text-sm text-emerald-400 hover:text-emerald-300">
            Back to sign in
          </Link>
        </div>
      </main>
    )
  }
return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-4xl">🧬</span>
          <h1 className="text-2xl font-bold text-white mt-3">Create your account</h1>
          <p className="text-gray-400 mt-1 text-sm">Free access to ResistAI platform</p>
        </div>
        <form onSubmit={handleSignup} className="bg-gray-900 border border-gray-800 rounded-xl p-8 space-y-5">
          {error && (
            <div className="bg-red-900/40 border border-red-700 text-red-300 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          <div>
<label className="block text-sm text-gray-300 mb-2">Full name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
              placeholder="you@example.com"
              required
            />
          </div>
<div>
            <label className="block text-sm text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
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
<p className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-emerald-400 hover:text-emerald-300">Sign in</Link>
          </p>
        </form>
      </div>
    </main>
  )
}
