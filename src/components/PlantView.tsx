import { pointsToNextStage, stageFromPoints } from '../data/plant'
import type { PlantStage } from '../data/types'

// 단계별 플레이스홀더 (디자인에서 일러스트·애니메이션으로 교체)
const STAGE_EMOJI: Record<PlantStage, string> = {
  씨앗: '🌰',
  새싹: '🌱',
  잎: '🌿',
  꽃: '🌷',
}

export default function PlantView({ points }: { points: number }) {
  const stage = stageFromPoints(points)
  const left = pointsToNextStage(points)
  return (
    <div className="flex flex-col items-center gap-2 rounded-card bg-primary-soft py-8">
      <div className="text-7xl" aria-hidden>
        {STAGE_EMOJI[stage]}
      </div>
      <div className="text-lg font-bold text-primary">{stage}</div>
      <div className="text-sm text-muted">
        포인트 {points}
        {left !== null ? ` · 다음 단계까지 ${left}` : ' · 활짝 피었어요'}
      </div>
    </div>
  )
}
