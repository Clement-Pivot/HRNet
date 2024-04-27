import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Employee, Store } from './types'

export const useEmployeeStore = create(
  devtools<Store>((set) => ({
    employees: [],
    modalVisible: false,
    modalContent: '',
    addEmployee: (employee: Employee) =>
      set((state) => ({ employees: [...state.employees, employee] })),
    showModal: (text: string) =>
      set(() => ({ modalVisible: true, modalContent: text })),
    hideModal: () => set(() => ({ modalVisible: false })),
  }))
)
