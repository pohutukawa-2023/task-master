import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav'

export default function AppLayout() {
  return (
    <>
      <div>
        <Nav />
      </div>
      <main>
        <Outlet />
      </main>
    </>
  )
}
