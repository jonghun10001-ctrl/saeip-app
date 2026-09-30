// 데이터 모델 (플랜 v1 3절 = 진행보고서 "수집할 데이터 항목" 초안)

export type Category = '식물' | '대화' | '감각' | '산책'

/** 온보딩에서 고르는 선호 활동 (플랜 기준 3개) */
export type Activity = '식물' | '대화' | '감각'

/** 감정 1(많이 힘듦) ~ 5(아주 좋음) */
export type Emotion = 1 | 2 | 3 | 4 | 5

export interface User {
  nickname: string
  preferredActivities: Activity[]
  workshopCode: string
  shareConsent: boolean
  createdAt: string // ISO
}

export interface CheckIn {
  id: string
  date: string // YYYY-MM-DD (로컬 날짜)
  emotion: Emotion
  memo: string
  createdAt: string // ISO
}

export interface Mission {
  id: string
  title: string
  category: Category
  week: number
  description: string
}

export interface MissionLog {
  id: string
  missionId: string
  emotionBefore: Emotion | null // 그날 체크인이 없으면 null
  emotionAfter: Emotion
  photo: string | null // 작은 data URL, 너무 크면 저장하지 않음
  memo: string
  completedAt: string // ISO
}

export type PlantStage = '씨앗' | '새싹' | '잎' | '꽃'

export interface Plant {
  stage: PlantStage
  points: number
}

export interface Post {
  id: string
  missionLogId: string | null // 가짜 게시글은 null
  author: string
  missionTitle: string
  emotionAfter: Emotion
  memo: string
  photo: string | null
  createdAt: string // ISO
  empathyCount: number
  empathizedByMe: boolean
}
