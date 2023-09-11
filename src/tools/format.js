export function sliceListInChunks(mockState, entries, pages) {
  let arrayOfChunks = []

  for (let i = 0; i < pages; i++) {
    if (i === 0) {
      const firstArray = mockState.slice(0, entries)
      arrayOfChunks.push(firstArray)
    } else if (i > 0 && i < pages - 1) {
      const middleArray = mockState.slice(entries * i, entries * i + entries)
      arrayOfChunks.push(middleArray)
    } else {
      const lastArray = mockState.slice(entries * i, mockState.length)
      arrayOfChunks.push(lastArray)
    }
  }
  console.log('arrayOfChunks', arrayOfChunks)
  return arrayOfChunks
}

export function convertIntegerInArray(integer) {
  let i = 0
  let arrayOfIntegers = []

  while (i < integer) {
    i++
    arrayOfIntegers.push(i)
  }
  return arrayOfIntegers
}

export function filterListBySearch(mockState, string) {
  const filteredList = mockState.filter((obj) =>
    Object.values(obj).some((ele) =>
      ele.toLowerCase().includes(string.toLowerCase())
    )
  )
  console.log('filteredList', filteredList)
  return filteredList
}

export function sortArrayOfObjects(array, accessor, direction) {
  const sortedArray = [...array].sort((a, b) => {
    if (a[accessor] < b[accessor]) {
      return -1
    }
    if (a[accessor] > b[accessor]) {
      return 1
    }
    return 0
  })

  if (direction === 'descending') {
    console.log('descending', [...sortedArray].reverse())
    return [...sortedArray].reverse()
  }
  console.log('ascending', sortedArray)
  return sortedArray
}
