import { Link } from 'react-router-dom'
import { DatePicker } from '@malfeitor/date-picker'
import './index.scss'
import { useRef } from 'react'
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
  const allEmployeesInStore = useEmployeeStore((state) => state.employees)
  const showModal = useEmployeeStore((state) => state.showModal)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
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
            ref={firstNameRef}
            required
            placeholder="Enter his firstname"
          />
        </Form.Group>
        <Form.Group controlId="lastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            ref={lastNameRef}
            placeholder="Enter his lastname"
            required
          />
        </Form.Group>
        <Form.Group controlId="birthdate">
          <Form.Label>Date of Birth</Form.Label>
          <DatePicker
            ref={birthDateRef}
            {...datePickerProps}
            required
            placeholder="Click to choose the birthday"
          />
        </Form.Group>
        <Form.Group controlId="startDate">
          <Form.Label>Start Date</Form.Label>
          <DatePicker
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
              ref={addressStreetRef}
              required
              placeholder="Enter his street"
            />
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              ref={addressCityRef}
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
              ref={addressStateRef}
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
              ref={addressZipRef}
              required
            />
          </Form.Group>
        </fieldset>
        <Form.Group controlId="department">
          <Form.Label>Department</Form.Label>
          <Form.Select
            aria-label="Select department"
            name="department"
            ref={departmentRef}
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
