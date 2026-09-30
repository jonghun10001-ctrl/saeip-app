// TODO(디자인): 운영자용 대시보드 레이아웃, 차트
// TODO(개발): 백엔드 연결 후 전체 참여자 집계(지속률·감정 변화), 운영자 권한 확인
import Card from '../components/Card'
import PageHeader from '../components/PageHeader'
import { getUser, listCheckIns, listMissionLogs } from '../data/store'

export default function Admin() {
  const user = getUser()
  const consented = !!user?.shareConsent
  const logs = consented ? listMissionLogs() : []
  const paired = logs.filter((l) => l.emotionBefore !== null)
  const avgChange = paired.length
    ? paired.reduce((sum, l) => sum + (l.emotionAfter - (l.emotionBefore ?? 0)), 0) / paired.length
    : null
  const activeDays = consented ? new Set(listCheckIns().map((c) => c.date)).size : 0

  return (
    <div>
      <PageHeader title="운영자 화면" back />
      <div className="flex flex-col gap-3 p-4">
        <div className="rounded-card bg-accent/30 p-3 text-sm">뼈대: 실제 집계는 백엔드 연결 후</div>
        <p className="text-sm text-muted">
          지금은 이 기기에 저장된 데이터만, 데이터 공유에 동의한 경우에만 보여줘요.
        </p>
        <Card className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-2xl font-bold">{consented ? 1 : 0}</div>
            <div className="text-xs text-muted">동의 참여자</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{logs.length}</div>
            <div className="text-xs text-muted">완료한 미션</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{activeDays}</div>
            <div className="text-xs text-muted">체크인한 날</div>
          </div>
        </Card>
        <Card>
          <div className="text-sm text-muted">활동 전후 평균 감정 변화</div>
          <div className="text-2xl font-bold">
            {avgChange === null ? '-' : `${avgChange > 0 ? '+' : ''}${avgChange.toFixed(1)}`}
          </div>
          <div className="text-xs text-muted">활동 전 체크인이 있는 기록 {paired.length}건 기준</div>
        </Card>
      </div>
    </div>
  )
}
