import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <>
      <main className="h-[844px] w-[390px] bg-primaryBeige">
        <Outlet />
      </main>
    </>
  )
}
