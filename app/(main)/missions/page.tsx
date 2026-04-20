'use client'

import { useEffect, useState } from 'react'
import TabToggle from '@/components/missions/TabToggle'
import MissionCard from '@/components/missions/MissionCard'
import SectionHeader from '@/components/shared/SectionHeader'
import { SkeletonCard } from '@/components/shared/Skeleton'
import type { Mission, CategoryName } from '@/types'
import { CATEGORY_LABELS, CATEGORY_ORDER } from '@/lib/constants'
import { isDemoMode, DEMO_MISSIONS, DEMO_COMPLETED_MISSION_IDS } from '@/lib/mock-data'

export default function MissionsPage() {
  const [tab, setTab] = useState<'remaining' | 'completed'>('remaining')
  const [missions, setMissions] = useState<Mission[]>([])
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      if (isDemoMode()) {
        const completed = DEMO_COMPLETED_MISSION_IDS
        const filtered = tab === 'completed'
          ? DEMO_MISSIONS.filter(m => completed.has(m.id))
          : DEMO_MISSIONS.filter(m => !completed.has(m.id))
        setMissions(filtered)
        setCompletedIds(completed)
        setLoading(false)
        return
      }
      const res = await fetch(`/api/missions?tab=${tab}`)
      if (res.ok) {
        const json = await res.json()
        setMissions(json.data ?? [])
        if (json.completed_ids) setCompletedIds(new Set(json.completed_ids))
      }
      setLoading(false)
    }
    load()
  }, [tab])

  const grouped = CATEGORY_ORDER.reduce<Record<CategoryName, Mission[]>>((acc, cat) => {
    acc[cat] = missions.filter(m => m.category === cat)
    return acc
  }, {} as Record<CategoryName, Mission[]>)

  const remainingCount = tab === 'remaining' ? missions.length : undefined
  const completedCount = tab === 'completed' ? completedIds.size : undefined

  return (
    <div className="pb-4">
      <div className="px-5 pt-8 pb-4">
        <p className="eyebrow">The Season</p>
        <h1 className="font-display text-[28px] text-[#F3EFE6] mt-1 mb-5 leading-tight" style={{ fontWeight: 400 }}>
          Missions
        </h1>
        <TabToggle
          active={tab}
          onToggle={setTab}
          remainingCount={remainingCount}
          completedCount={completedCount}
        />
      </div>

      {loading ? (
        <div>{[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}</div>
      ) : missions.length === 0 ? (
        <div className="px-5 py-16 text-center text-[#8A8473]">
          {tab === 'completed' ? 'No completed missions yet.' : 'All missions completed.'}
        </div>
      ) : (
        <div>
          {CATEGORY_ORDER.map(cat => {
            const catMissions = grouped[cat]
            if (!catMissions.length) return null
            return (
              <div key={cat}>
                <SectionHeader title={CATEGORY_LABELS[cat]} count={catMissions.length} />
                <div className="stagger">
                  {catMissions.map(m => (
                    <MissionCard key={m.id} mission={m} completed={completedIds.has(m.id)} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
