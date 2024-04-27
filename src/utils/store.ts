import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Employee, Store } from './types'

export const useEmployeeStore = create(
  devtools<Store>((set) => ({
    employees: [],
    addEmployee: (employee: Employee) =>
      set((state) => ({ employees: [...state.employees, employee] })),
  }))
)
