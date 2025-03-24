import { Link } from 'react-router-dom'

function Logo() {
  return (
    <div className={'inline-block rounded bg-[#EBE5C2] text-[#504B38]'}>
      <Link to={'/'} className={'text-xl tracking-widest md:tracking-[0.4rem]'}>
        r-ExpenseTracker
      </Link>
    </div>
  )
}

export default Logo
