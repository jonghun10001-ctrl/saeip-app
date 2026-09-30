import type { Emotion } from './types'

// 감정 5단계 표시용 (문구·아이콘은 디자인 단계에서 교체)
export const EMOTIONS: { value: Emotion; emoji: string; label: string }[] = [
  { value: 1, emoji: '😣', label: '많이 힘들어요' },
  { value: 2, emoji: '😔', label: '조금 지쳐요' },
  { value: 3, emoji: '😐', label: '그저 그래요' },
  { value: 4, emoji: '🙂', label: '괜찮아요' },
  { value: 5, emoji: '😊', label: '아주 좋아요' },
]

export function emotionEmoji(e: Emotion | null): string {
  return e ? EMOTIONS[e - 1].emoji : '-'
}
