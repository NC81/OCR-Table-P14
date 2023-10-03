import React from 'react';
export default function NoDataRow({
  noData,
  noMatch
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, noData ? /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "9",
    className: "no-data-text"
  }, "No data available in table...")) : noMatch ? /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "9",
    className: "no-data-text"
  }, "No matching record found...")) : null);
}