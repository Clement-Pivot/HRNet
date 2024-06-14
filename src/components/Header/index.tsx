import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <>
      <h1>HRnet</h1>
      <Link to="/employee-list">View Current Employees</Link>
    </>
  )
}
