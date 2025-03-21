import Header from './Header.tsx'
import Footer from './Footer.tsx'
import { Navigation, Outlet, useNavigation } from 'react-router-dom'
import Loader from './Loader.tsx'

function AppLayout() {
  const navigation: Navigation = useNavigation()
  const isLoading: boolean = navigation.state == 'loading'
  return (
    <div className={'grid h-screen grid-rows-[auto_1fr_auto]'}>
      {isLoading && <Loader />}
      <Header />
      <main className={'relative overflow-y-scroll'}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AppLayout
