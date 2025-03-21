import React from 'react'
import { useLoaderData } from 'react-router-dom'
import AddTransaction from '../transaction/AddTransaction.tsx'
import Stats from '../transaction/Stats.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store.ts'
import { TransactionType } from '../../utils/type.ts'
import { fetchTransactions } from '../transaction/transactionSlice.ts'

function Dashboard(): React.ReactElement {
  const username: string = useLoaderData() as string
  const dispatch = useDispatch()
  const transactions: TransactionType[] = useSelector(
    (state: RootState) => state.transactions.transactions,
  )

  React.useEffect(() => {
    if (transactions.length === 0) {
      dispatch(fetchTransactions())
    }
  }, [dispatch, transactions.length])

  return (
    <div
      className={
        'relative m-2 mx-auto grid w-[95%] grid-cols-3 gap-3 rounded-md bg-[#3A3828] p-8'
      }
    >
      <h1
        className={
          'absolute right-4 top-1 inline-block rounded bg-[#EBE5C2] px-1' +
          ' font-bold text-stone-800'
        }
      >
        {username}
      </h1>
      <div className={'col-span-2'}>
        <div className={'grid grid-cols-2 gap-1'}>
          <div className='rounded-md bg-[#EBE5C2] p-4 text-sm shadow-md'>
            <AddTransaction />
          </div>
          <div className={'rounded-md bg-[#EBE5C2] p-4 text-sm shadow-md'}>
            <Stats />
          </div>
        </div>
      </div>
      <div className='max-h-[500px] overflow-auto rounded-md bg-[#EBE5C2] p-4 text-sm shadow-md'>
        <h1 className='mb-3 font-bold text-[#504B38]'>
          Historique des transactions
        </h1>

        {transactions.length === 0 ? (
          <p className='text-center italic text-gray-500'>Aucune transaction</p>
        ) : (
          <ul className='space-y-2'>
            {transactions.map((transaction) => (
              <li
                key={transaction.id}
                className='rounded-r-md border-l-4 border-[#B9B28A] bg-[#F5F2E3] p-2'
              >
                <div className='flex items-center justify-between'>
                  <span
                    className={`font-medium ${transaction.type === 'revenu' ? 'text-green-700' : 'text-red-700'}`}
                  >
                    {transaction.type === 'revenu' ? '+' : '-'}{' '}
                    {transaction.montant} MGA
                  </span>
                  <span className='text-xs text-gray-500'>
                    {new Date(transaction.date).toLocaleDateString()}
                  </span>
                </div>
                <div className='mt-1 flex justify-between'>
                  <span className='rounded bg-[#B9B28A] px-1 text-xs text-[#3A3828]'>
                    {transaction.categorie}
                  </span>
                  {transaction.description && (
                    <span className='max-w-[70%] truncate text-xs italic text-gray-600'>
                      {transaction.description}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Dashboard
