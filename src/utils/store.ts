import { create } from 'zustand'
import { Employee, Store } from './types'

export const useEmployeeStore = create((set) => ({
  employees: [],
  addEmployee: (employee: Employee) =>
    set((state: Store) => ({ employees: state.employees.push(employee) })),
}))
