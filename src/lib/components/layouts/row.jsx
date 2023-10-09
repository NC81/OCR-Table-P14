import React, { memo } from 'react'

// Classic row rendering list data object
export default memo(function Row({ data, index, sortKey, columns }) {
  return (
    <tr
      className={index % 2 === 0 ? 'body-row row-even' : 'body-row'}
      key={`${index}`}
      role="row"
      data-testid="row"
    >
      {columns.map(({ key }) => (
        <td
          className={sortKey === key ? 'body-cell sorted' : 'body-cell'}
          key={`${key}`}
          data-testid={`cell-${key}`}
        >
          {data[key]}
        </td>
      ))}
    </tr>
  )
})
