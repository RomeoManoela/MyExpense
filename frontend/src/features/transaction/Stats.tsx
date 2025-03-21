import React from 'react'

function Stats(): React.ReactElement {
  return (
    <div className={'space-y-4'}>
      <h2 className='mb-2 text-sm font-semibold text-[#504B38]'>
        Total des dépenses <br />
        <span className='text-2xl font-bold text-[#504B38]'>1000 Ar</span>
      </h2>
      <h2>
        Total des revenus <br />
        <span className='text-2xl font-bold text-[#504B38]'>1000 Ar</span>
      </h2>
      <h2>
        Solde <br />
        <span className='text-2xl font-bold text-[#504B38]'>1000 Ar</span>
      </h2>
    </div>
  )
}

export default Stats
