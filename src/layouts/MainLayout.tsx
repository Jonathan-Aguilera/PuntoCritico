import { Outlet } from 'react-router'
import Header from '../components/ui/Header'

export default function MainLayout() {
  return (
    <div className="h-dvh w-full flex flex-col bg-slate-950 overflow-hidden">
      <Header />
      <main className="flex-1 relative overflow-hidden w-full">
        <Outlet />
      </main>
    </div>
  )
}