import React from 'react'
import { useLoaderData } from 'react-router-dom'

function Dashboard(): React.ReactElement {
  const username: string = useLoaderData() as string
  return (
    <div className={'m-2'}>
      <h1
        className={
          'inline-block rounded bg-[#EBE5C2] px-1 font-bold text-stone-800'
        }
      >
        Salut {username}
      </h1>
    </div>
  )
}

export default Dashboard
