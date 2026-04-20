'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Camera, X } from 'lucide-react'
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
        'relative rounded-2xl overflow-hidden cursor-pointer transition-colors',
        preview ? 'border-[0.5px] border-[rgba(243,239,230,0.12)]'
                : dragging ? 'bg-[rgba(200,144,42,0.06)] border border-dashed border-[#C8902A]'
                           : 'bg-[rgba(243,239,230,0.02)] border border-dashed border-[rgba(243,239,230,0.14)] hover:border-[rgba(200,144,42,0.50)]',
        disabled && 'pointer-events-none opacity-50'
      )}
      style={{ minHeight: 220 }}
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
          <div className="relative w-full aspect-[4/3]">
            <Image src={preview} alt="Preview" fill className="object-cover" />
          </div>
          <button
            onClick={e => { e.stopPropagation(); onClear() }}
            aria-label="Remove photo"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[rgba(10,9,8,0.65)] backdrop-blur-md flex items-center justify-center text-[#F3EFE6] border border-[rgba(243,239,230,0.12)]"
          >
            <X size={16} />
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 py-14 text-[#8A8473]">
          <div className="w-12 h-12 rounded-full border border-[rgba(200,144,42,0.35)] bg-[rgba(200,144,42,0.06)] flex items-center justify-center">
            <Camera size={20} strokeWidth={1.5} className="text-[#C8902A]" />
          </div>
          <p className="text-[#F3EFE6] text-sm font-medium">Capture the moment</p>
          <p className="text-[11px] text-[#8A8473]">Tap to upload — or drag a photo here</p>
        </div>
      )}
    </div>
  )
}
