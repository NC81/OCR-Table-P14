import { useState, useEffect } from 'react'
import { mockState } from '../mockState'
import {
  sliceListInChunks,
  convertIntegerInArray,
  filterListBySearch,
} from '../tools/format'
import Row from './row'

export default function Table() {
  const [entries, setEntries] = useState(10)
  const [numberOfPages, setNumberOfPages] = useState(1)
  const [page, setPage] = useState(1)
  const [list, setList] = useState(mockState)
  const [chunksToDisplay, setChunksToDisplay] = useState([])
  console.log('entries', entries)
  console.log('chunksToDisplay', chunksToDisplay)
  console.log('page', page)
  console.log('numberOfPages', numberOfPages)
  console.log('list', list)

  useEffect(() => {
    setNumberOfPages(Math.ceil(list.length / entries))
    setChunksToDisplay(sliceListInChunks(list, entries, numberOfPages))
  }, [list, entries, numberOfPages])

  return (
    <>
      <label>
        Show{' '}
        <select
          name="employee-table_length"
          aria-controls="employee-table"
          className=""
          onChange={(e) => setEntries(Number(e.target.value))}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>{' '}
        entries
      </label>
      <label>
        Search:
        <input
          type="search"
          className=""
          placeholder=""
          aria-controls="employee-table"
          onChange={(e) =>
            e.target.value.length > 0
              ? setList(filterListBySearch(mockState, e.target.value))
              : setList(mockState)
          }
        ></input>
      </label>
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
          {chunksToDisplay.length > 0 &&
            chunksToDisplay[page - 1].map((row, index) => (
              <Row data={row} key={`${row}-${index}`} />
            ))}
        </tbody>
      </table>
      <span>
        Showing {page * entries + 1 - entries} to{' '}
        {page === numberOfPages ? list.length : page * entries} of {list.length}{' '}
        entries
      </span>
      {numberOfPages > 1 && page > 1 && (
        <button onClick={() => setPage(page - 1)}>Précédent</button>
      )}
      {convertIntegerInArray(numberOfPages).map((integer, index) => (
        <button onClick={() => setPage(integer)} key={`${integer}-${index}`}>
          {integer}
        </button>
      ))}
      {page < numberOfPages && (
        <button onClick={() => setPage(page + 1)}>Suivant</button>
      )}
    </>
  )
}
