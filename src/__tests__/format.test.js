import '@testing-library/jest-dom'
import {
  sortList,
  filterList,
  createButtonsValuesList,
} from '../lib/utils/format'

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

describe('Given I want createButtonsValuesList() to create buttons values list', () => {
  describe('when there are 7 pages and the current chunk is 1', () => {
    it('should create the correct array composed of integers and ellipsis', () => {
      const arrayToInteger = createButtonsValuesList(7, 1, 1)
      const expectedArray = [1, 2, 3, 4, 5, 6, 7]
      expect(arrayToInteger).toEqual(expectedArray)
    })
  })

  describe('when there are 11 pages and the current chunk is 1', () => {
    it('should create the correct array composed of integers and ellipsis', () => {
      const arrayToInteger = createButtonsValuesList(11, 1, 2)
      const expectedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '...', 11]
      expect(arrayToInteger).toEqual(expectedArray)
    })
  })

  describe('when there are 21 pages and the current chunk is 2', () => {
    it('should create an array composed of integers with two ellipsis', () => {
      const arrayToInteger = createButtonsValuesList(21, 2, 3)
      const expectedArray = [
        1,
        '...',
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        '...',
        21,
      ]
      expect(arrayToInteger).toEqual(expectedArray)
    })
  })
})
