import Header from './Header.tsx'
import Footer from './Footer.tsx'
import { Navigation, Outlet, useNavigation } from 'react-router-dom'
import Loader from './Loader.tsx'

function AppLayout() {
  const navigation: Navigation = useNavigation()
  const isLoading: boolean = navigation.state == 'loading'
  return (
    <div className='min-h-screen bg-[#504B38]'>
      {isLoading && <Loader />}
      <Header />
      <main className='pb-16'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AppLayout
