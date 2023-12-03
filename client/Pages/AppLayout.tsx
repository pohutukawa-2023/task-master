import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  )
}
