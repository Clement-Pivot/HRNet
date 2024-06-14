import { Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()

  return (
    <Nav className="justify-content-between align-items-center mb-5">
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
