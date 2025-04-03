import './App.css'
import {Routes, Route} from 'react-router-dom'
import Landing from './components/layout/Landing'
import Auth from './views/Auth'
import AuthContextProvider from './contexts/AuthContext'
import Dashboard from './views/Dashboard'
import ProtectedRoute from './components/routing/ProtectedRoute'
import About from './views/About'


const App = () => {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={<Auth authRoute='login'/>}/>
        <Route path='/register' element={<Auth authRoute='register'/>}/>

        {/*Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/about' element={<About/>}/>
        </Route>
      </Routes>
    </AuthContextProvider>
    


  )
}

export default App