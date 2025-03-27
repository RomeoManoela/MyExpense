import React from 'react'
import { UserState } from '../../utils/type.ts'

function Stats({
  budget,
}: {
  budget: UserState['budget']
}): React.ReactElement {
  return (
    <div className='space-y-2'>
      <div className='rounded-md bg-[#F5F2E3] p-2'>
        <div className='flex items-center justify-between'>
          <span className='text-sm font-medium text-[#504B38]'>
            Budget total:
          </span>
          <span className='font-bold text-[#504B38]'>
            {budget?.budget || 0} MGA
          </span>
        </div>
      </div>

      <div className='rounded-md bg-[#F5F2E3] p-2'>
        <div className='flex items-center justify-between'>
          <span className='text-sm font-medium text-[#504B38]'>Dépenses:</span>
          <span className='font-bold text-red-700'>
            {budget?.depense || 0} MGA
          </span>
        </div>
      </div>

      <div className='rounded-md bg-[#F5F2E3] p-2'>
        <div className='flex items-center justify-between'>
          <span className='text-sm font-medium text-[#504B38]'>
            Solde actuel:
          </span>
          <span className='font-bold text-green-700'>
            {budget?.solde || 0} MGA
          </span>
        </div>
      </div>

      {/* Barre de progression */}
      <div className='mt-3'>
        <div className='h-2 w-full overflow-hidden rounded-full bg-gray-200'>
          <div
            className='h-full bg-green-600'
            style={{
              width: `${budget?.solde && budget?.budget ? (budget.solde / budget.budget) * 100 : 0}%`,
            }}
          ></div>
        </div>
        <div className='mt-1 flex justify-between text-xs text-[#504B38]'>
          <span>0%</span>
          <span>
            Utilisation du budget:{' '}
            {budget?.solde && budget?.budget
              ? ((budget.solde / budget.budget) * 100).toFixed(1)
              : 0}
            %
          </span>
          <span>100%</span>
        </div>
      </div>
    </div>
  )
}

export default Stats
