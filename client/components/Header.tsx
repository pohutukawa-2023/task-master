import Logo from './UI/Logo/Logo'

// Note - will need to props drill the title

function Header() {
  return (
    <>
      <div className="flex justify-between p-6 font-title text-lg">
        <h2 className="text-darkPurple font-title pt-8 text-6xl">Tasks</h2>
        <Logo>
          <img src="t.svg" alt="Logo for Task Masters" />
        </Logo>
      </div>
    </>
  )
}

export default Header
