export type State = {
  name: string
  abbreviation: string
}

export type Employee = {
  firstname: string
  lastname: string
  birthDate: Date
  startDate: Date
  addressStreet: string
  addressCity: string
  addressState: string
  addressZip: number
  department: string
}

export type Store = {
  employees: Employee[]
  modalVisible: boolean
  modalContent: string
  addEmployee: (employee: Employee) => void
  showModal: (text: string) => void
  hideModal: () => void
}
