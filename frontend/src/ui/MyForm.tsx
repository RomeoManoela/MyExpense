import {
  Form,
  Link,
  Navigation,
  useActionData,
  useNavigation,
} from 'react-router-dom'
import Button from './Button'
import Loader from './Loader.tsx'

interface MyFormProps {
  type: 'login' | 'register'
  action: string
}

function MyForm({ type, action }: MyFormProps) {
  const navigation: Navigation = useNavigation()
  const actionData = useActionData() as { error?: string } | undefined
  const isLoading: boolean = navigation.state === 'submitting'
  const error: string | undefined = actionData?.error

  const title: 'Connexion' | 'Inscription' =
    type === 'login' ? 'Connexion' : 'Inscription'
  const buttonText: 'Se connecter' | "S'inscrire" =
    type === 'login' ? 'Se connecter' : "S'inscrire"

  return (
    <div className='mx-auto mt-4 max-w-md rounded-md bg-[#3A3828] p-6 shadow-lg'>
      {isLoading && <Loader />}
      <h2 className='mb-6 text-center text-2xl font-bold text-[#B9B28A]'>
        {title}
      </h2>

      {error && (
        <div className='mb-4 rounded-md bg-red-900/30 p-3 text-red-200'>
          {error}
        </div>
      )}

      <Form method='post' action={action} className='space-y-4'>
        <div>
          <label htmlFor='username' className='mb-1 block text-[#B9B28A]'>
            Nom d'utilisateur
          </label>
          <input
            id='username'
            name='username'
            type='text'
            required
            className='w-full rounded-md border border-[#504B38] bg-[#504B38] p-2 text-white focus:border-[#B9B28A] focus:outline-none'
            placeholder="Entrez votre nom d'utilisateur"
          />
        </div>

        <div>
          <label htmlFor='password' className='mb-1 block text-[#B9B28A]'>
            Mot de passe
          </label>
          <input
            id='password'
            name='password'
            type='password'
            required
            className='w-full rounded-md border border-[#504B38] bg-[#504B38] p-2 text-white focus:border-[#B9B28A] focus:outline-none'
            placeholder='Entrez votre mot de passe'
          />
        </div>

        <div className='pt-2'>
          <Button
            type='submit'
            className='w-full bg-[#B9B28A] text-[#3A3828] hover:bg-[#EBE5C2]'
            disabled={isLoading}
          >
            {buttonText}
          </Button>
        </div>
      </Form>

      <div className='mt-4 text-center text-sm text-gray-300'>
        {type === 'login' ? (
          <p>
            Pas encore de compte ?
            <Link to='/register' className='text-[#EBE5C2] hover:underline'>
              Inscrivez-vous
            </Link>
          </p>
        ) : (
          <p>
            Déjà un compte ?
            <Link to='/login' className='text-[#EBE5C2] hover:underline'>
              Connectez-vous
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}

export default MyForm
