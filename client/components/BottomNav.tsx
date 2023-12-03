import { IfAdmin, IfNotAdmin } from './Authenticated.tsx'
import NavButton from './UI/NavButton/NavButton.tsx'
import { Link } from 'react-router-dom'

function BottomNav() {
  return (
    <>
      <IfNotAdmin>
        <div className="my-4 w-full md:w-fit flex justify-around absolute inset-x-0 bottom-0">
          <Link to="/profile">
            <NavButton>
              <img
                src={`./images/png/007-user-1.png`}
                alt="profile user icon"
              />
            </NavButton>
          </Link>
          <Link to="/test">
            <NavButton>
              <img src={`./images/png/013-task-1.png`} alt="tasks icon" />
            </NavButton>
          </Link>
          <Link to="/test">
            <NavButton>
              <img src={`./images/png/001-bar-chart.png`} alt="stats icon" />
            </NavButton>
          </Link>
        </div>
      </IfNotAdmin>

      <IfAdmin>
        <div className="my-6 w-full md:w-fit flex justify-around absolute inset-x-0 bottom-0">
          <Link to="/profile">
            <NavButton>
              <img
                src={`./images/png/007-user-1.png`}
                alt="profile user icon"
              />
            </NavButton>
          </Link>
          <Link to="/test">
            <NavButton>
              <img src={`./images/png/019-add.png`} alt="add client icon" />
            </NavButton>
          </Link>
          <Link to="/test">
            <NavButton>
              <img src={`./images/png/013-task-1.png`} alt="add task icon" />
            </NavButton>
          </Link>
          <Link to="/test">
            <NavButton>
              <img src={`./images/png/001-bar-chart.png`} alt="stats icon" />
            </NavButton>
          </Link>
        </div>
      </IfAdmin>
    </>
  )
}

export default BottomNav
