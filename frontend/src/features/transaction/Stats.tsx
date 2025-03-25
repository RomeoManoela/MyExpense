import React from 'react'
import { UserState } from '../../utils/type.ts'

function Stats({
  budget,
}: {
  budget: UserState['budget']
}): React.ReactElement {
  const { solde, depense, budget: budgetAmount } = budget
  return (
    <div className='space-y-6 p-1'>
      <h2 className='text-sm font-semibold text-[#504B38]'>
        <div className='mb-1 flex items-center'>
          <svg
            className='mr-1 h-4 w-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3'
            />
          </svg>
          Solde
        </div>
        <span className='block text-2xl font-bold text-[#504B38]'>
          {solde} Ar
        </span>
      </h2>
      <h2 className='text-sm font-semibold text-[#504B38]'>
        <div className='mb-1 flex items-center'>
          <svg
            className='mr-1 h-4 w-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'
            />
          </svg>
          Total des dépenses
        </div>
        <span className='block text-2xl font-bold text-[#504B38]'>
          {depense} Ar
        </span>
      </h2>

      <h2 className='text-sm font-semibold text-[#504B38]'>
        <div className='mb-1 flex items-center'>
          <svg
            className='mr-1 h-4 w-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          Total des revenus
        </div>
        <span className='block text-2xl font-bold text-[#504B38]'>
          {budgetAmount} Ar
        </span>
      </h2>
    </div>
  )
}

export default Stats
