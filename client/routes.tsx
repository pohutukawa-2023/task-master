import { Route, createRoutesFromElements } from 'react-router-dom'

import AppLayout from './Pages/AppLayout.tsx'
import Profile from './Pages/Profile.tsx'
import Home from './Pages/Home.tsx'
import AdminClientlist from './Pages/AdminClientlist/AdminClientlist.tsx'

export const routes = createRoutesFromElements(
  <Route path="/" element={<AppLayout />}>
    <Route index element={<Home />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/admin/clientlist" element={<AdminClientlist />} />
  </Route>
)
