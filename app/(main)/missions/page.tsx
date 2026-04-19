'use client'

import { useEffect, useState } from 'react'
import TabToggle from '@/components/missions/TabToggle'
import MissionCard from '@/components/missions/MissionCard'
import SectionHeader from '@/components/shared/SectionHeader'
import { SkeletonCard } from '@/components/shared/Skeleton'
import type { Mission, CategoryName } from '@/types'
import { CATEGORY_LABELS, CATEGORY_ORDER } from '@/lib/constants'

export default function MissionsPage() {
  const [tab, setTab] = useState<'remaining' | 'completed'>('remaining')
  const [missions, setMissions] = useState<Mission[]>([])
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
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

  // Group by category
  const grouped = CATEGORY_ORDER.reduce<Record<CategoryName, Mission[]>>((acc, cat) => {
    acc[cat] = missions.filter(m => m.category === cat)
    return acc
  }, {} as Record<CategoryName, Mission[]>)

  const remainingCount = missions.length
  const completedCount = completedIds.size

  return (
    <div className="pb-4">
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-[#F0EEE9] mb-4">Missions</h1>
        <TabToggle
          active={tab}
          onToggle={setTab}
          remainingCount={tab === 'remaining' ? remainingCount : undefined}
          completedCount={tab === 'completed' ? completedCount : undefined}
        />
      </div>

      {loading ? (
        <div className="px-4 space-y-3">
          {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : missions.length === 0 ? (
        <div className="px-4 py-12 text-center text-[#8A8F9E]">
          {tab === 'completed' ? 'No completed missions yet.' : 'All missions completed!'}
        </div>
      ) : (
        <div className="px-4 space-y-1 stagger">
          {CATEGORY_ORDER.map(cat => {
            const catMissions = grouped[cat]
            if (!catMissions.length) return null
            return (
              <div key={cat}>
                <SectionHeader title={CATEGORY_LABELS[cat]} count={catMissions.length} />
                <div className="space-y-2">
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
