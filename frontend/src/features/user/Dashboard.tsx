import React from 'react'
import AddTransaction from '../transaction/AddTransaction.tsx'
import Stats from '../transaction/Stats.tsx'
import Charts from '../transaction/Charts.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store.ts'
import { TransactionType, UserState } from '../../utils/type.ts'
import { fetchTransactions } from '../transaction/transactionSlice.ts'
import { logout } from '../../services/apis.ts'

function Dashboard(): React.ReactElement {
  const userInfo: UserState = useSelector((state: RootState) => state.user)
  const { username, budget } = userInfo
  const dispatch: AppDispatch = useDispatch()
  const transactions: TransactionType[] = useSelector(
    (state: RootState) => state.transactions.transactions,
  )

  React.useEffect(() => {
    if (transactions.length === 0) {
      dispatch(fetchTransactions())
    }
  }, [dispatch, transactions.length, budget])

  return (
    <div className='container mx-auto px-3 py-4'>
      <div className='mb-4 flex items-center justify-between'>
        <h1 className='text-xl font-bold text-[#EBE5C2]'>Tableau de bord</h1>
        <button
          onClick={() => {
            if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
              logout().catch(() => {
                console.error('Erreur lors de la déconnexion')
              })
            }
          }}
          className='rounded-md bg-[#EBE5C2] px-3 py-1.5 font-bold text-stone-800 transition-all hover:bg-[#B9B28A] hover:text-stone-900'
        >
          {username} : se déconnecter ?
        </button>
      </div>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
        <div className='space-y-4 lg:col-span-2'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='rounded-md bg-[#EBE5C2] p-4 shadow'>
              <h2 className='mb-3 font-bold text-[#504B38]'>
                Nouvelle transaction
              </h2>
              <AddTransaction />
            </div>
            <div className='rounded-md bg-[#EBE5C2] p-4 shadow'>
              <h2 className='mb-3 font-bold text-[#504B38]'>
                Résumé financier
              </h2>
              <Stats budget={budget} />
            </div>
          </div>

          <div className='rounded-md bg-[#EBE5C2] p-4 shadow'>
            <h2 className='mb-3 font-bold text-[#504B38]'>Statistiques</h2>
            <Charts />
          </div>
        </div>

        <div className='rounded-md bg-[#EBE5C2] p-3 shadow'>
          <div className='mb-2 flex items-center justify-between'>
            <h2 className='font-bold text-[#504B38]'>Historique</h2>
            <span className='text-xs text-gray-600'>
              {transactions.length} transaction(s)
            </span>
          </div>

          <div className='max-h-[520px] overflow-y-auto pr-1'>
            {transactions.length === 0 ? (
              <p className='text-center text-xs italic text-gray-500'>
                Aucune transaction
              </p>
            ) : (
              <ul className='space-y-1.5'>
                {transactions.map((transaction) => (
                  <li
                    key={transaction.id}
                    className='border-l-3 rounded border-[#B9B28A] bg-[#F5F2E3] p-1.5 shadow-sm'
                  >
                    <div className='flex items-center justify-between'>
                      <span
                        className={`text-sm font-medium ${transaction.type === 'revenu' ? 'text-green-700' : 'text-red-700'}`}
                      >
                        {transaction.type === 'revenu' ? '+' : '-'}{' '}
                        {transaction.montant} MGA
                      </span>
                      <span className='text-xs text-gray-500'>
                        {new Date(transaction.date).toLocaleDateString(
                          'fr-FR',
                          { day: '2-digit', month: '2-digit' },
                        )}
                      </span>
                    </div>
                    <div className='mt-0.5 flex justify-between'>
                      <span className='rounded bg-[#B9B28A] px-1 py-0.5 text-xs text-[#3A3828]'>
                        {transaction.categorie}
                      </span>
                      {transaction.description && (
                        <span className='max-w-[65%] truncate text-xs italic text-gray-600'>
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
      </div>
    </div>
  )
}

export default Dashboard
