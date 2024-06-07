export type State = {
  name: string
  abbreviation: string
}

export type Employee = {
  firstname: string
  lastname: string
  birthDate: string
  startDate: string
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

export function isEmployee(data: unknown): data is Employee {
  const employee = data as Employee
  if (!('firstname' in employee)) return false
  if (!('lastname' in employee)) return false
  if (!('birthDate' in employee)) return false
  if (!('startDate' in employee)) return false
  if (!('addressStreet' in employee)) return false
  if (!('addressCity' in employee)) return false
  if (!('addressState' in employee)) return false
  if (!('addressZip' in employee)) return false
  if (!('department' in employee)) return false
  return true
}
