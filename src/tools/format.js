export function sliceEmployeesListInChunks(mockState, entries, pages) {
  console.log('length', mockState.length)
  console.log('pages', pages)
  let arrayOfChunks = []

  for (let i = 0; i < pages; i++) {
    console.log('i =', i)
    if (i === 0) {
      console.log('slice 1')
      const firstArray = mockState.slice(0, entries)
      arrayOfChunks.push(firstArray)
    } else if (i > 0 && i < pages - 1) {
      console.log('slice 2')
      const middleArray = mockState.slice(entries * i, entries * i + entries)
      arrayOfChunks.push(middleArray)
    } else {
      console.log('slice 3')
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
  console.log('arrayOfIntegers', arrayOfIntegers)
  return arrayOfIntegers
}
