import { Route, createRoutesFromElements } from 'react-router-dom'

import AppLayout from './Pages/AppLayout.tsx'
import Profile from './Pages/Profile.tsx'
import Home from './Pages/Home.tsx'
import AdminClientlist from './Pages/AdminClientlist/AdminClientlist.tsx'
import ProtectedComponent from './components/UI/ProtectedComponent.tsx'
import AdminClientTasks from './Pages/AdminClientTask.tsx'
import TestLayout from './Pages/TestLayout.tsx'
import AddClientTask from './Pages/AddClientTask.tsx'

export const routes = createRoutesFromElements(
  <Route path="/" element={<AppLayout />}>
    <Route index element={<Home />} />
    <Route
      path="/profile"
      element={<ProtectedComponent component={Profile} />}
    />
    <Route path="/admin/clientlist" element={<AdminClientlist />} />
    <Route path="/admin/:clientUsername/tasks" element={<AdminClientTasks />} />
    <Route path="/admin/addTask" element={<AddClientTask />} />
    <Route path="/test" element={<TestLayout />} />
  </Route>
)
