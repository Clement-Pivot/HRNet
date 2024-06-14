import { TableViewer } from '@malfeitor/table-viewer'
import { useEmployeeStore } from '../../utils/store'

export default function EmployeeList() {
  const allEmployeesInStore = useEmployeeStore((state) => state.employees)

  const compareDates = (a: string, b: string) =>
    new Date(a).getTime() - new Date(b).getTime()

  const compareNumbers = (a: number, b: number) => a - b

  const sortingFunctions = {
    birthDate: compareDates,
    startDate: compareDates,
    addressZip: compareNumbers,
  }

  return (
    <main className="container">
      <h2 className="text-center">Liste des employés</h2>
      {allEmployeesInStore.length > 0 ? (
        <TableViewer
          rows={allEmployeesInStore}
          sortFunctions={sortingFunctions}
        />
      ) : (
        <div>There is no employees in the store.</div>
      )}
    </main>
  )
}
