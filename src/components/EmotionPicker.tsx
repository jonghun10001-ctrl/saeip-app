import { EMOTIONS } from '../data/emotions'
import type { Emotion } from '../data/types'

interface Props {
  value: Emotion | null
  onChange: (e: Emotion) => void
}

export default function EmotionPicker({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {EMOTIONS.map((e) => (
        <button
          key={e.value}
          type="button"
          onClick={() => onChange(e.value)}
          aria-pressed={value === e.value}
          className={`flex flex-col items-center gap-1 rounded-card border p-2 ${
            value === e.value ? 'border-primary bg-primary-soft' : 'border-line bg-surface'
          }`}
        >
          <span className="text-3xl">{e.emoji}</span>
          <span className="text-[11px] leading-tight text-muted">{e.label}</span>
        </button>
      ))}
    </div>
  )
}
