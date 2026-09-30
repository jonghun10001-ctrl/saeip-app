import { useNavigate } from 'react-router-dom'

interface Props {
  title: string
  back?: boolean
}

export default function PageHeader({ title, back = false }: Props) {
  const navigate = useNavigate()
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-2 border-b border-line bg-bg px-4">
      {back && (
        <button onClick={() => navigate(-1)} className="text-xl text-muted" aria-label="뒤로">
          ←
        </button>
      )}
      <h1 className="text-lg font-bold">{title}</h1>
    </header>
  )
}
