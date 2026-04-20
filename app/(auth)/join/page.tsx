'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import NomaMark from '@/components/shared/NomaMark'
import { isDemoMode } from '@/lib/mock-data'

type Mode = 'create' | 'join'

export default function JoinPage() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>('create')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [teamName, setTeamName] = useState('')
  const [captainName, setCaptainName] = useState('')
  const [email, setEmail] = useState('')

  const [joinCode, setJoinCode] = useState('')
  const [displayName, setDisplayName] = useState('')

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    if (isDemoMode()) {
      await new Promise(r => setTimeout(r, 600))
      router.push('/home')
      return
    }
    try {
      const res = await fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ team_name: teamName, captain_name: captainName, captain_email: email }),
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
    if (isDemoMode()) {
      await new Promise(r => setTimeout(r, 600))
      router.push('/home')
      return
    }
    try {
      const res = await fetch('/api/teams/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ join_code: joinCode, display_name: displayName }),
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
    <div className="relative min-h-svh overflow-hidden">
      {/* Hero imagery */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-campfire.png"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,9,8,0.35) 0%, rgba(10,9,8,0.60) 40%, rgba(10,9,8,0.92) 100%)',
          }}
        />
      </div>

      <div className="relative min-h-svh flex flex-col px-6 safe-top pb-10">
        {/* Wordmark */}
        <header className="pt-10 pb-4 flex items-center justify-center">
          <NomaMark size={18} />
        </header>

        {/* Spacer for imagery */}
        <div className="flex-1 min-h-[18vh]" />

        {/* Headline */}
        <div className="float-in mb-8">
          <p className="eyebrow mb-3">The $10,000 Challenge</p>
          <h1 className="font-display text-[40px] leading-[1.05] text-[#F3EFE6]" style={{ fontWeight: 400 }}>
            A season of<br />
            <span style={{ fontWeight: 400, fontStyle: 'italic' }}>quiet adventure.</span>
          </h1>
          <p className="mt-4 text-[#C6C0B4] text-[15px] leading-relaxed max-w-sm">
            Gather your team. Complete missions across the property and the Sierra.
            The most attentive team wins $10,000.
          </p>
        </div>

        {/* Mode switch — underline links, not pills */}
        <div className="flex items-center gap-6 mb-7 border-b border-[rgba(243,239,230,0.08)]">
          {(['create', 'join'] as Mode[]).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError('') }}
              className={cn(
                'relative pb-3 text-sm font-medium transition-colors',
                mode === m ? 'text-[#F3EFE6]' : 'text-[#8A8473] hover:text-[#C6C0B4]'
              )}
            >
              {m === 'create' ? 'Create a team' : 'Join a team'}
              <span
                className={cn(
                  'absolute left-0 right-0 -bottom-px h-px bg-[#C8902A] transition-opacity',
                  mode === m ? 'opacity-100' : 'opacity-0'
                )}
              />
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-[rgba(200,116,97,0.10)] border border-[rgba(200,116,97,0.30)]">
            <p className="text-[#C87461] text-sm">{error}</p>
          </div>
        )}

        {mode === 'create' ? (
          <form onSubmit={handleCreate} className="space-y-5 stagger">
            <EditorialField label="Team name" value={teamName} onChange={setTeamName} placeholder="The Explorers" required />
            <EditorialField label="Your name" value={captainName} onChange={setCaptainName} placeholder="Alex Johnson" required />
            <EditorialField label="Email" value={email} onChange={setEmail} placeholder="alex@example.com" type="email" required />
            <SubmitLink loading={loading} label="Begin the Challenge" />
          </form>
        ) : (
          <form onSubmit={handleJoin} className="space-y-5 stagger">
            <EditorialField label="Team code" value={joinCode} onChange={v => setJoinCode(v.toUpperCase())} placeholder="EXPL26" required />
            <EditorialField label="Your name" value={displayName} onChange={setDisplayName} placeholder="Alex Johnson" required />
            <SubmitLink loading={loading} label="Join Your Team" />
          </form>
        )}
      </div>
    </div>
  )
}

function EditorialField({ label, value, onChange, placeholder, type = 'text', required }: {
  label: string; value: string; onChange: (v: string) => void
  placeholder?: string; type?: string; required?: boolean
}) {
  return (
    <div>
      <label className="eyebrow block mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="input-editorial"
      />
    </div>
  )
}

function SubmitLink({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="group mt-4 w-full flex items-center justify-between py-3.5 text-left text-[#F3EFE6] disabled:opacity-50"
      style={{ borderTop: '0.5px solid rgba(243,239,230,0.15)', borderBottom: '0.5px solid rgba(243,239,230,0.15)' }}
    >
      <span className="font-display text-[22px]" style={{ fontWeight: 400 }}>
        {loading ? 'One moment…' : label}
      </span>
      <span className="text-[#C8902A] text-xl transition-transform group-hover:translate-x-1">→</span>
    </button>
  )
}
