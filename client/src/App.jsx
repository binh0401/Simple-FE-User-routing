import './App.css'
import {Routes, Route} from 'react-router-dom'
import Landing from './components/layout/Landing'
import Auth from './views/Auth'


const App = () => {
  return (
    
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/login' element={<Auth authRoute='login'/>}/>
      <Route path='/register' element={<Auth authRoute='register'/>}/>
    </Routes>


  )
}

export default App