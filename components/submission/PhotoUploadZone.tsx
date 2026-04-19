'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Upload, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  onFileSelect: (file: File) => void
  onClear: () => void
  preview?: string | null
  disabled?: boolean
}

export default function PhotoUploadZone({ onFileSelect, onClear, preview, disabled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  function handleFile(file: File) {
    if (!file.type.startsWith('image/')) return
    onFileSelect(file)
  }

  return (
    <div
      className={cn(
        'relative rounded-2xl border-2 border-dashed transition-colors cursor-pointer overflow-hidden',
        dragging ? 'border-[#C8902A] bg-[rgba(200,144,42,0.08)]' : 'border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.03)]',
        disabled && 'pointer-events-none opacity-50'
      )}
      style={{ minHeight: 200 }}
      onClick={() => inputRef.current?.click()}
      onDragOver={e => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={e => {
        e.preventDefault()
        setDragging(false)
        const file = e.dataTransfer.files[0]
        if (file) handleFile(file)
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
      />

      {preview ? (
        <>
          <Image src={preview} alt="Preview" fill className="object-cover" />
          <button
            onClick={e => { e.stopPropagation(); onClear() }}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-[rgba(13,13,15,0.8)] flex items-center justify-center text-[#F0EEE9]"
          >
            <X size={16} />
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 py-10 text-[#8A8F9E]">
          <Upload size={32} strokeWidth={1.5} />
          <p className="text-sm font-medium">Tap to upload photo</p>
          <p className="text-xs text-[#4A4F61]">or drag and drop</p>
        </div>
      )}
    </div>
  )
}
