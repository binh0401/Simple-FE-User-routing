import React from 'react'
import Button from 'react-bootstrap/Button'
import FormGroup from 'react-bootstrap/esm/FormGroup'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'
const LoginForm = () => {
  //Context
  const {loginUser} = useContext(AuthContext)

  //Router
  // const navigate = useNavigate()


  //Local state
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  })
  const {username, password} = loginForm
  const onChangeLoginForm = event => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value
    })
  }

  const [alert, setAlert] = useState(null)


  //onSubmit function
  const login = async event => {
    event.preventDefault()

    try {
      const loginData = await loginUser(loginForm)
      if(!loginData.success){
        setAlert({
          type: 'danger',
          message: loginData.message
        })
        setTimeout(() => {
          setAlert(null)
        },3000)
      }
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <>
  <Form className='my-3'onSubmit={login}>

    <AlertMessage info={alert}/>

    <FormGroup className='my-4' >
      <Form.Control type='text' placeholder='Username' name='username' required value={username} onChange={onChangeLoginForm}/>
    </FormGroup>

    <FormGroup className='my-4'>
      <Form.Control type='password' placeholder='Password' name='password' required value={password} onChange={onChangeLoginForm}/>
    </FormGroup>

    <Button variant='success' type='submit'>Login</Button>
  </Form>
  <p>Don't have an account ?
    <Link to='/register'>
      <Button variant='info' size='sm' className='m1-2'>Register</Button>
    </Link>
  </p>
</>
  )
  
  
}

export default LoginForm
