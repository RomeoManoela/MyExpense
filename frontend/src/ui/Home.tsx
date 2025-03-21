import Button from './Button'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  return (
    <div className='mx-auto max-w-4xl px-4 py-1'>
      <div className='p-4'>
        <h1 className='mb-2 text-center text-4xl font-bold text-[#B9B28A]'>
          Prenez le contrôle de vos finances dès aujourd'hui !
        </h1>

        <div className='mb-2 space-y-1'>
          <div className='rounded-md bg-[#3A3828] p-5'>
            <h2 className='mb-4 text-center text-2xl font-semibold text-[#B9B28A]'>
              Avec <span className='font-bold'>r-ExpenseTracker</span>, vous
              pouvez :
            </h2>
            <ul className='grid grid-cols-1 gap-3 md:grid-cols-2'>
              {[
                {
                  title: 'Enregistrer vos dépenses et revenus',
                  description:
                    'Ajoutez facilement toutes vos transactions financières',
                },
                {
                  title: 'Visualiser vos dépenses par catégorie',
                  description:
                    'Identifiez où va votre argent avec des graphiques clairs',
                },
                {
                  title: 'Obtenir des rapports détaillés',
                  description:
                    'Analysez vos habitudes financières sur différentes périodes',
                },
                {
                  title: 'Planifier vos dépenses futures',
                  description:
                    'Créez des budgets pour mieux gérer vos finances',
                },
              ].map((item, index) => (
                <li
                  key={index}
                  className='rounded-md bg-[#504B38] p-4 shadow-md transition-transform hover:scale-105'
                >
                  <h3 className='mb-2 font-bold text-[#B9B28A]'>
                    {item.title}
                  </h3>
                  <p className='text-sm text-gray-300'>{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='mt-4 rounded-md bg-[#3A3828] p-2'>
          <h2 className='mb-2 text-center text-2xl font-semibold text-[#B9B28A]'>
            Commencez dès maintenant
          </h2>
          <p className='mb-2 text-center'>
            Créez un compte gratuitement et commencez à suivre vos finances en
            quelques minutes.
          </p>
          <div className='flex justify-center'>
            <Button onClick={() => navigate('/register')}>S'inscrire</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
