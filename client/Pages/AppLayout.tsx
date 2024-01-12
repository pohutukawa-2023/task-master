import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <>
      <main className="sm:h-[844px] sm:w-[390px] bg-primaryBeige">
        <Outlet />
      </main>
    </>
  )
}
