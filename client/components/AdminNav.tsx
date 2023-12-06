import { IfAdmin } from './Authenticated.tsx'
import NavButton from './UI/NavButton/NavButton.tsx'

function AdminNav() {
  return (
    <>
      <IfAdmin>
        <div className="bg-primaryBeige py-4 w-full md:w-fit flex justify-around fixed inset-x-0 bottom-0">
          <NavButton link="/profile">
            <img src={`/images/png/007-user-1.png`} alt="profile user icon" />
          </NavButton>
          <NavButton link="/admin/clientlist">
            <img src={`/images/png/013-task-1.png`} alt="add client icon" />
          </NavButton>
          <NavButton link="/admin/addTask">
            <img src={`/images/png/019-add.png`} alt="add task icon" />
          </NavButton>
          <NavButton link={`/admin/stats`}>
            <img src={`/images/png/001-bar-chart.png`} alt="stats icon" />
          </NavButton>
        </div>
      </IfAdmin>
    </>
  )
}

export default AdminNav
