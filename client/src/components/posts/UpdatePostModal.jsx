import { useContext, useEffect, useState } from "react"
import { Modal, Button, Form, ModalHeader, ModalTitle, FormGroup, ModalBody, FormControl, FormText, ModalFooter } from "react-bootstrap"
import { PostContext } from "../../contexts/PostContext"

const UpdatePostModal = () => {
  //Contexts
  const {showUpdatePostModal, setShowUpdatePostModal, updatePost, setShowToast, postState: {post}} = useContext(PostContext)

  const closeDialog = () => {
    setShowUpdatePostModal(false)
  }

  //State
  const [updatedPost, setUpdatedPost] = useState(post)

  useEffect(() => setUpdatedPost(post), [post])

  const {title, description, url, status} = updatedPost

  const formChange = event => {
    setUpdatedPost(updatedPost => ({
      ...updatedPost,
      [event.target.name]: event.target.value
    }
    )
    )
  }

  const submit = async event => {
    event.preventDefault()
    const {success, message} = await updatePost(updatedPost)
    setShowUpdatePostModal(false),
    setShowToast({
      show: true,
      message: message,
      type: success ? 'success' : 'danger'
    })
  }

  return (
    <Modal show={showUpdatePostModal} onHide={closeDialog}>
      <ModalHeader closeButton>
        <ModalTitle>
          Still in progress ?
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

          <FormGroup>
            <FormControl as='select' value={status} name="status" onChange={formChange}>
              <option value='TO LEARN'>TO LEARN</option>
              <option value='LEARNING'>LEARNING</option>
              <option value='LEARNED'>LEARNED</option>
            </FormControl>
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

export default UpdatePostModal
