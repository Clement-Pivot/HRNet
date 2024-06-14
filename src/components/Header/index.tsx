import { Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()

  return (
    <Nav
      as="nav"
      className="justify-content-between align-items-center p-3 mb-5 container-fluid"
    >
      <h1>HRnet</h1>
      {location.pathname == '/' ? (
        <>
          <Link to="/employee-list">View Current Employees</Link>
          <title>HRnet - Create Employee</title>
        </>
      ) : (
        <>
          <Link to="/">Create Employee</Link>
          <title>HRnet - Employees List</title>
        </>
      )}
    </Nav>
  )
}
