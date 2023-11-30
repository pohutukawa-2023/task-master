import { Outlet } from 'react-router-dom'

import Nav from './Nav.tsx'
import Button from './UI/Button/Button.tsx'

export default function AppLayout() {
  return (
    <>
      <Nav />
      <main className="font-sans">
        <Outlet />
        <h1 className=" font-serif font-semibold text-lg">Hello World</h1>
      </main>
    </>
  )
}
