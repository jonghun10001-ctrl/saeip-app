// TODO(디자인): 설정 화면 레이아웃, 동의 안내 문구 다듬기
// TODO(개발): 동의 철회 시 서버 데이터 처리, 닉네임 변경, 계정 연결
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import PageHeader from '../components/PageHeader'
import { ACTIVITIES } from '../data/mockData'
import { getUser, resetAll, saveUser } from '../data/store'
import type { Activity, User } from '../data/types'

export default function Me() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(getUser)

  if (!user) return null

  const update = (next: User) => {
    saveUser(next)
    setUser(next)
  }

  const toggleActivity = (a: Activity) =>
    update({
      ...user,
      preferredActivities: user.preferredActivities.includes(a)
        ? user.preferredActivities.filter((x) => x !== a)
        : [...user.preferredActivities, a],
    })

  const reset = () => {
    if (!confirm('모든 기록과 식물이 지워져요. 초기화할까요?')) return
    resetAll()
    navigate('/onboarding', { replace: true })
  }

  return (
    <div>
      <PageHeader title="마이" />
      <div className="flex flex-col gap-4 p-4">
        <Card>
          <div className="text-lg font-bold">{user.nickname}</div>
          <div className="text-sm text-muted">워크숍 코드: {user.workshopCode || '없음'}</div>
        </Card>

        <Card className="flex flex-col gap-2">
          <div className="font-semibold">선호 활동</div>
          <div className="flex flex-wrap gap-2">
            {ACTIVITIES.map((a) => (
              <button
                key={a}
                onClick={() => toggleActivity(a)}
                aria-pressed={user.preferredActivities.includes(a)}
                className={`rounded-pill border px-4 py-2 ${
                  user.preferredActivities.includes(a)
                    ? 'border-primary bg-primary text-on-primary'
                    : 'border-line bg-surface'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <label className="flex items-center justify-between gap-3">
            <span>
              <span className="block font-semibold">데이터 공유 동의</span>
              <span className="text-sm text-muted">감정 변화·참여 기록을 그린테라피가 프로그램 개선에 활용해요</span>
            </span>
            <input
              type="checkbox"
              checked={user.shareConsent}
              onChange={(e) => update({ ...user, shareConsent: e.target.checked })}
              className="size-6 shrink-0"
            />
          </label>
        </Card>

        <Link to="/admin" className="text-center text-sm text-muted underline">
          운영자 화면 (사회혁신가용)
        </Link>

        <Button variant="ghost" full onClick={reset} className="text-danger">
          데이터 초기화
        </Button>
      </div>
    </div>
  )
}
