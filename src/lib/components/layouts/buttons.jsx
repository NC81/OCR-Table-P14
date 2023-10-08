import React from 'react'
import { createButtonsValues } from '../../utils/format'

// Page buttons group composed of numbered and previous/next buttons
export default function PageButtons({
  currentPage,
  pages,
  length,
  setCurrentPage,
}) {
  function operatorSetCurrentPage(currentPage, string) {
    if (string === '-') {
      setCurrentPage(currentPage - 10)
    } else {
      setCurrentPage(currentPage + 10 > pages ? pages : currentPage + 10)
    }
  }

  return (
    <>
      <div className="previous-next-wrapper">
        {length > 1 && currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            aria-label="previous page"
            aria-controls="table"
            tabIndex="0"
            data-testid="previous-button"
            className="page-button previous-next-button"
          >
            Previous
          </button>
        )}
        {currentPage < pages && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            aria-label="next page"
            aria-controls="table"
            tabIndex="0"
            data-testid="next-button"
            className="page-button previous-next-button"
          >
            Next
          </button>
        )}
      </div>
      <div className="numbered-wrapper">
        {pages > 1 &&
          createButtonsValues(currentPage, pages).map((el, index) => (
            <button
              onClick={() =>
                typeof el !== 'number'
                  ? operatorSetCurrentPage(currentPage, el)
                  : setCurrentPage(el)
              }
              data-testid="page-button"
              className={
                currentPage === el
                  ? 'page-button page-button-active'
                  : 'page-button'
              }
              key={`${el}-${index}`}
              aria-controls="table"
              tabIndex="0"
              aria-current={currentPage === el && 'page'}
            >
              {el}
            </button>
          ))}
      </div>
    </>
  )
}
