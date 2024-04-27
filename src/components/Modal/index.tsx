import { useEmployeeStore } from '../../utils/store'
import './index.scss'

export default function Modal() {
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
