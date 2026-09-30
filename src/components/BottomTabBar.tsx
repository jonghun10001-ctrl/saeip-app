import { NavLink } from 'react-router-dom'

const TABS = [
  { to: '/', label: '홈', icon: '🏠', end: true },
  { to: '/missions', label: '미션', icon: '🌱', end: false },
  { to: '/journal', label: '기록', icon: '📔', end: false },
  { to: '/community', label: '커뮤니티', icon: '💬', end: false },
  { to: '/me', label: '마이', icon: '👤', end: false },
]

export default function BottomTabBar() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-20 grid w-full max-w-[430px] -translate-x-1/2 grid-cols-5 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)]">
      {TABS.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          end={t.end}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 py-2 text-xs ${isActive ? 'font-bold text-primary' : 'text-muted'}`
          }
        >
          <span className="text-xl" aria-hidden>
            {t.icon}
          </span>
          {t.label}
        </NavLink>
      ))}
    </nav>
  )
}
