import '@testing-library/jest-dom'
import {
  sortList,
  filterList,
  sliceListInChunks,
  convertIntegerInArray,
} from './format'

const arrayToTest = [
  { firstName: 'Feargus', birthDate: '04/19/1970' },
  { firstName: 'Chris', birthDate: '05/27/1968' },
  { firstName: 'Swen', birthDate: '05/30/1972' },
  { firstName: 'Todd', birthDate: '10/06/1970' },
  { firstName: 'Brian', birthDate: '12/15/1962' },
  { firstName: 'Frederick', birthDate: '05/15/1966' },
]

describe('Given I want sortList() to sort an array by object properties', () => {
  it('should correctly sort text in ascending order', () => {
    const sortedList = sortList([...arrayToTest], 'firstName', 'ascending')
    const expectedArray = [
      { firstName: 'Brian', birthDate: '12/15/1962' },
      { firstName: 'Chris', birthDate: '05/27/1968' },
      { firstName: 'Feargus', birthDate: '04/19/1970' },
      { firstName: 'Frederick', birthDate: '05/15/1966' },
      { firstName: 'Swen', birthDate: '05/30/1972' },
      { firstName: 'Todd', birthDate: '10/06/1970' },
    ]
    expect(sortedList).toEqual(expectedArray)
  })

  it('should correctly sort date in descending order', () => {
    const sortedList = sortList([...arrayToTest], 'birthDate', 'descending')
    const expectedArray = [
      { firstName: 'Swen', birthDate: '05/30/1972' },
      { firstName: 'Todd', birthDate: '10/06/1970' },
      { firstName: 'Feargus', birthDate: '04/19/1970' },
      { firstName: 'Chris', birthDate: '05/27/1968' },
      { firstName: 'Frederick', birthDate: '05/15/1966' },
      { firstName: 'Brian', birthDate: '12/15/1962' },
    ]
    expect(sortedList).toEqual(expectedArray)
  })
})

describe('Given I want filterList() to filter an array by case insensitive string', () => {
  it('should only keep objects containing the string', () => {
    const filteredList = filterList(arrayToTest, 'SW')
    const expectedArray = [{ firstName: 'Swen', birthDate: '05/30/1972' }]
    expect(filteredList).toEqual(expectedArray)
  })
})

describe('Given I want sliceListInChunks() to slice my list in chunks of x elements', () => {
  it('should create an array of chunks accordingly', () => {
    const chunks = sliceListInChunks(arrayToTest, 2)
    const expectedArray = [
      [
        { firstName: 'Feargus', birthDate: '04/19/1970' },
        { firstName: 'Chris', birthDate: '05/27/1968' },
      ],
      [
        { firstName: 'Swen', birthDate: '05/30/1972' },
        { firstName: 'Todd', birthDate: '10/06/1970' },
      ],
      [
        { firstName: 'Brian', birthDate: '12/15/1962' },
        { firstName: 'Frederick', birthDate: '05/15/1966' },
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
