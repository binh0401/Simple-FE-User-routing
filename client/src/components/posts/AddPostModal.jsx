import { useContext } from "react"
import { Modal, Button, Form, ModalHeader, ModalTitle, FormGroup, ModalBody, FormControl, FormText, ModalFooter } from "react-bootstrap"
import { PostContext } from "../../contexts/PostContext"



const AddPostModal = () => {
  //Contexts
  const {showAddPostModal, setShowAddPostModal} = useContext(PostContext)

  const closeDialog = () => {
    setShowAddPostModal(false)
  }

  //State
  

  return (
    <Modal show={showAddPostModal} onHide={closeDialog}>
      <ModalHeader closeButton>
        <ModalTitle>
          What do you want to learn?
        </ModalTitle>
      </ModalHeader>
      <Form>
        <ModalBody>
          <FormGroup>
            <FormControl type="text" placeholder="Title" name="title" required aria-describedby="title-help"/>
            <FormText id="title-help" muted>Required</FormText>          
          </FormGroup>

          <FormGroup>
            <FormControl as='textarea' rows={3} placeholder="Description" name="description"/>       
          </FormGroup>

          <FormGroup>
            <FormControl type="text" placeholder="Youtube Tutorial URL" name="url"/>
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
