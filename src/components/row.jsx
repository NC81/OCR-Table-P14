import { memo } from 'react'

export default memo(function Row({
  display,
  data,
  index,
  sortKey,
  className,
  columns,
}) {
  return (
    <>
      {display ? (
        <tr
          className={index % 2 === 0 ? 'row-even' : ''}
          key={`${index}`}
          role="row"
          data-testid="row"
        >
          {columns.map(({ key }) => (
            <td
              className={
                sortKey === key ? `sorted ${className}` : `${className}`
              }
              key={`${key}`}
              data-testid={`cell-${key}`}
            >
              {data[key]}
            </td>
          ))}
        </tr>
      ) : null}
    </>
  )
})
