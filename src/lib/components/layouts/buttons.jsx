import React from 'react'
import { convertIntegerInArray } from '../../utils/format/format'

// Page buttons group composed of numbered and previous/next buttons
export default function Buttons({
  currentPage,
  pages,
  length,
  setCurrentPage,
}) {
  return (
    <div>
      {length > 1 && currentPage > 1 && (
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          aria-label="previous page"
          aria-controls="table"
          tabIndex="0"
          data-testid="previous-button"
          className="previous-next-button"
        >
          Previous
        </button>
      )}
      {pages > 1 &&
        convertIntegerInArray(pages).map((integer, index) => (
          <button
            onClick={() => setCurrentPage(integer)}
            data-testid="page-button"
            className={currentPage === index + 1 ? 'active-page' : ''}
            key={`${integer}-${index}`}
            aria-controls="table"
            tabIndex="0"
            aria-current={currentPage === index + 1 && 'page'}
          >
            {integer}
          </button>
        ))}
      {currentPage < pages && (
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          aria-label="next page"
          aria-controls="table"
          tabIndex="0"
          data-testid="next-button"
          className="previous-next-button"
        >
          Next
        </button>
      )}
    </div>
  )
}
