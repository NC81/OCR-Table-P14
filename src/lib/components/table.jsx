import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { filterList, sortList } from '../utils/format/format'
import { defaultColumns } from '../utils/columns'
import NoDataRow from './layouts/no-data-row'
import Buttons from './layouts/buttons'
import Head from './layouts/head'
import Row from './layouts/row'
import '../index.css'

export default function Table({ data, columns = defaultColumns }) {
  const refData = useRef(data)
  const [baseList, setBaseList] = useState(data)
  const [filteredList, setFilteredList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [entries, setEntries] = useState(10)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState({
    key: columns[0].key,
    direction: 'ascending',
  })

  // Set new sort state on clicking headers
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

  // Number of pages required to render all data
  const pages = Math.ceil(baseList.length / entries)

  // Start/end indexes defining range for rendered list
  const sliceStartIndex = currentPage * entries - entries
  const sliceEndIndex = currentPage * entries

  // When data prop is updated, set refData and rendered list
  useEffect(() => {
    if (data.length > refData.current.length) {
      refData.current = data
      const lastAddition = data[data.length - 1]
      setBaseList([...baseList, lastAddition])
    }
  }, [data, baseList, entries])

  // When search and sort states are updated, go to first page, sort list and set rendered list
  useEffect(() => {
    setCurrentPage(1)
    const activeList = search.length > 0 ? filteredList : refData.current
    const sortedList = sortList([...activeList], sort.key, sort.direction)
    setBaseList(sortedList)
  }, [filteredList, search, sort])

  // When entries state is updated, go to first page
  useEffect(() => {
    setCurrentPage(1)
  }, [entries])

  return (
    <div className="table-wrapper">
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
            noData={refData.current.length === 0}
            noMatch={search.length > 0 && filteredList.length === 0}
          />
          {baseList.slice(sliceStartIndex, sliceEndIndex).map((row, index) => (
            <Row
              data={row}
              key={`${row.firstName}-${index}`}
              index={index}
              sortKey={sort.key}
              columns={columns}
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
          {baseList.length === 0
            ? 'Showing no entries'
            : `Showing ${currentPage * entries + 1 - entries} to ${
                currentPage === pages ? baseList.length : currentPage * entries
              } of ${baseList.length} entries`}
        </span>
        <Buttons
          currentPage={currentPage}
          pages={pages}
          length={baseList.length}
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
