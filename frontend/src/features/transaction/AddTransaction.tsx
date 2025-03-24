import React from 'react'
import api from '../../services/apis.ts'
import { AxiosResponse } from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store.ts'
import { addTransaction } from './transactionSlice.ts'
import { TransactionType } from '../../utils/type.ts'

function AddTransaction(): React.ReactElement {
  const [montant, setMontant] = React.useState<number>(0)
  const [type, setType] = React.useState<string>('dépense')
  const [categorie, setCategorie] = React.useState<string>('transport')
  const transactions: TransactionType[] = useSelector(
    (state: RootState) => state.transactions.transactions,
  )
  console.log(transactions)
  const dispatch: AppDispatch = useDispatch()

  const [description, setDescription] = React.useState<string>('')
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Envoyer les données à l'API
    try {
      const response: AxiosResponse = await api.post('transactions/', {
        montant,
        type,
        categorie,
        description,
      })

      dispatch(addTransaction(response.data))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <h2 className='mb-2 text-sm font-semibold text-[#504B38]'>
        Nouvelle transaction
      </h2>

      <form className='space-y-1 text-xs' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='montant' className='block font-medium text-[#504B38]'>
            Montant en MGA
          </label>
          <input
            type='number'
            id='montant'
            name='montant'
            required
            value={montant}
            onChange={(e): void => setMontant(e.target.valueAsNumber)}
            className='mt-1 w-full rounded-md border border-[#504B38] bg-[#504B38] p-1 text-gray-200 focus:border-[#B9B28A] focus:outline-none focus:ring-1 focus:ring-[#B9B28A]'
          />
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <div>
            <label htmlFor='type' className='block font-medium text-[#504B38]'>
              Type
            </label>
            <select
              id='type'
              name='type'
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
              className='mt-1 w-full rounded-md border border-[#504B38] bg-[#504B38] p-1 text-gray-200 focus:border-[#B9B28A] focus:outline-none focus:ring-1 focus:ring-[#B9B28A]'
            >
              <option value='dépense'>Dépense</option>
              <option value='revenu'>Revenu</option>
            </select>
          </div>

          <div>
            <label
              htmlFor='categorie'
              className='block font-medium text-[#504B38]'
            >
              Catégorie
            </label>
            <select
              id='categorie'
              name='categorie'
              required
              value={categorie}
              onChange={(e): void => setCategorie(e.target.value)}
              className='mt-1 w-full rounded-md border border-[#504B38] bg-[#504B38] p-1 text-gray-200 focus:border-[#B9B28A] focus:outline-none focus:ring-1 focus:ring-[#B9B28A]'
            >
              <option value='transport'>Transport</option>
              <option value='nourriture'>Nourriture</option>
              <option value='logement'>Logement</option>
              <option value='santé'>Santé</option>
              <option value='éducation'>Éducation</option>
              <option value='loisirs'>Loisirs</option>
              <option value='vêtements'>Vêtements</option>
              <option value='services'>Services</option>
              <option value='autres'>Autres</option>
              <option value='salaires'>Salaires</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor='description'
            className='block font-medium text-[#504B38]'
          >
            Description (optionnelle)
          </label>
          <textarea
            id='description'
            name='description'
            rows={2}
            value={description}
            onChange={(e): void => setDescription(e.target.value)}
            className='mt-1 w-full resize-none rounded-md border border-[#504B38] bg-[#504B38] p-1 text-gray-200 focus:border-[#B9B28A] focus:outline-none focus:ring-1 focus:ring-[#B9B28A]'
          />
        </div>

        <button
          type='submit'
          className='w-full rounded-md bg-[#B9B28A] px-2 py-1 font-medium text-[#3A3828] hover:bg-[#a19c78] focus:outline-none focus:ring-1 focus:ring-[#B9B28A]'
        >
          Ajouter
        </button>
      </form>
    </>
  )
}

export default AddTransaction
