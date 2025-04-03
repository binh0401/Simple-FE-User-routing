import  { Navbar,NavbarBrand, NavbarCollapse, NavbarToggle, NavLink } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import React, { useContext } from 'react'
import learnItLogo from '../../assets/logo.svg'
import logoutIcon from '../../assets/logout.svg'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

const NavbarMenu = () => {
  const {authState: {user}, logoutUser} = useContext(AuthContext)

  const logout = () => {
    logoutUser()
  }

  return (
    <Navbar expand='lg' bg='primary' variant='dark' className='shadow'>
      <NavbarBrand className='font-weight-bolder text-white'>
        <img src={learnItLogo} alt="learn" width='32' height='32' className='mr-2' />
        Learn It
      </NavbarBrand>
      <NavbarToggle aria-controls='basic-navbar-nav'/>
      <NavbarCollapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <NavLink className='font-weight-bolder text-white' to='/dashboard' as={Link}>
            Dashboard
          </NavLink>

          <NavLink className='font-weight-bolder text-white' to='/about' as={Link}>
            About
          </NavLink>
        </Nav>

        <Nav>
          <NavLink className='font-weight-bolder text-white' disabled>
              Welcome {user.username}
          </NavLink>
          <Button variant='secondary' className='font-weight-bolder text-white' onClick={logout}>
            <img src={logoutIcon} alt="logoutIcon" width={32} height={32} className='mr-2' />
            Logout
          </Button>
        </Nav>
      </NavbarCollapse>

    </Navbar>
  )
}

export default NavbarMenu
