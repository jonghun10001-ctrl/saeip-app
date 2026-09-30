import { Outlet } from 'react-router-dom'
import BottomTabBar from './BottomTabBar'

/** 모바일 화면 틀: 가운데 정렬, 최대 폭 430px, 하단 탭 공간 확보 */
export default function Layout({ showTabs = true }: { showTabs?: boolean }) {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-bg">
      <main className={showTabs ? 'pb-24' : ''}>
        <Outlet />
      </main>
      {showTabs && <BottomTabBar />}
    </div>
  )
}
