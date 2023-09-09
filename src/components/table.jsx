import Row from './row'
import { mockState } from '../mockState'

export default function Table() {
  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Start Date</th>
            <th>Department</th>
            <th>Date of Birth</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
          </tr>
          {mockState.map((row, index) => (
            <Row data={row} key={`${row}-${index}`} />
          ))}
        </tbody>
      </table>
      <span>Showing 1 to 10 of {mockState.length} entries</span>
    </>
  )
}
