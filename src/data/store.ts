/*
  저장 계층 — 앱에서 localStorage 를 만지는 유일한 파일.
  나중에 Supabase 등으로 바꿀 때 이 파일만 교체.
  (화면 코드는 아래 export 함수만 부르므로, 함수 이름·반환 타입만 유지하면 된다.
   DB로 바꾸면 반환값을 Promise 로 바꾸는 작업은 화면 쪽에서도 필요)
*/
import { CURRENT_WEEK, MISSIONS, MOCK_POSTS } from './mockData'
import { stageFromPoints } from './plant'
import type { CheckIn, Emotion, Mission, MissionLog, Plant, Post, User } from './types'

const KEYS = {
  user: 'saeip.user',
  checkIns: 'saeip.checkIns',
  missionLogs: 'saeip.missionLogs',
  plantPoints: 'saeip.plantPoints',
  posts: 'saeip.posts', // 내가 쓴 게시글
  empathy: 'saeip.empathy', // { [postId]: true } 내가 공감한 글
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

/** 저장 성공 여부 반환 (용량 초과·사생활 보호 모드 등에서 false) */
function write(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

function newId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

/** 로컬 기준 YYYY-MM-DD */
export function todayKey(d: Date = new Date()): string {
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

// ---------- User ----------
export function getUser(): User | null {
  return read<User | null>(KEYS.user, null)
}

export function saveUser(user: User): boolean {
  return write(KEYS.user, user)
}

// ---------- CheckIn ----------
export function listCheckIns(): CheckIn[] {
  return read<CheckIn[]>(KEYS.checkIns, [])
}

export function addCheckIn(emotion: Emotion, memo: string): CheckIn {
  const checkIn: CheckIn = {
    id: newId('c'),
    date: todayKey(),
    emotion,
    memo,
    createdAt: new Date().toISOString(),
  }
  write(KEYS.checkIns, [...listCheckIns(), checkIn])
  return checkIn
}

/** 오늘 가장 최근 체크인 (없으면 null) */
export function getTodayCheckIn(): CheckIn | null {
  const today = todayKey()
  const list = listCheckIns().filter((c) => c.date === today)
  return list.length ? list[list.length - 1] : null
}

// ---------- Mission ----------
export function listMissions(week: number = CURRENT_WEEK): Mission[] {
  return MISSIONS.filter((m) => m.week === week)
}

export function getMission(id: string): Mission | undefined {
  return MISSIONS.find((m) => m.id === id)
}

// ---------- MissionLog ----------
export function listMissionLogs(): MissionLog[] {
  return read<MissionLog[]>(KEYS.missionLogs, [])
}

/** 기록 저장 + 식물 포인트 +1. 사진 때문에 저장이 실패하면 사진 없이 다시 저장 */
export function addMissionLog(input: Omit<MissionLog, 'id' | 'completedAt'>): MissionLog {
  let log: MissionLog = { ...input, id: newId('l'), completedAt: new Date().toISOString() }
  const logs = listMissionLogs()
  if (!write(KEYS.missionLogs, [...logs, log])) {
    log = { ...log, photo: null }
    write(KEYS.missionLogs, [...logs, log])
  }
  write(KEYS.plantPoints, getPlant().points + 1)
  return log
}

// ---------- Plant ----------
export function getPlant(): Plant {
  const points = read<number>(KEYS.plantPoints, 0)
  return { points, stage: stageFromPoints(points) }
}

// ---------- Post (커뮤니티) ----------
export function listPosts(): Post[] {
  const mine = read<Omit<Post, 'empathizedByMe'>[]>(KEYS.posts, [])
  const empathy = read<Record<string, boolean>>(KEYS.empathy, {})
  return [...mine, ...MOCK_POSTS]
    .map((p) => ({
      ...p,
      empathizedByMe: !!empathy[p.id],
      empathyCount: p.empathyCount + (empathy[p.id] ? 1 : 0),
    }))
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
}

export function addPost(log: MissionLog, author: string, missionTitle: string): void {
  const mine = read<Omit<Post, 'empathizedByMe'>[]>(KEYS.posts, [])
  const post: Omit<Post, 'empathizedByMe'> = {
    id: newId('p'),
    missionLogId: log.id,
    author,
    missionTitle,
    emotionAfter: log.emotionAfter,
    memo: log.memo,
    photo: log.photo,
    createdAt: log.completedAt,
    empathyCount: 0,
  }
  if (!write(KEYS.posts, [post, ...mine])) {
    write(KEYS.posts, [{ ...post, photo: null }, ...mine])
  }
}

/** 공감 켜기/끄기 (1인 1공감) */
export function toggleEmpathy(postId: string): void {
  const empathy = read<Record<string, boolean>>(KEYS.empathy, {})
  if (empathy[postId]) delete empathy[postId]
  else empathy[postId] = true
  write(KEYS.empathy, empathy)
}

// ---------- 초기화 ----------
export function resetAll(): void {
  try {
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k))
  } catch {
    // 저장소 접근 불가 시 무시
  }
}
