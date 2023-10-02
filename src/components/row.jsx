import { memo } from 'react'

export default memo(function Row({ data, index, sortKey, columns }) {
  return (
    <tr
      className={index % 2 === 0 ? 'row-even' : ''}
      key={`${index}`}
      role="row"
      data-testid="row"
    >
      {columns.map(({ key }) => (
        <td
          className={sortKey === key ? 'sorted' : ''}
          key={`${key}`}
          data-testid={`cell-${key}`}
        >
          {data[key]}
        </td>
      ))}
    </tr>
  )
})
