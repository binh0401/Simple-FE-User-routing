import './App.css'
import {Routes, Route} from 'react-router-dom'
import Landing from './components/layout/Landing'
import Auth from './views/Auth'
import AuthContextProvider from './contexts/AuthContext'
import Dashboard from './views/Dashboard'
import ProtectedRoute from './components/routing/ProtectedRoute'
import About from './views/About'
import PostContextProvider from './contexts/PostContext'


const App = () => {
  return (
    <AuthContextProvider>
      <PostContextProvider>
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
      </PostContextProvider>
    </AuthContextProvider>
    


  )
}

export default App