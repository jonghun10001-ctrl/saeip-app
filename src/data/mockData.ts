import type { Activity, Mission, Post } from './types'

// 온보딩·마이에서 고르는 선호 활동
export const ACTIVITIES: Activity[] = ['식물', '대화', '감각']

export const CURRENT_WEEK = 1

// 이번 주 미션 (실제 목록·주차 편성은 그린테라피와 협의 후 교체)
export const MISSIONS: Mission[] = [
  {
    id: 'm1',
    title: '내 식물 사진 찍기',
    category: '식물',
    week: 1,
    description: '가까이 있는 식물을 천천히 들여다보고 한 장 찍어볼까요? 잎의 색이나 모양 중 눈에 띄는 것 하나를 메모해도 좋아요.',
  },
  {
    id: 'm2',
    title: '10분 산책하기',
    category: '산책',
    week: 1,
    description: '가벼운 마음으로 10분만 걸어볼까요? 길에서 만난 나무나 풀을 하나 찾아보는 것도 좋아요.',
  },
  {
    id: 'm3',
    title: '식물 물 주고 돌보기',
    category: '식물',
    week: 1,
    description: '흙을 손가락으로 만져보고, 말라 있으면 물을 주어볼까요? 시든 잎이 있다면 정리해 주어도 좋아요.',
  },
  {
    id: 'm4',
    title: '압화 만들기',
    category: '감각',
    week: 1,
    description: '마음에 드는 꽃잎이나 잎을 책 사이에 끼워볼까요? 며칠 뒤 어떻게 변했는지 확인해 보아요.',
  },
  {
    id: 'm5',
    title: '햇빛 5분 쬐기',
    category: '감각',
    week: 1,
    description: '창가나 밖에서 5분 동안 햇빛을 느껴볼까요? 따뜻함이 어디에 닿는지 가만히 느껴보아요.',
  },
  {
    id: 'm6',
    title: '식물 이야기 나누기',
    category: '대화',
    week: 1,
    description: '가족이나 친구에게 요즘 키우는 식물이나 좋아하는 꽃 이야기를 한 가지 해볼까요?',
  },
]

// 다른 참여자의 가짜 게시글 (커뮤니티 피드 채우기용)
export const MOCK_POSTS: Omit<Post, 'empathizedByMe'>[] = [
  {
    id: 'p-mock-1',
    missionLogId: null,
    author: '초록이',
    missionTitle: '식물 물 주고 돌보기',
    emotionAfter: 4,
    memo: '새 잎이 하나 올라와 있었어요.',
    photo: null,
    createdAt: '2026-09-28T09:10:00+09:00',
    empathyCount: 5,
  },
  {
    id: 'p-mock-2',
    missionLogId: null,
    author: '느린걸음',
    missionTitle: '10분 산책하기',
    emotionAfter: 3,
    memo: '비가 그친 뒤라 흙냄새가 좋았어요.',
    photo: null,
    createdAt: '2026-09-27T18:40:00+09:00',
    empathyCount: 3,
  },
  {
    id: 'p-mock-3',
    missionLogId: null,
    author: '해바라기',
    missionTitle: '햇빛 5분 쬐기',
    emotionAfter: 5,
    memo: '오랜만에 창문을 열었어요.',
    photo: null,
    createdAt: '2026-09-26T12:05:00+09:00',
    empathyCount: 8,
  },
]
