// TODO(디자인): 환영 일러스트, 단계별(닉네임 → 선호 활동 → 코드) 나눠진 화면 구성
// TODO(개발): 워크숍 코드 검증(현재는 아무 값이나 통과), 실제 로그인/계정 연결
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import PageHeader from '../components/PageHeader'
import { getUser, saveUser } from '../data/store'
import { ACTIVITIES } from '../data/mockData'
import type { Activity } from '../data/types'

export default function Onboarding() {
  const navigate = useNavigate()
  const [nickname, setNickname] = useState('')
  const [activities, setActivities] = useState<Activity[]>([])
  const [workshopCode, setWorkshopCode] = useState('')

  if (getUser()) return <Navigate to="/" replace />

  const toggle = (a: Activity) =>
    setActivities((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]))

  const submit = () => {
    saveUser({
      nickname: nickname.trim(),
      preferredActivities: activities,
      workshopCode: workshopCode.trim(),
      shareConsent: false,
      createdAt: new Date().toISOString(),
    })
    navigate('/', { replace: true })
  }

  return (
    <div>
      <PageHeader title="새 잎에 오신 걸 환영해요" />
      <div className="flex flex-col gap-6 p-4">
        <label className="flex flex-col gap-2">
          <span className="font-semibold">닉네임</span>
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="커뮤니티에 보일 이름"
            maxLength={12}
            className="rounded-button border border-line bg-surface px-3 py-3"
          />
        </label>

        <div className="flex flex-col gap-2">
          <span className="font-semibold">어떤 활동이 좋으세요? (여러 개 선택)</span>
          <div className="flex flex-wrap gap-2">
            {ACTIVITIES.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => toggle(a)}
                aria-pressed={activities.includes(a)}
                className={`rounded-pill border px-4 py-2 ${
                  activities.includes(a) ? 'border-primary bg-primary text-on-primary' : 'border-line bg-surface'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <label className="flex flex-col gap-2">
          <span className="font-semibold">워크숍 코드 (선택)</span>
          <input
            value={workshopCode}
            onChange={(e) => setWorkshopCode(e.target.value)}
            placeholder="예: GT-2026-10"
            className="rounded-button border border-line bg-surface px-3 py-3"
          />
        </label>

        <Button full disabled={!nickname.trim()} onClick={submit}>
          시작하기
        </Button>
      </div>
    </div>
  )
}
