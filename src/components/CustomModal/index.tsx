import { useEmployeeStore } from '../../utils/store'

export default function CustomModal() {
  const modalContent = useEmployeeStore((state) => state.modalContent)
  const modalVisible = useEmployeeStore((state) => state.modalVisible)
  const hideModal = useEmployeeStore((state) => state.hideModal)
  return (
    <div className={`${modalVisible ? 'modal' : 'hidden'}`}>
      <p className="modal__content">
        {modalContent}
        <button onClick={() => hideModal()} className="modal__button">
          Dismiss
        </button>
      </p>
    </div>
  )
}
