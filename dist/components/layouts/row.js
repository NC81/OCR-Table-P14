import React, { memo } from 'react';

// Classic row rendering list data object
export default /*#__PURE__*/memo(function Row({
  data,
  index,
  sortKey,
  columns
}) {
  return /*#__PURE__*/React.createElement("tr", {
    className: index % 2 === 0 ? 'row-even' : '',
    key: `${index}`,
    role: "row",
    "data-testid": "row"
  }, columns.map(({
    key
  }) => /*#__PURE__*/React.createElement("td", {
    className: sortKey === key ? 'table-cell sorted' : 'table-cell',
    key: `${key}`,
    "data-testid": `cell-${key}`
  }, data[key])));
});