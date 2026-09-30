// TODO(디자인): 감정 아이콘·색 표현, 입력 후 짧은 피드백 연출
// TODO(개발): 하루 여러 번 체크인 허용 여부 정책 결정(현재는 누적 저장, 가장 최근 것을 "오늘"로 사용)
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import EmotionPicker from '../components/EmotionPicker'
import PageHeader from '../components/PageHeader'
import { addCheckIn } from '../data/store'
import type { Emotion } from '../data/types'

export default function CheckIn() {
  const navigate = useNavigate()
  const [emotion, setEmotion] = useState<Emotion | null>(null)
  const [memo, setMemo] = useState('')

  const save = () => {
    if (!emotion) return
    addCheckIn(emotion, memo.trim())
    navigate('/missions')
  }

  return (
    <div>
      <PageHeader title="오늘의 상태" back />
      <div className="flex flex-col gap-6 p-4">
        <p className="text-base">지금 마음에 가장 가까운 것을 골라주세요.</p>
        <EmotionPicker value={emotion} onChange={setEmotion} />
        <input
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="한 줄 메모 (선택)"
          maxLength={60}
          className="rounded-button border border-line bg-surface px-3 py-3"
        />
        <Button full disabled={!emotion} onClick={save}>
          저장하고 미션 보기
        </Button>
      </div>
    </div>
  )
}
