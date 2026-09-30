// TODO(디자인): 미션 카드 디자인, 카테고리별 아이콘·색
// TODO(개발): 추천 로직 고도화(감정 상태·완료 이력 반영), 주차 전환, 완료 여부 표시 정책
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import PageHeader from '../components/PageHeader'
import { CURRENT_WEEK } from '../data/mockData'
import { getUser, listMissionLogs, listMissions } from '../data/store'
import type { Category } from '../data/types'

export default function Missions() {
  const preferred: Category[] = getUser()?.preferredActivities ?? []
  const doneIds = new Set(listMissionLogs().map((l) => l.missionId))
  // 선호 카테고리 미션을 앞으로 (같은 그룹 안에서는 원래 순서 유지)
  const missions = [...listMissions()].sort(
    (a, b) => Number(preferred.includes(b.category)) - Number(preferred.includes(a.category)),
  )

  return (
    <div>
      <PageHeader title={`${CURRENT_WEEK}주차 미션`} />
      <div className="flex flex-col gap-3 p-4">
        <p className="text-sm text-muted">마음이 가는 것 하나만 골라서 해볼까요?</p>
        {missions.map((m) => (
          <Link key={m.id} to={`/missions/${m.id}`}>
            <Card className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span className="rounded-pill bg-primary-soft px-2 py-0.5 text-primary">{m.category}</span>
                  {preferred.includes(m.category) && <span>추천</span>}
                  {doneIds.has(m.id) && <span>· 해봤어요</span>}
                </div>
                <div className="mt-1 font-semibold">{m.title}</div>
              </div>
              <span className="shrink-0 text-sm text-primary">해볼까요? →</span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
