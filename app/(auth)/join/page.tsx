'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

type Mode = 'create' | 'join'

export default function JoinPage() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>('create')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Create team fields
  const [teamName, setTeamName]       = useState('')
  const [captainName, setCaptainName] = useState('')
  const [email, setEmail]             = useState('')
  const [booking, setBooking]         = useState('')

  // Join fields
  const [joinCode, setJoinCode]       = useState('')
  const [displayName, setDisplayName] = useState('')
  const [joinEmail, setJoinEmail]     = useState('')

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ team_name: teamName, captain_name: captainName, captain_email: email, booking_number: booking || null }),
      })
      const json = await res.json()
      if (!res.ok) { setError(json.error ?? 'Something went wrong'); return }
      router.push('/home')
    } catch {
      setError('Network error — please try again')
    } finally {
      setLoading(false)
    }
  }

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/teams/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ join_code: joinCode, display_name: displayName, email: joinEmail || null }),
      })
      const json = await res.json()
      if (!res.ok) { setError(json.error ?? 'Something went wrong'); return }
      router.push('/home')
    } catch {
      setError('Network error — please try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-svh flex flex-col items-center justify-center px-5 py-10 bg-[#0D0D0F]">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo / Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-[#F0EEE9]">Noma Resorts</h1>
          <p className="text-[#8A8F9E] text-sm">$10K Challenge · Join your team</p>
        </div>

        {/* Mode toggle */}
        <div className="flex p-1 rounded-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)]">
          {(['create', 'join'] as Mode[]).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                'flex-1 py-2 rounded-full text-sm font-medium transition-all',
                mode === m ? 'bg-[#C8902A] text-[#0D0D0F]' : 'text-[#8A8F9E]'
              )}
            >
              {m === 'create' ? 'Create Team' : 'Join Team'}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="px-4 py-3 rounded-xl bg-[rgba(248,113,113,0.10)] border border-[rgba(248,113,113,0.30)]">
            <p className="text-[#F87171] text-sm">{error}</p>
          </div>
        )}

        {/* Create form */}
        {mode === 'create' && (
          <form onSubmit={handleCreate} className="space-y-4">
            <Field label="Team Name" value={teamName} onChange={setTeamName} placeholder="The Explorers" required />
            <Field label="Your Name" value={captainName} onChange={setCaptainName} placeholder="Alex Johnson" required />
            <Field label="Email" value={email} onChange={setEmail} placeholder="alex@example.com" type="email" required />
            <Field label="Booking Number (optional)" value={booking} onChange={setBooking} placeholder="NOM-12345" />
            <SubmitBtn loading={loading} label="Create Team" />
          </form>
        )}

        {/* Join form */}
        {mode === 'join' && (
          <form onSubmit={handleJoin} className="space-y-4">
            <Field label="Join Code" value={joinCode} onChange={v => setJoinCode(v.toUpperCase())} placeholder="ABC123" required />
            <Field label="Your Name" value={displayName} onChange={setDisplayName} placeholder="Alex Johnson" required />
            <Field label="Email (optional)" value={joinEmail} onChange={setJoinEmail} placeholder="alex@example.com" type="email" />
            <SubmitBtn loading={loading} label="Join Team" />
          </form>
        )}
      </div>
    </div>
  )
}

function Field({ label, value, onChange, placeholder, type = 'text', required }: {
  label: string; value: string; onChange: (v: string) => void
  placeholder?: string; type?: string; required?: boolean
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-medium uppercase tracking-widest text-[#8A8F9E]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full h-12 px-4 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.10)] text-[#F0EEE9] placeholder:text-[#4A4F61] focus:outline-none focus:border-[rgba(200,144,42,0.50)] transition-colors text-sm"
      />
    </div>
  )
}

function SubmitBtn({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full h-12 rounded-full bg-[#C8902A] text-[#0D0D0F] font-semibold text-base hover:bg-[#EAB308] transition-colors disabled:opacity-50 mt-2"
    >
      {loading ? 'Loading…' : label}
    </button>
  )
}
