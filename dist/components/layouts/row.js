import React, { memo } from 'react';
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
    className: sortKey === key ? 'sorted' : '',
    key: `${key}`,
    "data-testid": `cell-${key}`
  }, data[key])));
});