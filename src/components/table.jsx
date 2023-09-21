import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  sliceListInChunks,
  convertIntegerInArray,
  filterList,
  sortList,
} from '../tools/format'
import sortingArrowOrder from '../assets/sort-arrow-order.png'
import sortingArrowDisabled from '../assets/sort-arrow-disabled.png'

export default function Table({ data, columns }) {
  const [entries, setEntries] = useState(10)
  const [page, setPage] = useState(1)
  const [unsortedList, setUnsortedList] = useState(data)
  const [chunksToDisplay, setChunksToDisplay] = useState([])
  const [sort, setSort] = useState({
    key: columns[0].key,
    direction: 'ascending',
    nextDirection: 'descending',
  })
  // console.log('entries', entries)
  // console.log('chunksToDisplay', chunksToDisplay)
  // console.log('page', page)
  // console.log('numberOfPages', chunksToDisplay.length)
  // console.log('unsortedList', unsortedList)
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
      nextDirection:
        sort.direction === 'ascending' ? 'ascending' : 'descending',
    })
  }

  useEffect(() => {
    const sortedList = sortList(unsortedList, sort.key, sort.direction)
    const chunks = sliceListInChunks(sortedList, entries)
    setPage(1)
    setChunksToDisplay(chunks)
  }, [unsortedList, entries, sort.key, sort.direction])

  return (
    <main data-testid="table" className="table-wrapper">
      <div className="table-top">
        <div>
          <label>Entries to display:</label>
          <select
            id="entries"
            name="table-length"
            aria-label="Select number of entries to display"
            aria-controls="table"
            onChange={(e) => setEntries(Number(e.target.value))}
            data-testid="select"
            className="entries-select"
          >
            <option data-testid="option-10" value="10">
              10
            </option>
            <option data-testid="option-25" value="25">
              25
            </option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>{' '}
        </div>
        <div>
          <label>Search:</label>
          <input
            type="search"
            aria-label="Type text to filter rows"
            aria-controls="table"
            onChange={(e) =>
              e.target.value.length > 0
                ? setUnsortedList(filterList(data, e.target.value))
                : setUnsortedList(data)
            }
            data-testid="search-input"
            className="search-input"
          ></input>
        </div>
      </div>
      <table id="table" role="grid" aria-describedby="table-info">
        <thead>
          <tr role="row">
            {columns.map(({ header, key }, index) => (
              <th
                key={`${key}-${index}`}
                onClick={() => {
                  handleHeaderClick(key)
                }}
                onKeyDown={(e) => {
                  e.key === 'Enter' && handleHeaderClick(key)
                }}
                aria-label={`${header} activate to sort column ${
                  key === sort.key ? sort.nextDirection : sort.direction
                } `}
                aria-sort={key === sort.key ? sort.direction : 'none'}
                aria-controls="table"
                tabIndex="0"
                data-testid="head-column"
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
                    alt={
                      key === sort.key
                        ? `Sorted in ${sort.direction} order`
                        : 'Sort'
                    }
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
                role="row"
                data-testid="row"
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
        <span
          data-testid="table-info"
          data-role="status"
          aria-live="polite"
          id="table-info"
          className="table-info"
        >
          Showing {page * entries + 1 - entries} to{' '}
          {page === chunksToDisplay.length
            ? unsortedList.length
            : page * entries}{' '}
          of {unsortedList.length} entries
        </span>
        <div>
          {chunksToDisplay.length > 1 && page > 1 && (
            <button
              onClick={() => setPage(page - 1)}
              aria-label="previous page"
              aria-controls="table"
              tabIndex="0"
              data-testid="previous-next-button"
              className="previous-next-button"
            >
              Previous
            </button>
          )}
          {chunksToDisplay.length > 1 &&
            convertIntegerInArray(chunksToDisplay.length).map(
              (integer, index) => (
                <button
                  onClick={() => setPage(integer)}
                  data-testid="page-button"
                  className={page === index + 1 ? 'active-page' : ''}
                  key={`${integer}-${index}`}
                  aria-controls="table"
                  tabIndex="0"
                  aria-current={page === index + 1 && 'page'}
                >
                  {integer}
                </button>
              )
            )}
          {page < chunksToDisplay.length && (
            <button
              onClick={() => setPage(page + 1)}
              aria-label="next page"
              aria-controls="table"
              tabIndex="0"
              data-testid="previous-next-button"
              className="previous-next-button"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </main>
  )
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
}
