/**
 * Filter original list by string typed in search input
 * @param { Array } list Original array of objects passed as prop to Table component
 * @param { String } string String to be found in objects
 * @returns { Array } Filtered array
 */
export function filterList(list, string) {
  const filteredList = list.filter(obj => Object.values(obj).some(ele => ele.toLowerCase().includes(string.toLowerCase())));
  return filteredList;
}

/**
 * Sort list in ascending/descending direction by properties
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
 * Create an array of elements representing page buttons rendered values
 * @param { Integer } currentPage Current page required to define current chunk of 10 pages
 * @param { Integer } pages Total pages required to define last chunk of 10 pages
 * @returns { Array } Array of page buttons values
 */

export function createButtonsValues(currentPage, pages) {
  console.log('currentpage', currentPage);
  console.log('pages', pages);
  const currentChunk = Math.ceil(currentPage / 10);
  const lastCHunk = Math.ceil(pages / 10);
  console.log('currentChunk', currentChunk);
  console.log('lastCHunk', lastCHunk);
  let buttonsValues = [];
  if (pages <= 10) {
    console.log('test1');
    for (let i = 1; i <= pages; i++) {
      buttonsValues.push(i);
    }
  } else if (currentPage <= 10 && pages > 10) {
    console.log('test2');
    for (let i = 1; i <= 10; i++) {
      buttonsValues.push(i);
    }
    buttonsValues.push('+', pages);
  } else if (currentPage > 10 && currentChunk < lastCHunk) {
    console.log('test3');
    buttonsValues.push(1, '-');
    for (let i = currentChunk * 10 - 9; i <= currentChunk * 10; i++) {
      buttonsValues.push(i);
    }
    buttonsValues.push('+', pages);
  } else if (currentPage > 10 && currentChunk === lastCHunk) {
    console.log('test4');
    buttonsValues.push(1, '-');
    for (let i = currentChunk * 10 - 9; i <= pages; i++) {
      buttonsValues.push(i);
    }
  }
  console.log('arrayOfIntegers2', buttonsValues);
  return buttonsValues;
}