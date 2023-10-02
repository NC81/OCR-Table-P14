export default function NoDataRow({ noData, noMatch }) {
  return (
    <>
      {noData ? (
        <tr>
          <td colSpan="9" className="no-data-text">
            No data available in table...
          </td>
        </tr>
      ) : noMatch ? (
        <tr>
          <td colSpan="9" className="no-data-text">
            No matching record found...
          </td>
        </tr>
      ) : null}
    </>
  )
}
