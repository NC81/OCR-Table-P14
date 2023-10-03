import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { filterList, sortList } from '../utils/format/format';
import { defaultColumns } from '../utils/columns';
import NoDataRow from './layouts/no-data-row';
import Buttons from './layouts/buttons';
import Head from './layouts/head';
import Row from './layouts/row';
import '../index.css';

// Parent component rendering whole table
export default function Table({
  data,
  columns = defaultColumns
}) {
  const refData = useRef(data);
  const [baseList, setBaseList] = useState(data);
  const [filteredList, setFilteredList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState({
    key: columns[0].key,
    direction: 'ascending'
  });

  // Set new sort state on clicking headers
  function handleHeaderClick(header) {
    setSort({
      key: header,
      direction: header === sort.key ? sort.direction === 'ascending' ? 'descending' : 'ascending' : 'ascending'
    });
  }

  // Number of pages required to render every rows with entries state
  const pages = Math.ceil(baseList.length / entries);

  // Start/end indexes defining range for rendered list
  const sliceStartIndex = currentPage * entries - entries;
  const sliceEndIndex = currentPage * entries;

  // When data prop is updated, set refData and rendered list
  useEffect(() => {
    if (data.length > refData.current.length) {
      refData.current = data;
      const lastAddition = data[data.length - 1];
      setBaseList([...baseList, lastAddition]);
    }
  }, [data, baseList, entries]);

  // When search and sort states are updated, go to first page, sort list and set rendered list
  useEffect(() => {
    setCurrentPage(1);
    const activeList = search.length > 0 ? filteredList : refData.current;
    const sortedList = sortList([...activeList], sort.key, sort.direction);
    setBaseList(sortedList);
  }, [filteredList, search, sort]);

  // When entries state is updated, go to first page
  useEffect(() => {
    setCurrentPage(1);
  }, [entries]);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "table-top"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "entries-select"
  }, "Entries to display:"), /*#__PURE__*/React.createElement("select", {
    id: "entries-select",
    name: "table-length",
    "aria-label": "Select number of entries to display",
    "aria-controls": "table",
    onChange: e => setEntries(Number(e.target.value)),
    "data-testid": "entries-select",
    className: "entries-select"
  }, /*#__PURE__*/React.createElement("option", {
    "data-testid": "option-10",
    value: "10"
  }, "10"), /*#__PURE__*/React.createElement("option", {
    "data-testid": "option-25",
    value: "25"
  }, "25"), /*#__PURE__*/React.createElement("option", {
    value: "50"
  }, "50"), /*#__PURE__*/React.createElement("option", {
    value: "100"
  }, "100")), ' '), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "search-input"
  }, "Search:"), /*#__PURE__*/React.createElement("input", {
    value: search,
    id: "search-input",
    type: "search",
    "aria-label": "Type text to filter rows",
    "aria-controls": "table",
    onChange: e => {
      setSearch(e.target.value);
      e.target.value.length > 0 ? setFilteredList(filterList(data, e.target.value)) : setFilteredList([]);
    },
    "data-testid": "search-input",
    className: "search-input"
  }))), /*#__PURE__*/React.createElement("table", {
    className: "table",
    id: "table",
    role: "grid",
    "aria-describedby": "table-info"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement(Head, {
    sort: sort,
    handleHeaderClick: handleHeaderClick,
    columns: columns
  })), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement(NoDataRow, {
    noData: refData.current.length === 0,
    noMatch: search.length > 0 && filteredList.length === 0
  }), baseList.slice(sliceStartIndex, sliceEndIndex).map((row, index) => /*#__PURE__*/React.createElement(Row, {
    data: row,
    key: `${row.firstName}-${index}`,
    index: index,
    sortKey: sort.key,
    columns: columns
  })))), /*#__PURE__*/React.createElement("div", {
    className: "table-bottom"
  }, /*#__PURE__*/React.createElement("span", {
    "data-testid": "table-info",
    "data-role": "status",
    "aria-live": "polite",
    id: "table-info",
    className: "table-info"
  }, baseList.length === 0 ? 'Showing no entries' : `Showing ${currentPage * entries + 1 - entries} to ${currentPage === pages ? baseList.length : currentPage * entries} of ${baseList.length} entries`), /*#__PURE__*/React.createElement(Buttons, {
    currentPage: currentPage,
    pages: pages,
    length: baseList.length,
    setCurrentPage: setCurrentPage
  })));
}
Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object.isRequired)
};