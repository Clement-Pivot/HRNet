import { Link } from 'react-router-dom'
import { DatePicker } from '@malfeitor/date-picker'
import './index.scss'
import { useRef, useState } from 'react'
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

  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    birthDate: '',
    startDate: '',
    addressStreet: '',
    addressCity: '',
    addressState: '',
    addressZip: '',
    department: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  type FormErrors = { [key: string]: string }

  const setFormField = (field: string, value: string) => {
    setForm({ ...form, [field]: value })
  }

  const addEmployeeInStore = useEmployeeStore((state) => state.addEmployee)
  const allEmployeesInStore = useEmployeeStore((state) => state.employees)
  const showModal = useEmployeeStore((state) => state.showModal)

  const findErrors = () => {
    const {
      firstname,
      lastname,
      addressStreet,
      addressCity,
      addressState,
      addressZip,
      department,
    } = form
    const birthdate = birthdateRef!.current!.value
    const startDate = startDateRef!.current!.value
    const newErrors: FormErrors = {}

    if (!firstname || firstname === '') newErrors.firstname = 'Cannot be blank'
    else if (firstname.length > 24)
      newErrors.firstname = 'Firstname is too long'
    if (!lastname || lastname === '') newErrors.lastname = 'Cannot be blank'
    if (!addressStreet || addressStreet === '')
      newErrors.addressStreet = 'Cannot be blank'
    if (!addressCity || addressCity === '')
      newErrors.addressCity = 'Cannot be blank'
    if (!addressState || addressState === '')
      newErrors.addressState = 'Cannot be blank'
    if (!addressZip || addressZip === '')
      newErrors.addressZip = 'Cannot be blank'
    if (!department || department === '')
      newErrors.department = 'Cannot be blank'
    if (!birthdate || birthdate === '') newErrors.birthdate = 'Cannot be blank'
    if (!startDate || startDate === '') newErrors.startDate = 'Cannot be blank'
    return newErrors
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const errors = findErrors()
    if (Object.keys(errors).length > 0) {
      setErrors(errors)
    } else {
      const birthdate = birthdateRef!.current!.value
      const startDate = startDateRef!.current!.value
      const employee = {
        firstname: form.firstname,
        lastname: form.lastname,
        birthDate: new Date(birthdate),
        startDate: new Date(startDate),
        addressStreet: form.addressStreet,
        addressCity: form.addressCity,
        addressState: form.addressState,
        addressZip: parseInt(form.addressZip),
        department: form.department,
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
        <div className="row">
          <Form.Group className="col-md-6" controlId="firstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={form.firstname}
              onChange={(e) => setFormField('firstname', e.target.value)}
              isInvalid={!!errors.firstname}
              placeholder="Enter his firstname"
            />
            <Form.Control.Feedback type="invalid">
              {errors.firstname}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="lastname" className="col-md-6">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={form.lastname}
              onChange={(e) => setFormField('lastname', e.target.value)}
              isInvalid={!!errors.lastname}
              placeholder="Enter his lastname"
            />
            <Form.Control.Feedback type="invalid">
              {errors.lastname}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <Form.Group controlId="birthdate">
          <Form.Label>Date of Birth</Form.Label>
          <DatePicker
            id="birthdate"
            ref={birthdateRef}
            {...datePickerProps}
            placeholder="Click to choose the birthday"
          />
        </Form.Group>
        <Form.Group controlId="startDate">
          <Form.Label>Start Date</Form.Label>
          <DatePicker
            id="startDate"
            ref={startDateRef}
            {...datePickerProps}
            placeholder="Click to choose the start date"
          />
        </Form.Group>

        <fieldset className="address">
          <legend>Address</legend>
          <Form.Group controlId="street">
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              value={form.addressStreet}
              onChange={(e) => setFormField('addressStreet', e.target.value)}
              isInvalid={!!errors.addressStreet}
              placeholder="Enter his street"
            />
            <Form.Control.Feedback type="invalid">
              {errors.addressStreet}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              value={form.addressCity}
              onChange={(e) => setFormField('addressCity', e.target.value)}
              isInvalid={!!errors.addressCity}
              placeholder="Enter his city"
            />
            <Form.Control.Feedback type="invalid">
              {errors.addressCity}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Select
              aria-label="Select state"
              name="state"
              value={form.addressState}
              onChange={(e) => setFormField('addressState', e.target.value)}
              isInvalid={!!errors.addressState}
            >
              <option hidden value="">
                -- Select a State --
              </option>
              {States.map((state) => (
                <option key={`state-${state.abbreviation}`} value={state.name}>
                  {state.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.addressState}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="zip-code">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              placeholder="Enter his Zip code"
              type="number"
              value={form.addressZip}
              onChange={(e) => setFormField('addressZip', e.target.value)}
              isInvalid={!!errors.addressZip}
            />
            <Form.Control.Feedback type="invalid">
              {errors.addressZip}
            </Form.Control.Feedback>
          </Form.Group>
        </fieldset>
        <Form.Group controlId="department">
          <Form.Label>Department</Form.Label>
          <Form.Select
            aria-label="Select department"
            name="department"
            value={form.department}
            onChange={(e) => setFormField('department', e.target.value)}
            isInvalid={!!errors.department}
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
        <Button type="submit" className="create-employee__submit">
          Save
        </Button>
      </Form>
    </div>
  )
}
