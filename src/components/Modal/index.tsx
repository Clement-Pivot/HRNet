import { useEmployeeStore } from '../../utils/store'

export default function Modal() {
  const modalContent = useEmployeeStore((state) => state.modalContent)
  const modalVisible = useEmployeeStore((state) => state.modalVisible)
  const hideModal = useEmployeeStore((state) => state.hideModal)
  return (
    <div className={`${modalVisible ? 'modal' : 'hidden'}`}>
      {modalContent}
      <button onClick={() => hideModal()}>Dismiss</button>
    </div>
  )
}
