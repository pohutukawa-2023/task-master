import { Outlet } from 'react-router-dom'

import Nav from './Nav.tsx'
import Button from './UI/Button/Button.tsx'

export default function AppLayout() {
  return (
    <>
      <Nav />
      <main>
        <Button>Save</Button>
        <Outlet />
        <h1 className="bg-black">Hello World</h1>
      </main>
    </>
  )
}
