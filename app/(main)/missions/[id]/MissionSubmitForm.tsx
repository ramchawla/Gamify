'use client'

import { useState } from 'react'
import PhotoUploadZone from '@/components/submission/PhotoUploadZone'
import CaptionInput from '@/components/submission/CaptionInput'
import SubmitButton from '@/components/submission/SubmitButton'
import ConfirmationScreen from '@/components/submission/ConfirmationScreen'
import { isDemoMode } from '@/lib/mock-data'
import type { SubmissionType } from '@/types'

interface Props {
  missionId: string
  submissionType: SubmissionType
  missionTitle: string
  missionPoints: number
}

export default function MissionSubmitForm({
  missionId, submissionType, missionTitle, missionPoints,
}: Props) {
  const [file, setFile]       = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [caption, setCaption] = useState('')
  const [text, setText]       = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [confirmed, setConfirmed] = useState(false)

  function handleFileSelect(f: File) {
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  function clearFile() {
    setFile(null)
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
  }

  async function handleSubmit() {
    if (submissionType === 'photo' && !file) { setError('Please select a photo.'); return }
    if (submissionType === 'text'  && !text.trim()) { setError('Please enter a response.'); return }
    setError('')
    setLoading(true)

    if (isDemoMode()) {
      await new Promise(r => setTimeout(r, 1200))
      setLoading(false)
      setConfirmed(true)
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate?.(6)
      }
      return
    }

    try {
      let media_path: string | undefined
      if (file) {
        const urlRes = await fetch('/api/storage/upload-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileName: file.name, contentType: file.type }),
        })
        const { data: urlData, error: urlError } = await urlRes.json()
        if (urlError) throw new Error(urlError)
        const uploadRes = await fetch(urlData.signedUrl, {
          method: 'PUT',
          headers: { 'Content-Type': file.type },
          body: file,
        })
        if (!uploadRes.ok) throw new Error('Upload failed')
        media_path = urlData.path
      }
      const subRes = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mission_id: missionId,
          media_path,
          text_response: submissionType === 'text' ? text : undefined,
          caption: caption || undefined,
        }),
      })
      const { error: subError } = await subRes.json()
      if (subError) throw new Error(subError)
      setConfirmed(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed')
    } finally {
      setLoading(false)
    }
  }

  if (confirmed) {
    return <ConfirmationScreen points={missionPoints} missionTitle={missionTitle} newRank={2} prevRank={4} />
  }

  return (
    <div className="space-y-5">
      {error && (
        <div className="px-4 py-3 rounded-xl bg-[rgba(200,116,97,0.10)] border border-[rgba(200,116,97,0.30)]">
          <p className="text-[#C87461] text-sm">{error}</p>
        </div>
      )}

      {(submissionType === 'photo' || submissionType === 'video') && (
        <PhotoUploadZone onFileSelect={handleFileSelect} onClear={clearFile} preview={preview} disabled={loading} />
      )}

      {submissionType === 'text' && (
        <div>
          <p className="eyebrow mb-2">Your response</p>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            rows={5}
            placeholder="Write from the moment…"
            disabled={loading}
            className="w-full resize-none input-editorial leading-relaxed py-3"
          />
        </div>
      )}

      <CaptionInput value={caption} onChange={setCaption} placeholder="Add a caption…" disabled={loading} />
      <SubmitButton loading={loading} onClick={handleSubmit} />
    </div>
  )
}
