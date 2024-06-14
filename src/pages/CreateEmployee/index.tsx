import { DatePicker } from '@malfeitor/date-picker'
import { FormEvent, useRef, useState } from 'react'
import States from '../../utils/statesList'
import { useEmployeeStore } from '../../utils/store'
import CustomModal from '../../components/CustomModal'
import Form from 'react-bootstrap/Form'
import { Button, Row } from 'react-bootstrap'
import { Employee, isEmployee } from '../../utils/types'

export default function CreateEmployee() {
  const datePickerProps = {
    format: 'YYYY-MM-DD',
    language: 'en',
    weekStartingDay: 'Sunday',
  }

  const birthdateRef = useRef<HTMLInputElement>(null)
  const startDateRef = useRef<HTMLInputElement>(null)

  const [validated, setValidated] = useState(false)

  type FormErrors = { [key: string]: string }
  const [errors, setErrors] = useState<FormErrors>({})

  const addEmployeeInStore = useEmployeeStore((state) => state.addEmployee)
  const allEmployeesInStore = useEmployeeStore((state) => state.employees)
  const showModal = useEmployeeStore((state) => state.showModal)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setValidated(true)
    if (e.currentTarget.checkValidity()) {
      const form = e.currentTarget as HTMLFormElement
      const employee = Object.fromEntries(new FormData(form))
      if (isEmployee(employee) && checkEmployeeDoesntExist(employee)) {
        addEmployeeInStore(employee)
        showModal('Employee successfully created !')
        form.reset()
        setValidated(false)
      } else {
        showModal('Employee already exists !')
      }
    } else {
      setFormValidationErrors(e)
    }
  }

  function checkEmployeeDoesntExist(employee: Employee) {
    const employeeStringified = JSON.stringify(employee)
    return !allEmployeesInStore.some((storeEmployee) => {
      return JSON.stringify(storeEmployee) === employeeStringified
    })
  }

  function setFormValidationErrors(e: FormEvent<HTMLFormElement>) {
    const newErrors: FormErrors = {}
    for (let i = 0; i < e.currentTarget.length; i++) {
      const elem = e.currentTarget[i] as HTMLFormElement
      if (!elem.validity.valid) {
        newErrors[elem.name] = elem.validationMessage
      }
    }
    setErrors(newErrors)
  }

  return (
    <main className="create-employee container">
      <CustomModal />
      <h2 className="text-center">Create Employee</h2>
      <Form
        className="create-employee__form container"
        onSubmit={handleSubmit}
        noValidate
        validated={validated}
      >
        <Row>
          <Form.Group className="col-md-6" controlId="firstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name="firstname"
              type="text"
              placeholder="Enter his firstname"
              required
              minLength={3}
            />
            <Form.Control.Feedback type="invalid">
              {errors.firstname}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="lastname" className="col-md-6">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastname"
              placeholder="Enter his lastname"
              required
              minLength={3}
            />
            <Form.Control.Feedback type="invalid">
              {errors.lastname}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="birthdate" className="col-md-6">
            <Form.Label>Date of Birth</Form.Label>
            <DatePicker
              name="birthDate"
              ref={birthdateRef}
              {...datePickerProps}
              placeholder="Click to choose the birthday"
              required
              errorInvalidDate={errors.birthDate}
            />
          </Form.Group>
          <Form.Group controlId="startDate" className="col-md-6">
            <Form.Label>Start Date</Form.Label>
            <DatePicker
              name="startDate"
              ref={startDateRef}
              {...datePickerProps}
              placeholder="Click to choose the start date"
              required
              errorInvalidDate={errors.startDate}
            />
          </Form.Group>
        </Row>
        <fieldset className="address">
          <legend>Address</legend>
          <Form.Group controlId="street">
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              name="addressStreet"
              placeholder="Enter his street"
              required
              minLength={4}
            />
            <Form.Control.Feedback type="invalid">
              {errors.addressStreet}
            </Form.Control.Feedback>
          </Form.Group>
          <Row>
            <Form.Group controlId="city" className="col-md-4">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="addressCity"
                placeholder="Enter his city"
                required
                minLength={4}
              />
              <Form.Control.Feedback type="invalid">
                {errors.addressCity}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="state" className="col-md-4">
              <Form.Label>State</Form.Label>
              <Form.Select
                aria-label="Select state"
                name="addressState"
                required
              >
                <option hidden value="">
                  -- Select a State --
                </option>
                {States.map((state) => (
                  <option
                    key={`state-${state.abbreviation}`}
                    value={state.name}
                  >
                    {state.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.addressState}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="zip-code" className="col-md-4">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                placeholder="Enter his Zip code"
                type="number"
                name="addressZip"
                required
                minLength={3}
              />
              <Form.Control.Feedback type="invalid">
                {errors.addressZip}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
        </fieldset>
        <Row className="mt-3">
          <Form.Group controlId="department" className="col-md-8">
            <Form.Label>Department</Form.Label>
            <Form.Select
              aria-label="Select department"
              name="department"
              required
            >
              <option hidden value="">
                -- Select a department --
              </option>
              <option value="Engineering">Engineering</option>
              <option value="Human">Human Resources</option>
              <option value="Legal">Legal</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.department}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="col-md-4 align-content-end">
            <Button type="submit" className="create-employee__submit w-100">
              Save
            </Button>
          </Form.Group>
        </Row>
      </Form>
    </main>
  )
}
