// TODO(디자인): 식물 성장 일러스트·애니메이션, 성장 축하 연출(현재는 텍스트 배너)
// TODO(개발): 게임 요소(보상·배지 등), 오늘의 추천 미션 미리보기
import { Link, useLocation } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import PlantView from '../components/PlantView'
import { emotionEmoji } from '../data/emotions'
import { stageFromPoints } from '../data/plant'
import { getPlant, getTodayCheckIn, getUser } from '../data/store'

interface GrowState {
  grown?: { before: number; after: number }
}

export default function Home() {
  const user = getUser()
  const plant = getPlant()
  const todayCheckIn = getTodayCheckIn()
  const grown = (useLocation().state as GrowState | null)?.grown
  const stageChanged = grown && stageFromPoints(grown.before) !== stageFromPoints(grown.after)

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="pt-2 text-xl font-bold">{user?.nickname}님의 식물</h1>

      {grown && (
        <div className="rounded-card bg-accent/30 p-3 text-center font-semibold">
          {stageChanged ? `식물이 자랐어요! 이제 "${stageFromPoints(grown.after)}" 단계예요 🎉` : '식물이 자랐어요! 포인트 +1'}
        </div>
      )}

      <PlantView points={plant.points} />

      <Card className="flex flex-col gap-3">
        {todayCheckIn ? (
          <>
            <div className="text-sm text-muted">오늘의 상태 확인 완료</div>
            <div className="text-base">
              {emotionEmoji(todayCheckIn.emotion)} {todayCheckIn.memo || '메모 없음'}
            </div>
            <Link to="/missions">
              <Button full variant="secondary">
                이번 주 미션 보러 가기
              </Button>
            </Link>
          </>
        ) : (
          <>
            <div className="text-base">오늘 마음은 어떤가요?</div>
            <Link to="/checkin">
              <Button full>오늘의 상태 확인하기</Button>
            </Link>
          </>
        )}
      </Card>
    </div>
  )
}
