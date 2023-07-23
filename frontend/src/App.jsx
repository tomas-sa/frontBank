import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import CajaAhorros from './pages/CajaAhorros'
import Transferir from './pages/Transferir'
import Prestamos from './pages/Prestamos'
import Bars from './components/Bars'
import Signup from './pages/Signup'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import PrivateRoutes from './utils/PrivateRoutes'
import {AuthProvider} from './context/AuthContext'
import toast, { Toaster} from 'react-hot-toast';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

function App() {

  return (
    <>
        <BrowserRouter>
          <AuthProvider>
            <Header/>
            <Bars/>
            <Routes>
              <Route element={ <PrivateRoutes/>}>
                <Route element={<HomePage/>} path='/home'></Route>
                <Route element={<CajaAhorros/>} path='/nuevacuenta'></Route>
                <Route element={<Transferir/>} path='/transferir'></Route>
                <Route element={<Prestamos/>} path='/prestamos'></Route>
              </Route>
              <Route element={<LoginPage/>} path='/login'/>
              <Route element={<Signup/>} path='/signup'></Route>
            </Routes>
          </AuthProvider>
          <Toaster
        position='top-center'
        toastOptions={{
            style:{
                fontSize: '1rem',
                fontWeight: '500'
            }
        }}/>
        </BrowserRouter>
    </>
  )
}

export default App
library.add(fab, fas, far)