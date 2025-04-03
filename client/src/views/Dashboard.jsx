import React, { useContext } from 'react'
import NavbarMenu from '../components/layout/NavbarMenu'
import { PostContext } from '../contexts/PostContext'
const Dashboard = () => {

  const {postState: {posts,postLoading}, getPosts} = useContext(PostContext)

  //Fetch all posts



  return (
    <>
      <h1>DASHBOARD</h1>
    </>
    
    
  )
}

export default Dashboard
