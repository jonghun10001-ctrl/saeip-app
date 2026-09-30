// TODO(디자인): 미션 상세 일러스트, 진행 중 화면(타이머·가이드 등) 연출
// TODO(개발): 진행 상태 저장(현재는 화면 안에서만 기억), 미션별 가이드 콘텐츠
import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import PageHeader from '../components/PageHeader'
import { getMission } from '../data/store'

export default function MissionDetail() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const [started, setStarted] = useState(false)
  const mission = getMission(id)

  if (!mission) return <Navigate to="/missions" replace />

  return (
    <div>
      <PageHeader title={mission.title} back />
      <div className="flex flex-col gap-4 p-4">
        <span className="w-fit rounded-pill bg-primary-soft px-3 py-1 text-sm text-primary">{mission.category}</span>
        <Card>
          <p className="leading-relaxed">{mission.description}</p>
        </Card>
        {started ? (
          <>
            <p className="text-center text-sm text-muted">천천히 해도 괜찮아요.</p>
            <Button full onClick={() => navigate(`/missions/${mission.id}/done`)}>
              완료했어요
            </Button>
          </>
        ) : (
          <Button full onClick={() => setStarted(true)}>
            시작
          </Button>
        )}
      </div>
    </div>
  )
}
