import { useContext } from "react"
import LoginForm from "../components/auth/LoginForm"
import RegisterForm from "../components/auth/RegisterForm"
import { AuthContext } from "../contexts/AuthContext"
import { Navigate } from "react-router-dom"
import {Spinner} from "react-bootstrap"


const Auth = ({authRoute}) => {

  const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext)


  let body

  if(authLoading){
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info"/>
      </div>
    )
  }else if(isAuthenticated){
    return <Navigate to='/dashboard' replace/>
  }
  else{
    body = (
      <>
        {
          authRoute === 'login' && <LoginForm/>
        }
        {
          authRoute === 'register' && <RegisterForm/>
        }
      </> 
    )
  }
  

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>LearnIt</h1>
          <h4>Keep track of what you're learning</h4>
          {body}
        </div>
      </div>
    </div>
  )
}

export default Auth
