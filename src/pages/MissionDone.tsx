// TODO(디자인): 인증 화면 레이아웃, 사진 미리보기 틀, 완료 축하 연출
// TODO(개발): 사진 원본 업로드(스토리지 연결), 공유 범위 선택(전체/워크숍 참여자만 등)
import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import EmotionPicker from '../components/EmotionPicker'
import PageHeader from '../components/PageHeader'
import { addMissionLog, addPost, getMission, getPlant, getTodayCheckIn, getUser } from '../data/store'
import type { Emotion } from '../data/types'

const MAX_PHOTO_CHARS = 150_000 // 약 110KB. 넘으면 사진은 저장하지 않음 (localStorage 용량 보호)

/** 사진을 짧은 변 기준으로 줄여 작은 JPEG data URL 로 변환. 실패하면 null */
function shrinkPhoto(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, 320 / Math.max(img.width, img.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)
      canvas.getContext('2d')?.drawImage(img, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(url)
      const data = canvas.toDataURL('image/jpeg', 0.6)
      resolve(data.length <= MAX_PHOTO_CHARS ? data : null)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      resolve(null)
    }
    img.src = url
  })
}

export default function MissionDone() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const mission = getMission(id)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [emotionAfter, setEmotionAfter] = useState<Emotion | null>(null)
  const [memo, setMemo] = useState('')
  const [share, setShare] = useState(false)
  const [saving, setSaving] = useState(false)

  // 새 사진을 고르면 이전 미리보기 URL 은 해제
  const pickFile = (f: File | null) => {
    if (preview) URL.revokeObjectURL(preview)
    setFile(f)
    setPreview(f ? URL.createObjectURL(f) : null)
  }

  if (!mission) return <Navigate to="/missions" replace />

  const save = async () => {
    if (!emotionAfter || saving) return
    setSaving(true)
    const photo = file ? await shrinkPhoto(file) : null
    const before = getPlant().points
    const log = addMissionLog({
      missionId: mission.id,
      emotionBefore: getTodayCheckIn()?.emotion ?? null,
      emotionAfter,
      photo,
      memo: memo.trim(),
    })
    if (share) addPost(log, getUser()?.nickname ?? '익명', mission.title)
    navigate('/', { replace: true, state: { grown: { before, after: getPlant().points } } })
  }

  return (
    <div>
      <PageHeader title="활동 기록하기" back />
      <div className="flex flex-col gap-6 p-4">
        <div className="font-semibold">{mission.title}</div>

        <label className="flex flex-col gap-2">
          <span className="font-semibold">사진 (선택)</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
            className="w-full text-sm"
          />
          {preview && <img src={preview} alt="첨부한 사진 미리보기" className="max-h-64 w-full rounded-card object-cover" />}
        </label>

        <div className="flex flex-col gap-2">
          <span className="font-semibold">해보고 난 지금 마음은 어떤가요?</span>
          <EmotionPicker value={emotionAfter} onChange={setEmotionAfter} />
        </div>

        <input
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="한 줄 메모 (선택)"
          maxLength={80}
          className="rounded-button border border-line bg-surface px-3 py-3"
        />

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={share} onChange={(e) => setShare(e.target.checked)} className="size-5" />
          <span>커뮤니티에 공유</span>
        </label>

        <Button full disabled={!emotionAfter || saving} onClick={save}>
          기록 저장
        </Button>
      </div>
    </div>
  )
}
