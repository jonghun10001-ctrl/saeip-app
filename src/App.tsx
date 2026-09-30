import type { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { getUser } from './data/store'
import Admin from './pages/Admin'
import CheckIn from './pages/CheckIn'
import Community from './pages/Community'
import Home from './pages/Home'
import Journal from './pages/Journal'
import Me from './pages/Me'
import MissionDetail from './pages/MissionDetail'
import MissionDone from './pages/MissionDone'
import Missions from './pages/Missions'
import Onboarding from './pages/Onboarding'

/** 저장된 사용자가 없으면 어디서든 온보딩으로 */
function RequireUser({ children }: { children: ReactNode }) {
  return getUser() ? children : <Navigate to="/onboarding" replace />
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout showTabs={false} />}>
        <Route path="/onboarding" element={<Onboarding />} />
      </Route>
      <Route
        element={
          <RequireUser>
            <Layout />
          </RequireUser>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/checkin" element={<CheckIn />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/missions/:id" element={<MissionDetail />} />
        <Route path="/missions/:id/done" element={<MissionDone />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/community" element={<Community />} />
        <Route path="/me" element={<Me />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
