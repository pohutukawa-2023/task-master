import { Outlet } from 'react-router-dom'

import Nav from './Nav.tsx'
import Task from './UI/Task/Task.tsx'
import Textbox from './UI/Textbox/Textbox.tsx'
import Logo from './UI/Logo/Logo.tsx'
import Button from './UI/Button/Button.tsx'

export default function AppLayout() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
        {/* <Button>Stuff</Button>
        <Logo />
        <Task>More Stuff</Task>
        <Textbox /> */}
      </main>
    </>
  )
}
