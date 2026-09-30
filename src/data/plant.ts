import type { PlantStage } from './types'

// 미션 1개 완료 = 1포인트. 단계 기준 포인트 (조정은 여기서만)
export const STAGE_THRESHOLDS: { stage: PlantStage; min: number }[] = [
  { stage: '씨앗', min: 0 },
  { stage: '새싹', min: 2 },
  { stage: '잎', min: 5 },
  { stage: '꽃', min: 9 },
]

export function stageFromPoints(points: number): PlantStage {
  let current: PlantStage = '씨앗'
  for (const t of STAGE_THRESHOLDS) if (points >= t.min) current = t.stage
  return current
}

/** 다음 단계까지 남은 포인트. 마지막 단계면 null */
export function pointsToNextStage(points: number): number | null {
  const next = STAGE_THRESHOLDS.find((t) => t.min > points)
  return next ? next.min - points : null
}
