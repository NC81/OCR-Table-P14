import React from 'react';
import sortingArrowOrder from '../../assets/sort-arrow-order.png';
import sortingArrowDisabled from '../../assets/sort-arrow-disabled.png';
export default function Head({
  sort,
  handleHeaderClick,
  columns
}) {
  return /*#__PURE__*/React.createElement("tr", {
    role: "row"
  }, columns.map(({
    header,
    key
  }, index) => /*#__PURE__*/React.createElement("th", {
    key: `${key}-${index}`,
    onClick: () => {
      handleHeaderClick(key);
    },
    onKeyDown: e => {
      e.key === 'Enter' && handleHeaderClick(key);
    },
    "aria-label": `${header} activate to sort column ${key === sort.key && sort.direction === 'ascending' ? 'descending' : 'ascending'} 
          `,
    "aria-sort": key === sort.key ? sort.direction : 'none',
    "aria-controls": "table",
    tabIndex: "0",
    "data-testid": "head-column"
  }, /*#__PURE__*/React.createElement("div", {
    className: "table-header"
  }, /*#__PURE__*/React.createElement("span", {
    "data-testid": "header-title"
  }, header), /*#__PURE__*/React.createElement("img", {
    className: `sort-icon ${key === sort.key ? sort.direction : ''}`,
    src: key === sort.key ? sortingArrowOrder : sortingArrowDisabled,
    alt: key === sort.key ? `Sorted in ${sort.direction} order` : 'Sort'
  })))));
}