/**
 * Filter list by string typed in search input
 *
 * @param { Array } list Array of objects representing rows
 * @param { String } string String to be found in objects
 * @returns { Array } Filtered array
 */
export function filterList(list, string) {
  const filteredList = list.filter(obj => Object.values(obj).some(ele => ele.toLowerCase().includes(string.toLowerCase())));
  return filteredList;
}

/**
 * Sort list in ascending/descending direction by properties
 *
 * @param { Array } list Array of objects representing rows
 * @param { String } key Object key whose value is compared
 * @param { String } direction Can be "ascending" or "descending"
 * @returns { Array } Sorted array
 */
export function sortList(list, key, direction) {
  if (key.toLowerCase().includes('date')) {
    const dateArray = list.map(el => {
      const newDate = new Date(el[key]);
      return {
        ...el,
        newDate: newDate
      };
    });
    const sortedDateArray = dateArray.sort((a, b) => a.newDate - b.newDate);
    sortedDateArray.forEach(object => {
      delete object['newDate'];
    });
    if (direction === 'descending') {
      return sortedDateArray.reverse();
    }
    return sortedDateArray;
  }
  const sortedArray = list.sort((a, b) => {
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  });
  if (direction === 'descending') {
    return sortedArray.reverse();
  }
  return sortedArray;
}

/**
 * Create an array of elements composed of numbers and ellipsis defining page buttons values
 *
 * @param { Integer } pages Total pages
 * @param { Integer } currentChunk Current chunk of 10 pages
 * @param { Integer } lastCHunk Last chunk of 10 pages
 * @returns { Array } Array of page buttons rendered values
 */
export function createButtonsValuesList(pages, currentChunk, lastCHunk) {
  let buttonsValues = [];
  if (pages <= 10) {
    for (let i = 1; i <= pages; i++) {
      buttonsValues.push(i);
    }
  } else if (currentChunk === 1 && lastCHunk > 1) {
    for (let i = 1; i <= 10; i++) {
      buttonsValues.push(i);
    }
    buttonsValues.push('...', pages);
  } else if (currentChunk > 1 && currentChunk < lastCHunk) {
    buttonsValues.push(1, '...');
    for (let i = currentChunk * 10 - 9; i <= currentChunk * 10; i++) {
      buttonsValues.push(i);
    }
    buttonsValues.push('...', pages);
  } else if (currentChunk > 1 && currentChunk === lastCHunk) {
    buttonsValues.push(1, '...');
    for (let i = currentChunk * 10 - 9; i <= pages; i++) {
      buttonsValues.push(i);
    }
  }
  return buttonsValues;
}