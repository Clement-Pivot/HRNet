import states from './statesList'
import { useEmployeeStore } from './store'
import { Employee } from './types'

declare global {
  interface Window {
    fillEmployees: () => void
  }
}

export default function useWindowFillEmployees() {
  const getRandom = (min: number, max: number) =>
    Math.floor(min + Math.random() * max)
  const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1)
  const FIRST_SMALL_LETTER = 97
  const LAST_SMALL_LETTER = 122
  const NAME_TEMPLATE = [0, 1, 2, 3, 4, 5, 6]
  const addEmployeeInStore = useEmployeeStore((state) => state.addEmployee)
  const AllEmployees: Employee[] = []
  for (let i = 0; i < 26; i++) {
    AllEmployees.push({
      firstname: capitalize(
        NAME_TEMPLATE.map(() =>
          String.fromCharCode(
            getRandom(
              FIRST_SMALL_LETTER,
              LAST_SMALL_LETTER - FIRST_SMALL_LETTER
            )
          )
        ).join('')
      ),
      lastname: capitalize(
        NAME_TEMPLATE.map(() =>
          String.fromCharCode(
            getRandom(
              FIRST_SMALL_LETTER,
              LAST_SMALL_LETTER - FIRST_SMALL_LETTER
            )
          )
        ).join('')
      ),
      birthDate: [getRandom(1950, 74), getRandom(1, 12), getRandom(1, 30)].join(
        '-'
      ),
      startDate: [getRandom(1950, 74), getRandom(1, 12), getRandom(1, 30)].join(
        '-'
      ),
      addressStreet: [
        getRandom(1, 100),
        NAME_TEMPLATE.map(() =>
          String.fromCharCode(
            getRandom(
              FIRST_SMALL_LETTER,
              LAST_SMALL_LETTER - FIRST_SMALL_LETTER
            )
          )
        ).join(''),
      ].join(' '),
      addressCity: NAME_TEMPLATE.map(() =>
        String.fromCharCode(
          getRandom(FIRST_SMALL_LETTER, LAST_SMALL_LETTER - FIRST_SMALL_LETTER)
        )
      ).join(''),
      addressState: states[getRandom(0, states.length - 1)].name,
      addressZip: getRandom(10000, 89999),
      department: [
        'Engineering',
        'Human Resources',
        'Legal',
        'Marketing',
        'Sales',
      ][getRandom(0, 4)],
    })
  }
  window.fillEmployees = () => {
    AllEmployees.forEach((employee) => addEmployeeInStore(employee as Employee))
  }
}
