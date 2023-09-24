import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockList } from '../mock/mockList'
import { sortList, sliceListInChunks, filterList } from '../tools/format'
import { columns } from '../columns'
import { act } from 'react-dom/test-utils'
import Table from './table'

describe('Given I am a user with the table displayed', () => {
  it('should render all the headers', () => {
    render(<Table data={mockList} columns={columns} />)

    const propertiesNumber = Object.keys(mockList[0]).length
    const headColumns = screen.getAllByTestId('head-column')
    expect(headColumns.length).toBe(propertiesNumber)

    const headerTitleContainers = screen.getAllByTestId('header-title')
    const renderedHeaders = headerTitleContainers.map((el) => {
      return el.textContent
    })
    const dataHeaders = columns.map((el) => {
      return el.header
    })
    expect(renderedHeaders).toEqual(dataHeaders)
  })

  it('should render default number of rows with the corresponding info text', async () => {
    render(<Table data={mockList} columns={columns} />)

    const rows = screen.getAllByTestId('row')
    const optionsList = screen.getAllByRole('option')
    const firstOption = screen.getByTestId('option-10')
    expect(rows.length).toBe(10)
    expect(optionsList.length).toBe(4)
    expect(firstOption.selected).toBe(true)
    expect(screen.getByTestId('table-info')).toHaveTextContent(
      'Showing 1 to 10 of 21 entries'
    )
  })

  it('should sort rows in ascending order by the first property', () => {
    render(<Table data={mockList} columns={columns} />)

    expect(
      screen.getAllByTestId('head-column')[0].getAttribute('aria-sort')
    ).toBe('ascending')

    const headColumns = screen.getAllByTestId('head-column')
    const order = headColumns[0].getAttribute('aria-sort')
    expect(order).toBe('ascending')

    const sortedList = sortList(mockList, 'firstName', 'ascending')
    const chunks = sliceListInChunks(sortedList, 10)
    const firstChunkFirstNames = chunks[0].map((el) => {
      return el.firstName
    })

    const firstNameContainers = screen.getAllByTestId('cell-firstName')
    const renderedFirstNames = firstNameContainers.map((el) => {
      return el.textContent
    })

    expect(renderedFirstNames).toEqual(firstChunkFirstNames)
  })

  it('should render page buttons', async () => {
    render(<Table data={mockList} columns={columns} />)

    const buttons = screen.getAllByTestId('page-button')
    const ariaCurrentFirstButton = buttons[0].getAttribute('aria-current')
    expect(buttons.length).toBe(3)
    expect(ariaCurrentFirstButton).toBe('page')
  })

  describe('when I click on the first header sorting in ascending order', () => {
    it('should sort rows in descending order', async () => {
      const user = userEvent.setup()
      render(<Table data={mockList} columns={columns} />)

      user.click(screen.getAllByTestId('head-column')[0])
      await waitFor(() =>
        expect(
          screen.getAllByTestId('head-column')[0].getAttribute('aria-sort')
        ).toBe('descending')
      )

      const sortedList = sortList(mockList, 'firstName', 'descending')
      const chunks = sliceListInChunks(sortedList, 10)
      const firstChunkFirstNames = chunks[0].map((el) => {
        return el.firstName
      })

      await waitFor(() =>
        expect(
          screen.getAllByTestId('cell-firstName').map((el) => {
            return el.textContent
          })
        ).toEqual(firstChunkFirstNames)
      )
    })
  })

  describe('when I select new entries value', () => {
    it('should render corresponding number of rows and update info text', async () => {
      const user = userEvent.setup()
      render(<Table data={mockList} columns={columns} />)

      const select = screen.getByTestId('select')
      const secondOption = screen.getByTestId('option-25')
      act(() => {
        user.selectOptions(select, secondOption)
      })
      await waitFor(() => expect(secondOption.selected).toBe(true))
      await waitFor(() =>
        expect(screen.getAllByTestId('row').length).toBe(mockList.length)
      )

      expect(screen.getByTestId('table-info')).toHaveTextContent(
        'Showing 1 to 21 of 21 entries'
      )
    })
  })

  describe('when I click on the last page numbered button', () => {
    it('should render the correct shunk of data and update info text', async () => {
      const user = userEvent.setup()
      render(<Table data={mockList} columns={columns} />)

      const sortedList = sortList(mockList, 'firstName', 'ascending')
      const chunks = sliceListInChunks(sortedList, 10)
      const lastChunkCities = chunks[chunks.length - 1].map((el) => {
        return el.city
      })

      const buttons = screen.getAllByTestId('page-button')
      const lastButton = buttons[buttons.length - 1]
      user.click(lastButton)
      await waitFor(() =>
        expect(
          screen.getAllByTestId('cell-city').map((el) => {
            return el.textContent
          })
        ).toEqual(lastChunkCities)
      )

      const ariaCurrentLastButton = lastButton.getAttribute('aria-current')
      expect(ariaCurrentLastButton).toBe('page')

      expect(screen.getByTestId('table-info')).toHaveTextContent(
        'Showing 21 to 21 of 21 entries'
      )
    })
  })

  describe('when I click on next then on previous page buttons', () => {
    it('should render the correct shunk of data and update info text', async () => {
      const user = userEvent.setup()
      render(<Table data={mockList} columns={columns} />)

      const sortedList = sortList(mockList, 'firstName', 'ascending')
      const chunks = sliceListInChunks(sortedList, 10)
      const nextChunkBirthDates = chunks[1].map((el) => {
        return el.birthDate
      })

      const nextButton = screen.getByTestId('next-button')
      user.click(nextButton)
      await waitFor(() =>
        expect(
          screen.getAllByTestId('cell-birthDate').map((el) => {
            return el.textContent
          })
        ).toEqual(nextChunkBirthDates)
      )

      expect(screen.getByTestId('table-info')).toHaveTextContent(
        'Showing 11 to 20 of 21 entries'
      )

      const previousChunkStates = chunks[0].map((el) => {
        return el.state
      })
      const previousButton = screen.getByTestId('previous-button')
      user.click(previousButton)
      await waitFor(() =>
        expect(
          screen.getAllByTestId('cell-state').map((el) => {
            return el.textContent
          })
        ).toEqual(previousChunkStates)
      )

      expect(screen.getByTestId('table-info')).toHaveTextContent(
        'Showing 1 to 10 of 21 entries'
      )
    })
  })

  describe('when I type more than 1 character in search input', () => {
    it('should filter rows accordingly', async () => {
      const user = userEvent.setup()
      render(<Table data={mockList} columns={columns} />)

      const input = screen.getByTestId('search-input')
      const stringToSearch = 'chris'

      const filteredList = filterList(mockList, stringToSearch)

      user.type(input, stringToSearch)
      await waitFor(() =>
        expect(screen.getAllByTestId('row').length).toBe(filteredList.length)
      )

      const rows = screen.getAllByTestId('row')
      rows.forEach((row) => {
        expect(row).toHaveTextContent(/chris/i)
      })
    })
  })
})
