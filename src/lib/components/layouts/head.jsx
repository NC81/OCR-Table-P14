import React from 'react'
import sortingArrowOrder from '../../assets/sort-arrow-order.png'
import sortingArrowDisabled from '../../assets/sort-arrow-disabled.png'

// Head row rendering columns header titles with deep accessibility
export default function Head({ sort, handleHeaderClick, columns }) {
  return (
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
            key === sort.key && sort.direction === 'ascending'
              ? 'descending'
              : 'ascending'
          } 
          `}
          aria-sort={key === sort.key ? sort.direction : 'none'}
          aria-controls="table"
          tabIndex="0"
          data-testid="head-column"
        >
          <div className="table-header">
            <span data-testid="header-title">{header}</span>
            <img
              className={`sort-icon ${key === sort.key ? sort.direction : ''}`}
              src={key === sort.key ? sortingArrowOrder : sortingArrowDisabled}
              alt={
                key === sort.key ? `Sorted in ${sort.direction} order` : 'Sort'
              }
            />
          </div>
        </th>
      ))}
    </tr>
  )
}
