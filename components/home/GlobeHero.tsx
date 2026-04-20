'use client'

import { useEffect, useRef, useCallback } from 'react'
import createGlobe from 'cobe'

// Noma Collective / near Yosemite Valley, CA
const NOMA_LAT = 37.74
const NOMA_LNG = -119.57

function toRad(deg: number) { return (deg * Math.PI) / 180 }

const INITIAL_PHI   = toRad(180 + NOMA_LNG) // center Noma on first render
const INITIAL_THETA = toRad(-NOMA_LAT * 0.4) // slight northern tilt

export default function GlobeHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const phiRef = useRef(INITIAL_PHI)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragStartPhi = useRef(INITIAL_PHI)
  const rafRef = useRef<number | undefined>(undefined)

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    isDragging.current = true
    dragStartX.current = e.clientX
    dragStartPhi.current = phiRef.current
    canvasRef.current!.style.cursor = 'grabbing'
  }, [])

  const onPointerUp = useCallback(() => {
    isDragging.current = false
    canvasRef.current!.style.cursor = 'grab'
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging.current) return
    const delta = e.clientX - dragStartX.current
    phiRef.current = dragStartPhi.current - delta / 150
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: INITIAL_PHI,
      theta: INITIAL_THETA,
      dark: 1,
      diffuse: 1.1,
      mapSamples: 20000,
      mapBrightness: 4.5,
      baseColor: [0.08, 0.08, 0.10],
      markerColor: [0.78, 0.56, 0.17],
      glowColor: [0.78, 0.56, 0.17],
      scale: 1,
      offset: [0, 0],
      markers: [
        { location: [NOMA_LAT, NOMA_LNG], size: 0.07 },
      ],
    })

    function animate() {
      if (!isDragging.current) {
        phiRef.current += 0.004
      }
      globe.update({ phi: phiRef.current, theta: INITIAL_THETA })
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    canvasRef.current.style.opacity = '1'

    return () => {
      globe.destroy()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="relative w-full flex items-center justify-center" style={{ height: 280 }}>
      {/* Fade bottom edge into page background */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, #0D0D0F 10%, transparent 65%)',
        }}
      />
      <canvas
        ref={canvasRef}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerOut={onPointerUp}
        onMouseMove={onMouseMove}
        style={{
          width: 340,
          height: 340,
          cursor: 'grab',
          opacity: 0,
          transition: 'opacity 0.8s ease',
          marginTop: -30,
        }}
      />
    </div>
  )
}
