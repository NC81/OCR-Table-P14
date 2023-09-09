export default function Row({ data }) {
  return (
    <tr>
      <td>{data.firstName}</td>
      <td>{data.lastName}</td>
      <td>{data.startDate}</td>
      <td>{data.department}</td>
      <td>{data.birthDate}</td>
      <td>{data.street}</td>
      <td>{data.city}</td>
      <td>{data.state}</td>
      <td>{data.zip}</td>
    </tr>
  )
}
