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
 * Sort list in ascending/descending direction by properties
 * @param { Array } list Array of objects representing rows
 * @param { String } key Object key whose value is compared
 * @param { String } direction Can be "ascending" or "descending"
 * @returns { Array } Sorted array
 */
export function sortList(list, key, direction) {
  if (key.toLowerCase().includes('date')) {
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
    return sortedArray.reverse()
  }
  return sortedArray
}

/**
 * Create an array whose length corresponds to the number of desired page buttons
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
