import { Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import useWindowFillEmployees from '../../utils/fillEmployes'

export default function Header() {
  const location = useLocation()
  useWindowFillEmployees()

  return (
    <Nav
      as="nav"
      className="justify-content-between align-items-center p-3 mb-5 container-fluid"
    >
      <h1>HRnet</h1>
      {location.pathname == '/' ? (
        <>
          <Link to="/employee-list" className="btn">
            View Current Employees
          </Link>
          <title>HRnet - Create Employee</title>
        </>
      ) : (
        <>
          <Link to="/" className="btn">
            Create Employee
          </Link>
          <title>HRnet - Employees List</title>
        </>
      )}
    </Nav>
  )
}
