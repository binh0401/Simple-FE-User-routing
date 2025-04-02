import React from 'react'
import Button from 'react-bootstrap/Button'
import FormGroup from 'react-bootstrap/esm/FormGroup'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'

const LoginForm = () => {
  return (
    <>
  <Form>

<FormGroup>
  <Form.Control type='text' placeholder='Username' name='username' required/>
</FormGroup>

<FormGroup>
  <Form.Control type='text' placeholder='Password' name='password' required/>
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
