'use client'
import { useState } from 'react'
import { createClient } from '../../../lib/supabase'
import Link from 'next/link'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()
async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSent(true)
    }
  }
if (sent) {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <span className="text-5xl">📧</span>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">Check your email</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Password reset link sent to <span className="text-emerald-600">{email}</span>
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
          <span className="text-4xl">🧬</span>
          <h1 className="text-2xl font-bold text-gray-900 mt-3">Reset your password</h1>
          <p className="text-gray-500 mt-1 text-sm">Enter your email to receive a reset link</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white border border-stone-200 rounded-xl p-8 space-y-5">
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
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg transition text-sm"
          >
            {loading ? 'Sending...' : 'Send reset link'}
          </button>
          <p className="text-center text-sm text-gray-400">
            <Link href="/auth/login" className="text-emerald-600 hover:text-emerald-500">Back to sign in</Link>
          </p>
        </form>
      </div>
    </main>
  )
}
