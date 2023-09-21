/**
 * Sort original list in ascending/descending direction by property
 * @param { Array } list Original array of objects passed as prop to Table component
 * @param { String } key Key defines objects key whose values are compared
 * @param { String } direction Can be "ascending" or "descending"
 * @returns { Array } Sorted array
 */
export function sortList(list, key, direction) {
  if (key === 'startDate' || key === 'birthDate') {
    const dateArray = list.map((el) => {
      const newDate = new Date(el[key])
      return { ...el, newDate: newDate }
    })
    const sortedDateArray = dateArray.sort((a, b) => a.newDate - b.newDate)
    sortedDateArray.forEach((object) => {
      delete object['newDate']
    })

    if (direction === 'descending') {
      return sortedDateArray.reverse()
    }
    return sortedDateArray
  }

  const sortedArray = list.sort((a, b) => {
    if (a[key] < b[key]) {
      return -1
    }
    if (a[key] > b[key]) {
      return 1
    }
    return 0
  })

  if (direction === 'descending') {
    // console.log('descending')
    return sortedArray.reverse()
  }
  // console.log('ascending')
  return sortedArray
}

/**
 * Filter original list by string typed in search input
 * @param { Array } list Original array of objects passed as prop to Table component
 * @param { String } string String to be found in objects
 * @returns { Array } Filtered array
 */
export function filterList(list, string) {
  const filteredList = list.filter((obj) =>
    Object.values(obj).some((ele) =>
      ele.toLowerCase().includes(string.toLowerCase())
    )
  )
  // console.log('filteredList', filteredList)
  return filteredList
}

/**
 * Slice list in chunks representing pages
 * @param { Array } list Array of objects
 * @param { Integer } entries Number representing rows to render on each page
 * @returns { Array } Array of chunks to be rendered, one per page
 */
export function sliceListInChunks(list, entries) {
  const pages = Math.ceil(list.length / entries)
  let arrayOfChunks = []

  for (let i = 0; i < pages; i++) {
    if (i === 0) {
      const firstArray = list.slice(0, entries)
      arrayOfChunks.push(firstArray)
    } else if (i > 0 && i < pages - 1) {
      const middleArray = list.slice(entries * i, entries * i + entries)
      arrayOfChunks.push(middleArray)
    } else {
      const lastArray = list.slice(entries * i, list.length)
      arrayOfChunks.push(lastArray)
    }
  }
  // console.log('arrayOfChunks', arrayOfChunks)
  return arrayOfChunks
}

/**
 * Create an array of elements to render page buttons accordingly
 * @param { Integer } integer Number of chunks representing page buttons to render
 * @returns { Array } Array whose length equals the integer
 */
export function convertIntegerInArray(chunksNumber) {
  let i = 0
  let arrayOfIntegers = []

  while (i < chunksNumber) {
    i++
    arrayOfIntegers.push(i)
  }
  return arrayOfIntegers
}
