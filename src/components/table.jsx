import { useState, useEffect } from 'react'
import {
  sliceListInChunks,
  convertIntegerInArray,
  filterListBySearch,
  sortArrayOfObjects,
} from '../tools/format'
import sortingArrowOrder from '../assets/sort-arrow-order.png'
import sortingArrowDisabled from '../assets/sort-arrow-disabled.png'

export default function Table({ data }) {
  const [entries, setEntries] = useState(10)
  const [numberOfPages, setNumberOfPages] = useState(1)
  const [page, setPage] = useState(1)
  const [list, setList] = useState(data)
  const [chunksToDisplay, setChunksToDisplay] = useState([])
  const [sort, setSort] = useState({
    key: 'firstName',
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
      key: header,
      direction:
        header === sort.key
          ? sort.direction === 'ascending'
            ? 'descending'
            : 'ascending'
          : 'ascending',
    })
  }

  useEffect(() => {
    const sortedList = sortArrayOfObjects(list, sort.key, sort.direction)
    setNumberOfPages(Math.ceil(list.length / entries))
    const listOfChunks = sliceListInChunks(sortedList, entries, numberOfPages)
    setChunksToDisplay(listOfChunks)
  }, [list, entries, numberOfPages, sort.key, sort.direction])

  const columns = [
    { key: 'firstName', header: 'First Name' },
    { key: 'lastName', header: 'Last Name' },
    { key: 'startDate', header: 'Start Date' },
    { key: 'department', header: 'Department' },
    { key: 'birthDate', header: 'Date of Birth' },
    { key: 'street', header: 'Street' },
    { key: 'city', header: 'City' },
    { key: 'state', header: 'State' },
    { key: 'zip', header: 'Zip Code' },
  ]

  return (
    <main className="table-wrapper">
      <div className="table-top">
        <header>
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
        </header>
        <header>
          Search:
          <input
            type="search"
            aria-controls="employee-table"
            onChange={(e) =>
              e.target.value.length > 0
                ? setList(filterListBySearch(data, e.target.value))
                : setList(data)
            }
          ></input>
        </header>
      </div>
      <table>
        <thead>
          <tr>
            {columns.map(({ header, key }, index) => (
              <th
                key={`${key}-${index}`}
                onClick={() => {
                  handleHeaderClick(key)
                }}
              >
                <div className="table-header">
                  <span>{header}</span>
                  <img
                    className={`sort-icon ${
                      key === sort.key ? sort.direction : ''
                    }`}
                    src={
                      key === sort.key
                        ? sortingArrowOrder
                        : sortingArrowDisabled
                    }
                    alt=""
                  />
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
                {columns.map(({ key }) => (
                  <td
                    className={sort.key === key ? 'sorted' : ''}
                    key={`${key}`}
                  >
                    {row[key]}
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
