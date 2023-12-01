import Button from '../components/UI/Button/Button'
import Logo from '../components/UI/Logo/Logo'

function Home() {
  return (
    <>
      <div className="flex justify-end p-4 font-title text-lg">
        <Logo>t</Logo>
      </div>
      <div className="pt-title px-4 h-full">
        <h1 className="text-darkPurple text-bigTask">
          <span className="font-title text-bigTask font-semibold">task</span>{' '}
          master
        </h1>
        <p className="text-md text-darkNavy pt-5">
          get assigned important tasks.
        </p>
        <p className="text-md">complete, track, see results.</p>
      </div>

      <div className="flex gap-4 justify-center pt-[55%]">
        <Button>Login</Button>
        <Button>Register</Button>
      </div>
    </>
  )
}

export default Home
