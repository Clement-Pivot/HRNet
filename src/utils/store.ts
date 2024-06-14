import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import { Employee, Store } from './types'

export const useEmployeeStore = create(
  persist(
    devtools<Store>((set) => ({
      employees: [],
      modalVisible: false,
      modalContent: '',
      addEmployee: (employee: Employee) =>
        set((state) => ({ employees: [...state.employees, employee] })),
      showModal: (text: string) =>
        set(() => ({ modalVisible: true, modalContent: text })),
      hideModal: () => set(() => ({ modalVisible: false })),
    })),
    {
      name: 'employees-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
