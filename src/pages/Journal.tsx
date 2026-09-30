// TODO(디자인): 달력·그래프 등 감정 변화 시각화 (현재는 날짜별 목록)
// TODO(개발): 기간 필터, 기록 수정·삭제
import Card from '../components/Card'
import PageHeader from '../components/PageHeader'
import { emotionEmoji } from '../data/emotions'
import { getMission, listCheckIns, listMissionLogs, todayKey } from '../data/store'

type Entry =
  | { kind: 'checkin'; at: string; text: string }
  | { kind: 'mission'; at: string; text: string }

export default function Journal() {
  const entries: Entry[] = [
    ...listCheckIns().map((c) => ({
      kind: 'checkin' as const,
      at: c.createdAt,
      text: `${emotionEmoji(c.emotion)} 오늘의 상태${c.memo ? ` · ${c.memo}` : ''}`,
    })),
    ...listMissionLogs().map((l) => ({
      kind: 'mission' as const,
      at: l.completedAt,
      text: `${getMission(l.missionId)?.title ?? '미션'} · ${emotionEmoji(l.emotionBefore)} → ${emotionEmoji(l.emotionAfter)}${
        l.memo ? ` · ${l.memo}` : ''
      }`,
    })),
  ].sort((a, b) => Date.parse(b.at) - Date.parse(a.at))

  // 날짜별 묶기 (최신 날짜 먼저)
  const byDate = new Map<string, Entry[]>()
  for (const e of entries) {
    const key = todayKey(new Date(e.at))
    byDate.set(key, [...(byDate.get(key) ?? []), e])
  }

  return (
    <div>
      <PageHeader title="기록" />
      <div className="flex flex-col gap-4 p-4">
        {byDate.size === 0 && <p className="text-center text-muted">아직 기록이 없어요.</p>}
        {[...byDate].map(([date, list]) => (
          <section key={date} className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold text-muted">{date}</h2>
            {list.map((e, i) => (
              <Card key={i} className="text-sm">
                <span className="mr-2 text-xs text-muted">{e.kind === 'checkin' ? '상태' : '미션'}</span>
                {e.text}
              </Card>
            ))}
          </section>
        ))}
      </div>
    </div>
  )
}
