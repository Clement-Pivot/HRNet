import { Link } from 'react-router-dom'
import { DatePicker } from '@malfeitor/date-picker'
import './index.scss'
import { SyntheticEvent, useRef } from 'react'
import States from '../../utils/statesList'
import { useEmployeeStore } from '../../utils/store'

export default function CreateEmployee() {
  const datePickerProps = {
    format: 'YYYY-MM-DD',
    language: 'en',
    weekStartingDay: 'Sunday',
  }

  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const birthDateRef = useRef<HTMLInputElement>(null)
  const startDateRef = useRef<HTMLInputElement>(null)
  const addressStreetRef = useRef<HTMLInputElement>(null)
  const addressCityRef = useRef<HTMLInputElement>(null)
  const addressStateRef = useRef<HTMLSelectElement>(null)
  const addressZipRef = useRef<HTMLInputElement>(null)
  const departmentRef = useRef<HTMLSelectElement>(null)

  const addEmployeeInStore = useEmployeeStore((state) => state.addEmployee)

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()
    const employee = {
      firstName: firstNameRef!.current!.value,
      lastName: lastNameRef!.current!.value,
      birthDate: new Date(birthDateRef!.current!.value),
      startDate: new Date(startDateRef!.current!.value),
      addressStreet: addressStreetRef!.current!.value,
      addressCity: addressCityRef!.current!.value,
      addressState: addressStateRef!.current!.value,
      addressZip: parseInt(addressZipRef!.current!.value),
      department: departmentRef!.current!.value,
    }
    addEmployeeInStore(employee)
  }

  return (
    <div className="create-employee">
      <h1>HRnet</h1>
      <Link to="/employee-list">View Current Employees</Link>
      <h2>Create Employee</h2>
      <form
        className="create-employee__form"
        id="create-employee__form"
        onSubmit={handleSubmit}
      >
        <label htmlFor="firstname">First Name</label>
        <input type="text" id="firstname" ref={firstNameRef} required />
        <label htmlFor="lastname">Last Name</label>
        <input type="text" id="lastname" ref={lastNameRef} required />
        <label>Date of Birth</label>
        <DatePicker ref={birthDateRef} {...datePickerProps} required />
        <label>Start Date</label>
        <DatePicker ref={startDateRef} {...datePickerProps} required />
        <fieldset className="address">
          <legend>Address</legend>
          <label htmlFor="street">Street</label>
          <input id="street" type="text" ref={addressStreetRef} required />
          <label htmlFor="city">City</label>
          <input id="city" type="text" ref={addressCityRef} required />
          <label htmlFor="state">State</label>
          <select name="state" id="state" ref={addressStateRef} required>
            {States.map((state) => (
              <option key={`state-${state.abbreviation}`}>{state.name}</option>
            ))}
          </select>
          <label htmlFor="zip-code">Zip Code</label>
          <input id="zip-code" type="number" ref={addressZipRef} required />
        </fieldset>
        <label htmlFor="department">Department</label>
        <select name="department" id="department" ref={departmentRef} required>
          <option>Sales</option>
          <option>Marketing</option>
          <option>Engineering</option>
          <option>Human Resources</option>
          <option>Legal</option>
        </select>
        <button type="submit" className="create-employee__submit">
          Save
        </button>
      </form>
    </div>
  )
}
