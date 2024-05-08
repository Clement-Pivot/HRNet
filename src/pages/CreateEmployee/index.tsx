import { Link } from 'react-router-dom'
import { DatePicker } from '@malfeitor/date-picker'
import './index.scss'
import { ChangeEvent, useRef, useState } from 'react'
import States from '../../utils/statesList'
import { useEmployeeStore } from '../../utils/store'
import CustomModal from '../../components/CustomModal'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'

export default function CreateEmployee() {
  const datePickerProps = {
    format: 'YYYY-MM-DD',
    language: 'en',
    weekStartingDay: 'Sunday',
  }

  const birthdateRef = useRef<HTMLInputElement>(null)
  const startDateRef = useRef<HTMLInputElement>(null)

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [addressStreet, setAddressStreet] = useState('')
  const [addressCity, setAddressCity] = useState('')
  const [addressState, setAddressState] = useState('')
  const [addressZip, setAddressZip] = useState('')
  const [department, setDepartment] = useState('')

  const handleFirstnameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstname(event.target.value)
  }
  const handleLastnameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value)
  }
  const handleAddressStreetChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAddressStreet(event.target.value)
  }
  const handleAddressCityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAddressCity(event.target.value)
  }
  const handleAddressStateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setAddressState(event.target.value)
  }
  const handleAddressZipChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAddressZip(event.target.value)
  }
  const handleDepartmentChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDepartment(event.target.value)
  }

  const addEmployeeInStore = useEmployeeStore((state) => state.addEmployee)
  const allEmployeesInStore = useEmployeeStore((state) => state.employees)
  const showModal = useEmployeeStore((state) => state.showModal)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const birthdate = birthdateRef!.current!.value
    const startDate = startDateRef!.current!.value
    const employee = {
      firstname,
      lastname,
      birthDate: new Date(birthdate),
      startDate: new Date(startDate),
      addressStreet,
      addressCity,
      addressState,
      addressZip: parseInt(addressZip),
      department,
    }
    const employeeStringified = JSON.stringify(employee)
    if (
      !allEmployeesInStore.some((storeEmployee) => {
        return JSON.stringify(storeEmployee) === employeeStringified
      })
    ) {
      addEmployeeInStore(employee)
      showModal('Employee successfully created !')
    } else {
      showModal('Employee already exists !')
    }
  }

  return (
    <div className="create-employee">
      <CustomModal />
      <h1>HRnet</h1>
      <Link to="/employee-list">View Current Employees</Link>
      <h2>Create Employee</h2>
      <Form
        className="create-employee__form"
        id="create-employee__form"
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="firstname">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={firstname}
            onChange={handleFirstnameChange}
            required
            placeholder="Enter his firstname"
          />
        </Form.Group>
        <Form.Group controlId="lastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={lastname}
            onChange={handleLastnameChange}
            placeholder="Enter his lastname"
            required
          />
        </Form.Group>
        <Form.Group controlId="birthdate">
          <Form.Label>Date of Birth</Form.Label>
          <DatePicker
            id="birthdate"
            ref={birthdateRef}
            {...datePickerProps}
            required
            placeholder="Click to choose the birthday"
          />
        </Form.Group>
        <Form.Group controlId="startDate">
          <Form.Label>Start Date</Form.Label>
          <DatePicker
            id="startDate"
            ref={startDateRef}
            {...datePickerProps}
            required
            placeholder="Click to choose the start date"
          />
        </Form.Group>

        <fieldset className="address">
          <legend>Address</legend>
          <Form.Group controlId="street">
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              value={addressStreet}
              onChange={handleAddressStreetChange}
              required
              placeholder="Enter his street"
            />
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              value={addressCity}
              onChange={handleAddressCityChange}
              required
              placeholder="Enter his city"
            />
          </Form.Group>
          <Form.Group controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Select
              aria-label="Select state"
              name="state"
              required
              value={addressState}
              onChange={handleAddressStateChange}
            >
              {States.map((state) => (
                <option key={`state-${state.abbreviation}`}>
                  {state.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="zip-code">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              placeholder="Enter his Zip code"
              type="number"
              value={addressZip}
              onChange={handleAddressZipChange}
              required
            />
          </Form.Group>
        </fieldset>
        <Form.Group controlId="department">
          <Form.Label>Department</Form.Label>
          <Form.Select
            aria-label="Select department"
            name="department"
            value={department}
            onChange={handleDepartmentChange}
            required
          >
            <option>Sales</option>
            <option>Marketing</option>
            <option>Engineering</option>
            <option>Human Resources</option>
            <option>Legal</option>
          </Form.Select>
        </Form.Group>
        <Button type="submit" className="create-employee__submit">
          Save
        </Button>
      </Form>
    </div>
  )
}
