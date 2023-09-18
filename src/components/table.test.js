import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockList } from '../data/mockList'
import { mockColumns } from '../data/mockColumns'
import { act } from 'react-dom/test-utils'
import Table from './table'

describe('As a user, when I see the table displayed', () => {
  it('should render all the headers', () => {
    render(<Table data={mockList} columns={mockColumns} />)
    const propertiesNumber = Object.keys(mockList[0]).length
    const headColumns = screen.getAllByTestId('head-column')
    expect(headColumns.length).toBe(propertiesNumber)
    expect(headColumns[0]).toHaveTextContent(mockColumns[0].header)
  })

  it('should render default number of rows with the corresponding info text', async () => {
    render(<Table data={mockList} columns={mockColumns} />)

    const rows = screen.getAllByTestId('row')
    const optionsList = screen.getAllByRole('option')
    const firstOption = screen.getByTestId('option-10')
    expect(rows.length).toBe(10)
    expect(optionsList.length).toBe(4)
    expect(firstOption.selected).toBe(true)
    expect(screen.getByTestId('table-info')).toHaveTextContent(
      'Showing 1 to 10 of 14 entries'
    )
  })

  it('should sort rows in ascending order by the first property', () => {
    render(<Table data={mockList} columns={mockColumns} />)

    expect(
      screen.getAllByTestId('head-column')[0].getAttribute('aria-sort')
    ).toBe('ascending')

    const headColumns = screen.getAllByTestId('head-column')
    const order = headColumns[0].getAttribute('aria-sort')
    expect(order).toBe('ascending')

    const sortedList = mockList.sort((a, b) =>
      a.firstName < b.firstName ? -1 : 1
    )

    const firstNameFromSortedList = sortedList[0].firstName
    expect(screen.getAllByTestId('row')[0]).toHaveTextContent(
      firstNameFromSortedList
    )
  })

  it('should render page buttons', async () => {
    render(<Table data={mockList} columns={mockColumns} />)

    const buttons = screen.getAllByTestId('page-button')
    const ariaCurrentFirstButton = buttons[0].getAttribute('aria-current')
    expect(buttons.length).toBe(2)
    expect(ariaCurrentFirstButton).toBe('page')
  })

  describe('When I click on the first header', () => {
    it('should sort rows in descending order', async () => {
      const user = userEvent.setup()
      render(<Table data={mockList} columns={mockColumns} />)

      user.click(screen.getAllByTestId('head-column')[0])
      await waitFor(() =>
        expect(
          screen.getAllByTestId('head-column')[0].getAttribute('aria-sort')
        ).toBe('descending')
      )

      const sortedList = mockList
        .sort((a, b) => (a.firstName < b.firstName ? -1 : 1))
        .reverse()

      const firstNameFromSortedReverseList = sortedList[0].firstName
      await waitFor(() =>
        expect(screen.getAllByTestId('row')[0]).toHaveTextContent(
          firstNameFromSortedReverseList
        )
      )
    })
  })

  describe('when I select new entries value', () => {
    it('should render corresponding number of rows and update info text', async () => {
      const user = userEvent.setup()
      render(<Table data={mockList} columns={mockColumns} />)

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
        'Showing 1 to 14 of 14 entries'
      )
    })
  })

  describe('when I click on a page button', () => {
    it('should render the correct shunk of data and update info text', async () => {
      const user = userEvent.setup()
      render(<Table data={mockList} columns={mockColumns} />)

      const buttons = screen.getAllByTestId('page-button')

      const firstOption = screen.getByTestId('option-10')
      expect(firstOption.selected).toBe(true)
      const remainingRowsToRender = mockList.length - firstOption.value

      user.click(buttons[1])
      await waitFor(() =>
        expect(screen.getAllByTestId('row').length).toBe(remainingRowsToRender)
      )

      const ariaCurrentSecondButton = buttons[1].getAttribute('aria-current')
      expect(ariaCurrentSecondButton).toBe('page')

      expect(screen.getByTestId('table-info')).toHaveTextContent(
        'Showing 11 to 14 of 14 entries'
      )
    })
  })

  describe('When I type more than 1 character in search input', () => {
    it('should filter rows accordingly', async () => {
      const user = userEvent.setup()
      render(<Table data={mockList} columns={mockColumns} />)

      const input = screen.getByTestId('search-input')
      const stringToSearch = 'chris'

      const filteredList = mockList.filter((obj) =>
        Object.values(obj).some((ele) =>
          ele.toLowerCase().includes(stringToSearch.toLowerCase())
        )
      )

      user.type(input, stringToSearch)
      await waitFor(() =>
        expect(screen.getAllByTestId('row').length).toBe(filteredList.length)
      )

      const rows = screen.getAllByTestId('row')
      rows.forEach((row) => {
        expect(row).toHaveTextContent('Chris')
      })
    })
  })
})
