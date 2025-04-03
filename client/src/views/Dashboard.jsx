import React, { useContext, useEffect, useState } from 'react'
import { PostContext } from '../contexts/PostContext'
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Spinner, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { AuthContext } from '../contexts/AuthContext'
import SinglePost from '../components/posts/SinglePost'
import AddPostModal from '../components/posts/AddPostModal'
import addIcon from '../assets/plus-circle-fill.svg'


const Dashboard = () => {
  const {authState: {user: {username}}} = useContext(AuthContext)
  const {showAddPostModal, setShowAddPostModal,postState: {posts,postLoading}, getPosts} = useContext(PostContext)

  //Fetch all posts
  useEffect(() => {
    
    async function fetchData(){
      console.log(`run fetch data`)
      await getPosts()
    } 
    fetchData()
    
  }, [])

  
  let body
  if(postLoading){
    body = (
     <div className='spinner-container'>
        <Spinner animation='border' variant='info'/>
     </div>
    )
  }else if(posts.length == 0){
    body = (
      <>
        <Card className='text-center mx-5 my-5'>
          <CardHeader as='h1'>
            Hi {username}
          </CardHeader>
          <CardBody>
            <CardTitle>
              Welcome to LearnIt
            </CardTitle>
            <CardText>
              Click the button below to track your first skill
            </CardText>
            <Button variant='primary'>LearnIt!</Button>
          </CardBody>
        </Card>
      </>
    )
  }else{
    body = (
      <>
        <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
          {posts.map(post => (
            <Col key={post._id} className='my-2'>
              <SinglePost post={post}/> 
            </Col>
          ))}
        </Row>
        
        
      </>
    )
  }

  return (
    <>
      <h1>DASHBOARD</h1>
      {body}
      <AddPostModal/>
      <OverlayTrigger placement='left' overlay={<Tooltip>Add a new thing to learn</Tooltip>}>
        <Button className='btn-floating' onClick={() => setShowAddPostModal(true)}>
            <img src={addIcon} alt="add" width={60} height={60}/>
        </Button>
      </OverlayTrigger>
      
    </>
    
    
  )
}

export default Dashboard
