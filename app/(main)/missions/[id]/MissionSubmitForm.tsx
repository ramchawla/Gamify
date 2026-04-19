'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PhotoUploadZone from '@/components/submission/PhotoUploadZone'
import CaptionInput from '@/components/submission/CaptionInput'
import SubmitButton from '@/components/submission/SubmitButton'
import type { SubmissionType } from '@/types'

interface Props {
  missionId: string
  submissionType: SubmissionType
  missionTitle: string
}

export default function MissionSubmitForm({ missionId, submissionType, missionTitle: _missionTitle }: Props) {
  const router = useRouter()
  const [file, setFile]       = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [caption, setCaption] = useState('')
  const [text, setText]       = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

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
    if (submissionType === 'photo' && !file) { setError('Please select a photo'); return }
    if (submissionType === 'text'  && !text.trim()) { setError('Please enter a response'); return }

    setError('')
    setLoading(true)

    try {
      let media_path: string | undefined

      if (file) {
        // Step 1: get signed upload URL
        const urlRes = await fetch('/api/storage/upload-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileName: file.name, contentType: file.type }),
        })
        const { data: urlData, error: urlError } = await urlRes.json()
        if (urlError) throw new Error(urlError)

        // Step 2: upload directly to Supabase Storage
        const uploadRes = await fetch(urlData.signedUrl, {
          method: 'PUT',
          headers: { 'Content-Type': file.type },
          body: file,
        })
        if (!uploadRes.ok) throw new Error('Upload failed')
        media_path = urlData.path
      }

      // Step 3: create submission
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

      router.push('/missions')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="px-4 py-3 rounded-xl bg-[rgba(248,113,113,0.10)] border border-[rgba(248,113,113,0.30)]">
          <p className="text-[#F87171] text-sm">{error}</p>
        </div>
      )}

      {(submissionType === 'photo' || submissionType === 'video') && (
        <PhotoUploadZone onFileSelect={handleFileSelect} onClear={clearFile} preview={preview} disabled={loading} />
      )}

      {submissionType === 'text' && (
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium uppercase tracking-widest text-[#8A8F9E]">Your Response</label>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            rows={5}
            placeholder="Write your response here…"
            disabled={loading}
            className="w-full resize-none rounded-xl px-4 py-3 text-sm bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.10)] text-[#F0EEE9] placeholder:text-[#4A4F61] focus:outline-none focus:border-[rgba(200,144,42,0.50)] transition-colors"
          />
        </div>
      )}

      <CaptionInput value={caption} onChange={setCaption} placeholder="Add a caption (optional)…" disabled={loading} />

      <SubmitButton loading={loading} onClick={handleSubmit} />
    </div>
  )
}
