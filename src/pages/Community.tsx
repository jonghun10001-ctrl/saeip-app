// TODO(디자인): 피드 카드(사진 비율·감정 표현), 공감 버튼 모양·반응 연출
// TODO(개발): 서버 피드 연결, 신고·숨김 등 안전장치. 댓글은 "개입 최소" 원칙상 일부러 없음
import { useState } from 'react'
import Card from '../components/Card'
import PageHeader from '../components/PageHeader'
import { emotionEmoji } from '../data/emotions'
import { listPosts, toggleEmpathy } from '../data/store'

export default function Community() {
  const [posts, setPosts] = useState(listPosts)

  const onEmpathy = (id: string) => {
    toggleEmpathy(id)
    setPosts(listPosts())
  }

  return (
    <div>
      <PageHeader title="커뮤니티" />
      <div className="flex flex-col gap-3 p-4">
        {posts.map((p) => (
          <Card key={p.id} className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold">{p.author}</span>
              <span className="text-muted">{new Date(p.createdAt).toLocaleDateString('ko-KR')}</span>
            </div>
            <div className="text-sm text-primary">{p.missionTitle}</div>
            {p.photo && <img src={p.photo} alt="" className="w-full rounded-card object-cover" />}
            <div>
              {emotionEmoji(p.emotionAfter)} {p.memo}
            </div>
            <button
              onClick={() => onEmpathy(p.id)}
              aria-pressed={p.empathizedByMe}
              className={`w-fit rounded-pill border px-3 py-1 text-sm ${
                p.empathizedByMe ? 'border-primary bg-primary-soft text-primary' : 'border-line text-muted'
              }`}
            >
              공감 {p.empathyCount}
            </button>
          </Card>
        ))}
      </div>
    </div>
  )
}
