import React from 'react';
import { createButtonsValuesList } from '../../utils/format';

// Group of page buttons rendering numbered, ellipsis and 'previous'/'next' values
export default function PageButtons({
  currentPage,
  pages,
  setCurrentPage
}) {
  // Define current chunk and last chunk of 10 pages
  const currentChunk = Math.ceil(currentPage / 10);
  const lastCHunk = Math.ceil(pages / 10);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "previous-next-wrapper"
  }, currentChunk > 1 && /*#__PURE__*/React.createElement("button", {
    onClick: () => setCurrentPage(currentPage - 10),
    "aria-label": "previous 10 pages",
    "aria-controls": "table",
    tabIndex: "0",
    "data-testid": "previous-10-button",
    className: "page-button previous-next-button previous-10"
  }, `<<`), currentPage > 1 && /*#__PURE__*/React.createElement("button", {
    onClick: () => setCurrentPage(currentPage - 1),
    "aria-label": "previous page",
    "aria-controls": "table",
    tabIndex: "0",
    "data-testid": "previous-button",
    className: "page-button previous-next-button previous"
  }, `<`), currentPage < pages && /*#__PURE__*/React.createElement("button", {
    onClick: () => setCurrentPage(currentPage + 1),
    "aria-label": "next page",
    "aria-controls": "table",
    tabIndex: "0",
    "data-testid": "next-button",
    className: "page-button previous-next-button next"
  }, `>`), currentChunk < lastCHunk && /*#__PURE__*/React.createElement("button", {
    onClick: () => setCurrentPage(currentPage + 10 > pages ? pages : currentPage + 10),
    "aria-label": "next 10 pages",
    "aria-controls": "table",
    tabIndex: "0",
    "data-testid": "next-10-button",
    className: "page-button previous-next-button next-10"
  }, `>>`)), /*#__PURE__*/React.createElement("div", {
    className: "numbered-wrapper"
  }, pages > 1 && createButtonsValuesList(pages, currentChunk, lastCHunk).map((el, index) => /*#__PURE__*/React.createElement("button", {
    onClick: () => typeof el === 'number' && setCurrentPage(el),
    "data-testid": typeof el === 'number' ? 'page-button' : 'ellipsis-button',
    className: currentPage === el ? 'page-button page-button-active' : typeof el === 'number' ? 'page-button' : 'ellipsis-button',
    key: `${el}-${index}`,
    "aria-controls": "table",
    tabIndex: "0",
    "aria-current": currentPage === el && 'page'
  }, el))));
}