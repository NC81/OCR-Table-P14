import { useState, useEffect } from 'react'
import { mockState } from '../mockState'
import {
  sliceListInChunks,
  convertIntegerInArray,
  filterListBySearch,
  sortArrayOfObjects,
} from '../tools/format'
import sortingArrowOrder from '../assets/sort-arrow-order.png'
import sortingArrowDisabled from '../assets/sort-arrow-disabled.png'

export default function Table() {
  const [entries, setEntries] = useState(10)
  const [numberOfPages, setNumberOfPages] = useState(1)
  const [page, setPage] = useState(1)
  const [list, setList] = useState(mockState)
  const [chunksToDisplay, setChunksToDisplay] = useState([])
  const [sort, setSort] = useState({
    accessor: 'firstName',
    direction: 'ascending',
  })
  // console.log('entries', entries)
  // console.log('chunksToDisplay', chunksToDisplay)
  // console.log('page', page)
  // console.log('numberOfPages', numberOfPages)
  // console.log('list', list)
  // console.log('sort', sort)

  function handleHeaderClick(header) {
    setSort({
      accessor: header,
      direction:
        header === sort.accessor
          ? sort.direction === 'ascending'
            ? 'descending'
            : 'ascending'
          : 'ascending',
    })
  }

  useEffect(() => {
    setNumberOfPages(Math.ceil(list.length / entries))
    setChunksToDisplay(
      sliceListInChunks(
        sortArrayOfObjects(list, sort.accessor, sort.direction),
        entries,
        numberOfPages
      )
    )
  }, [list, entries, numberOfPages, sort.accessor, sort.direction])

  const headers = [
    { label: 'First Name', accessor: 'firstName' },
    { label: 'Last Name', accessor: 'lastName' },
    { label: 'Start Date', accessor: 'startDate' },
    { label: 'Department', accessor: 'department' },
    { label: 'Date of Birth', accessor: 'birthDate' },
    { label: 'Street', accessor: 'street' },
    { label: 'City', accessor: 'city' },
    { label: 'State', accessor: 'state' },
    { label: 'Zip Code', accessor: 'zip' },
  ]

  return (
    <main className="table-wrapper">
      <div className="table-top">
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
            aria-controls="employee-table"
            onChange={(e) =>
              e.target.value.length > 0
                ? setList(filterListBySearch(mockState, e.target.value))
                : setList(mockState)
            }
          ></input>
        </label>
      </div>
      <table>
        <thead>
          <tr>
            {headers.map(({ label, accessor }, index) => (
              <th
                key={`${accessor}-${index}`}
                onClick={() => {
                  handleHeaderClick(accessor)
                }}
              >
                <div className="table-header">
                  <span>{label}</span>
                  {accessor === sort.accessor ? (
                    <img
                      className={`sort-icon ${sort.direction}`}
                      src={sortingArrowOrder}
                      alt=""
                    />
                  ) : (
                    <img
                      className={`sort-icon`}
                      src={sortingArrowDisabled}
                      alt=""
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chunksToDisplay.length > 0 &&
            chunksToDisplay[page - 1].map((row, index) => (
              <tr
                className={index % 2 === 0 ? 'row-even' : ''}
                key={`${index}`}
              >
                {headers.map(({ accessor }) => (
                  <td
                    className={sort.accessor === accessor ? 'sorted' : ''}
                    key={`${accessor}`}
                  >
                    {row[accessor]}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      <div className="table-bottom">
        <span>
          Showing {page * entries + 1 - entries} to{' '}
          {page === numberOfPages ? list.length : page * entries} of{' '}
          {list.length} entries
        </span>
        <div>
          {numberOfPages > 1 && page > 1 && (
            <button onClick={() => setPage(page - 1)}>Précédent</button>
          )}
          {numberOfPages > 1 &&
            convertIntegerInArray(numberOfPages).map((integer, index) => (
              <button
                onClick={() => setPage(integer)}
                className={page === index + 1 ? 'active-page' : ''}
                key={`${integer}-${index}`}
              >
                {integer}
              </button>
            ))}
          {page < numberOfPages && (
            <button onClick={() => setPage(page + 1)}>Suivant</button>
          )}
        </div>
      </div>
    </main>
  )
}
