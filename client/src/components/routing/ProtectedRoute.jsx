import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Spinner } from 'react-bootstrap'
const ProtectedRoute = () => {

  const {authState: {isAuthenticated, authLoading}} = useContext(AuthContext)

  if(authLoading){
    return (
      <div className='spinner-container'>
        <Spinner animation='border' variant='info'/>
      </div>
    )
  }

  return isAuthenticated ? <Outlet/> : <Navigate to='/login' replace/>
  

  
}

export default ProtectedRoute
