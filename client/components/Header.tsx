import Logo from './UI/Logo/Logo'

// Note - will need to props drill the title
interface Props {
  title: string
}

function Header({ title }: Props) {
  return (
    <>
      <div className="flex justify-between font-title text-lg">
        <h2 className="text-darkPurple font-title pt-12 pb-6 text-6xl">
          {title}
        </h2>
        <Logo>
          <img src="/t.svg" alt="Logo for Task Masters" />
        </Logo>
      </div>
    </>
  )
}

export default Header
