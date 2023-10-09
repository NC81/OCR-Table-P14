import React from 'react'
import { createButtonsValuesList } from '../../utils/format'

// Group of page buttons composed of numbered, ellipsis and previous/next buttons
export default function PageButtons({ currentPage, pages, setCurrentPage }) {
  // Define current chunk and last chunk (one chunk equals 10 pages)
  const currentChunk = Math.ceil(currentPage / 10)
  const lastCHunk = Math.ceil(pages / 10)

  return (
    <>
      <div className="previous-next-wrapper">
        {currentChunk > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 10)}
            aria-label="previous 10 pages"
            aria-controls="table"
            tabIndex="0"
            data-testid="previous-10-button"
            className="page-button previous-next-button"
          >
            {`<<`}
          </button>
        )}
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            aria-label="previous page"
            aria-controls="table"
            tabIndex="0"
            data-testid="previous-button"
            className="page-button previous-next-button"
          >
            {`<`}
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
            {`>`}
          </button>
        )}
        {currentChunk < lastCHunk && (
          <button
            onClick={() =>
              setCurrentPage(
                currentPage + 10 > pages ? pages : currentPage + 10
              )
            }
            aria-label="next 10 pages"
            aria-controls="table"
            tabIndex="0"
            data-testid="next-10-button"
            className="page-button previous-next-button"
          >
            {`>>`}
          </button>
        )}
      </div>
      <div className="numbered-wrapper">
        {pages > 1 &&
          createButtonsValuesList(pages, currentChunk, lastCHunk).map(
            (el, index) => (
              <button
                onClick={() => typeof el === 'number' && setCurrentPage(el)}
                data-testid={
                  typeof el === 'number' ? 'page-button' : 'ellipsis-button'
                }
                className={
                  currentPage === el
                    ? 'page-button page-button-active'
                    : typeof el === 'number'
                    ? 'page-button'
                    : 'ellipsis-button'
                }
                key={`${el}-${index}`}
                aria-controls="table"
                tabIndex="0"
                aria-current={currentPage === el && 'page'}
              >
                {el}
              </button>
            )
          )}
      </div>
    </>
  )
}
