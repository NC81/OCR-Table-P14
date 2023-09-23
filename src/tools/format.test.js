import '@testing-library/jest-dom'
import {
  sortList,
  filterList,
  sliceListInChunks,
  convertIntegerInArray,
} from './format'

describe('Given I want sortList() to sort an array by properties', () => {
  const arrayToSort = [
    { city: 'New York', state: 'NY' },
    { city: 'Chicago', state: 'IL' },
    { city: 'Los Angeles', state: 'CA' },
  ]

  it('should correctly sort in ascending order', () => {
    const sortedList = sortList(arrayToSort, 'city', 'ascending')
    const expectedArray = [
      { city: 'Chicago', state: 'IL' },
      { city: 'Los Angeles', state: 'CA' },
      { city: 'New York', state: 'NY' },
    ]
    expect(sortedList).toEqual(expectedArray)
  })

  it('should correctly sort in descending order', () => {
    const sortedList = sortList(arrayToSort, 'city', 'descending')
    const expectedArray = [
      { city: 'New York', state: 'NY' },
      { city: 'Los Angeles', state: 'CA' },
      { city: 'Chicago', state: 'IL' },
    ]
    expect(sortedList).toEqual(expectedArray)
  })
})

describe('Given I want filterList() to filter an array by string', () => {
  const arrayToFilter = [
    { firstName: 'Chris', LastName: 'Roberts' },
    { firstName: 'Swen', LastName: 'Vincke' },
    { firstName: 'Brian', LastName: 'Fargo' },
  ]

  it('should only keep objects containing the string', () => {
    const filteredList = filterList(arrayToFilter, 'SW')
    const expectedArray = [{ firstName: 'Swen', LastName: 'Vincke' }]
    expect(filteredList).toEqual(expectedArray)
  })
})

describe('Given I want sliceListInChunks() to slice my list in chunks of x elements', () => {
  const arrayToSlice = [
    { city: 'New York', state: 'NY' },
    { city: 'Chicago', state: 'IL' },
    { city: 'Los Angeles', state: 'CA' },
    { city: 'New Orleans', state: 'LA' },
    { city: 'Washington ', state: 'WA' },
    { city: 'Nashville', state: 'TN' },
  ]

  it('should create an array of chunks accordingly', () => {
    const chunks = sliceListInChunks(arrayToSlice, 2)
    const expectedArray = [
      [
        { city: 'New York', state: 'NY' },
        { city: 'Chicago', state: 'IL' },
      ],
      [
        { city: 'Los Angeles', state: 'CA' },
        { city: 'New Orleans', state: 'LA' },
      ],
      [
        { city: 'Washington ', state: 'WA' },
        { city: 'Nashville', state: 'TN' },
      ],
    ]
    expect(chunks).toEqual(expectedArray)
  })
})

describe('Given I want convertIntegerInArray() to create an array whose length equals an integer', () => {
  it('should create an array with correct length', () => {
    const arrayToInteger = convertIntegerInArray(3)
    const expectedArray = [1, 2, 3]
    expect(arrayToInteger).toEqual(expectedArray)
  })
})
