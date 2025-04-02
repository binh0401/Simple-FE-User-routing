import React from 'react'
import Button from 'react-bootstrap/Button'
import FormGroup from 'react-bootstrap/esm/FormGroup'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'

const RegisterForm = () => {
  return (
    <>
  <Form className='my-3'>

<FormGroup className='my-4'>
  <Form.Control type='text' placeholder='Username' name='username' required/>
</FormGroup>

<FormGroup className='my-4'>
  <Form.Control type='text' placeholder='Password' name='password' required/>
</FormGroup>

<FormGroup className='my-4'>
  <Form.Control type='text' placeholder='Confirm password' name='confirmPassword' required/>
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
