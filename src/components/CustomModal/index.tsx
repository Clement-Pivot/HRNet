import { Button, Modal, ModalHeader } from 'react-bootstrap'
import { useEmployeeStore } from '../../utils/store'

export default function CustomModal() {
  const modalContent = useEmployeeStore((state) => state.modalContent)
  const modalVisible = useEmployeeStore((state) => state.modalVisible)
  const hideModal = useEmployeeStore((state) => state.hideModal)
  return (
    <Modal show={modalVisible} onHide={hideModal} centered>
      <ModalHeader closeButton></ModalHeader>
      <Modal.Body>{modalContent}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
