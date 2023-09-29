import { useState, useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { filterList, sortList } from '../tools/format'
import { defaultColumns } from '../tools/columns'
import NoDataRow from './no-data-row'
import Buttons from './buttons'
import Head from './head'
import Row from './row'

export default function Table({ data, columns = defaultColumns }) {
  const refData = useRef(data)
  const [baseList, setBaseList] = useState(data)
  const [newList, setNewList] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [entries, setEntries] = useState(10)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState({
    key: columns[0].key,
    direction: 'ascending',
    nextDirection: 'descending',
  })

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

  const totalPages = Math.ceil((baseList.length + newList.length) / entries)
  const totalLength = baseList.length + newList.length

  const giveAuthToDisplay = useCallback(
    (index) => {
      const fromValue = currentPage * entries - entries
      const toValue = currentPage * entries - 1
      const range = [fromValue, toValue]
      return index >= range[0] && index <= range[1] ? true : false
    },
    [entries, currentPage]
  )

  const getNewRowPage = useCallback(() => {
    const totalLength = baseList.length + newList.length
    const freeSpots = totalPages * entries - totalLength
    if (freeSpots > 0) {
      return totalPages
    }
    return totalPages + 1
  }, [entries, totalPages, baseList.length, newList.length])

  useEffect(() => {
    setNewList([])
    setCurrentPage(1)
    const activeList = search.length > 0 ? filteredList : refData.current
    const sortedList = sortList([...activeList], sort.key, sort.direction)
    setBaseList(sortedList)
  }, [entries, filteredList, search.length, sort.key, sort.direction])

  useEffect(() => {
    if (data.length > refData.current.length) {
      refData.current = data
      const lastAddition = data[data.length - 1]
      setNewList([...newList, { page: getNewRowPage(), data: lastAddition }])
    }
  }, [data, newList, getNewRowPage])

  return (
    <div data-testid="table" className="table-wrapper">
      <div className="table-top">
        <div>
          <label htmlFor="entries-select">Entries to display:</label>
          <select
            id="entries-select"
            name="table-length"
            aria-label="Select number of entries to display"
            aria-controls="table"
            onChange={(e) => setEntries(Number(e.target.value))}
            data-testid="entries-select"
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
          <label htmlFor="search-input">Search:</label>
          <input
            value={search}
            id="search-input"
            type="search"
            aria-label="Type text to filter rows"
            aria-controls="table"
            onChange={(e) => {
              setSearch(e.target.value)
              e.target.value.length > 0
                ? setFilteredList(filterList(data, e.target.value))
                : setFilteredList([])
            }}
            data-testid="search-input"
            className="search-input"
          ></input>
        </div>
      </div>
      <table id="table" role="grid" aria-describedby="table-info">
        <thead>
          <Head
            sort={sort}
            handleHeaderClick={handleHeaderClick}
            columns={columns}
          />
        </thead>
        <tbody>
          <NoDataRow
            noData={data.length === 0}
            noMatch={search.length > 0 && filteredList.length === 0}
          />
          {baseList.map((row, index) => (
            <Row
              data={row}
              display={giveAuthToDisplay(index)}
              key={`${row.firstName}-${index}`}
              index={index}
              sortKey={sort.key}
              columns={columns}
            />
          ))}
          {newList
            .filter((el) => el.page === currentPage)
            .map((row, index) => (
              <Row
                data={row.data}
                display={true}
                key={`${row.data.firstName}-${index}`}
                index={index}
                sortKey={sort.key}
                columns={columns}
                className="new-row"
              />
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
          {totalLength === 0
            ? 'Showing no entries'
            : `Showing ${currentPage * entries + 1 - entries} to ${
                currentPage === totalPages ? totalLength : currentPage * entries
              } of ${totalLength} entries`}
        </span>
        <Buttons
          currentPage={currentPage}
          totalPages={totalPages}
          totalLength={totalLength}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  )
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object.isRequired),
}
