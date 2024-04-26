import { create } from 'zustand'
import { Employee, Store } from './types'

export const useEmployeeStore = create<Store>((set) => ({
  employees: [],
  addEmployee: (employee: Employee) =>
    set((state) => ({ employees: [...state.employees, employee] })),
}))
