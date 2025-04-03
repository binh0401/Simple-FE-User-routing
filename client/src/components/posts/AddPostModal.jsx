import { useContext, useState } from "react"
import { Modal, Button, Form, ModalHeader, ModalTitle, FormGroup, ModalBody, FormControl, FormText, ModalFooter } from "react-bootstrap"
import { PostContext } from "../../contexts/PostContext"



const AddPostModal = () => {
  //Contexts
  const {showAddPostModal, setShowAddPostModal, addPost, setShowToast} = useContext(PostContext)

  const closeDialog = () => {
    setNewPost(newPost => ({
      ...newPost,
      title: '',
      description: '',
      url: '',
    }
    )
    )
    setShowAddPostModal(false)
  }

  //State
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    url: '',
    status: 'TO LEARN'
  })

  const {title, description, url} = newPost

  const formChange = event => {
    setNewPost(newPost => ({
      ...newPost,
      [event.target.name]: event.target.value
    }
    )
    )
  }

  const submit = async event => {
    event.preventDefault()

    const {success, message} = await addPost(newPost)
    setNewPost(newPost => ({
      ...newPost,
      [event.target.name]: event.target.value
    }
    )
    )
    setShowAddPostModal(false),
    setShowToast({
      show: true,
      message: message,
      type: success ? 'success' : 'danger'
    })

  }

  return (
    <Modal show={showAddPostModal} onHide={closeDialog}>
      <ModalHeader closeButton>
        <ModalTitle>
          What do you want to learn?
        </ModalTitle>
      </ModalHeader>
      <Form onSubmit={submit}>
        <ModalBody>
          <FormGroup>
            <FormControl type="text" placeholder="Title" name="title" required aria-describedby="title-help" value={title} onChange={formChange}/>
            <FormText id="title-help" muted>Required</FormText>          
          </FormGroup>

          <FormGroup>
            <FormControl as='textarea' rows={3} placeholder="Description" name="description" value={description} onChange={formChange}/>       
          </FormGroup>

          <FormGroup>
            <FormControl type="text" placeholder="Youtube Tutorial URL" name="url" value={url} onChange={formChange}/>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={closeDialog}>Cancel</Button>
          <Button variant="primary" type="submit">
            Learn it!
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default AddPostModal
