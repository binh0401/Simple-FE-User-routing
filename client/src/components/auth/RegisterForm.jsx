import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import FormGroup from 'react-bootstrap/esm/FormGroup'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const RegisterForm = () => {
  const {registerUser} = useContext(AuthContext)
  const [alert, setAlert] = useState(null)
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmpassword: ''
  })
  const {username, password, confirmpassword} = registerForm
  const onChangeForm = event => {
    setRegisterForm(registerForm => ({
      ...registerForm,
      [event.target.name]: event.target.value
    }))
  }

  const register = async event => {
    event.preventDefault()

    if(password !== confirmpassword){
      setAlert({
        type: 'danger',
        message: 'Confirm password does not match'
      })
      setTimeout(() => {
        setAlert(null)
      }, 3000)
      return 
    }

    try {
      const userData = await registerUser(registerForm)
      if(!userData.success){
        setAlert({
          type: 'danger',
          message: userData.message
        })
        setTimeout(() => {
          setAlert(null)
        }, 3000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  
  return (
    <>
  <Form className='my-3' onSubmit={register}>
  <AlertMessage info={alert}/>
  <FormGroup className='my-4'>
    <Form.Control type='text' placeholder='Username' name='username' value={username} required onChange={onChangeForm}/>
  </FormGroup>

  <FormGroup className='my-4'>
    <Form.Control type='password' placeholder='Password' name='password' value={password} required onChange={onChangeForm}/>
  </FormGroup>

  <FormGroup className='my-4'>
    <Form.Control type='password' placeholder='Confirm password' name='confirmpassword' value={confirmpassword} required onChange={onChangeForm}/>
  </FormGroup>
  
  <Button variant='success' type='submit'>Register</Button>
  </Form>
  <p>Already have an account ?
    <Link to='/login'>
      <Button variant='info' size='sm' className='m1-2'>Login</Button>
    </Link>
  </p>
</>
  )
}

export default RegisterForm
