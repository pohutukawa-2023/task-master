import { Route, createRoutesFromElements } from 'react-router-dom'

import AppLayout from './Pages/AppLayout.tsx'
import Profile from './Pages/Profile.tsx'
import Home from './Pages/Home.tsx'
import AdminClientlist from './Pages/AdminClientlist/AdminClientlist.tsx'
import ProtectedComponent from './components/UI/ProtectedComponent.tsx'
import AdminClientTasks from './Pages/AdminClientTask.tsx'
import TestLayout from './Pages/TestLayout.tsx'
import ClientTasks from './Pages/ClientTasks.tsx'

import AddClientTask from './Pages/AddClientTask.tsx'
import ClientLayout from './Pages/ClientLayout.tsx'
import AdminLayout from './Pages/AdminLayout.tsx'
import ClientStats from './Pages/ClientStats.tsx'
import { GraphPage } from './components/GraphPage.tsx'

export const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Home />} />
      <Route
        path="/profile"
        element={<ProtectedComponent component={Profile} />}
      />
    </Route>
    <Route path="/client" element={<ClientLayout />}>
      <Route index element={<Home />} />
      <Route path=":clientId/stats" element={<ClientStats />} />
    </Route>
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<Home />} />
      <Route
        path="clientlist"
        element={<ProtectedComponent component={AdminClientlist} />}
      />
      <Route
        path=":clientUsername/tasks"
        element={<ProtectedComponent component={AdminClientTasks} />}
      />
      <Route path="addTask" element={<AddClientTask />} />
      <Route path="addTask/:clientId" element={<AddClientTask />} />
      <Route path=":clientId/stats" element={<ClientStats />} />
    </Route>
    <Route path="/test" element={<TestLayout />} />
  </>
)
