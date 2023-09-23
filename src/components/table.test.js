import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockList } from '../data/mockList'
import { columns } from '../columns'
import { act } from 'react-dom/test-utils'
import Table from './table'

describe('Given I am a user with the table displayed', () => {
  it('should render all the headers', () => {
    render(<Table data={mockList} columns={columns} />)
    const propertiesNumber = Object.keys(mockList[0]).length
    const headColumns = screen.getAllByTestId('head-column')
    const headers = screen.getAllByTestId('header-title')
    expect(headColumns.length).toBe(propertiesNumber)
    expect(headColumns.length).toBe(headers.length)

    const arrayFromDOM = headers.map((el) => {
      return el.textContent
    })
    const arrayFromData = columns.map((el) => {
      return el.header
    })
    expect(arrayFromDOM).toEqual(arrayFromData)
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

    const sortedList = mockList.sort((a, b) =>
      a.firstName < b.firstName ? -1 : 1
    )

    const firstNameFromSortedList = sortedList[0].firstName
    expect(screen.getAllByTestId('row')[0]).toHaveTextContent(
      firstNameFromSortedList
    )
  })

  it('should render page buttons', async () => {
    render(<Table data={mockList} columns={columns} />)

    const buttons = screen.getAllByTestId('page-button')
    const ariaCurrentFirstButton = buttons[0].getAttribute('aria-current')
    expect(buttons.length).toBe(3)
    expect(ariaCurrentFirstButton).toBe('page')
  })

  describe('when I click on the first header', () => {
    it('should sort rows in descending order', async () => {
      const user = userEvent.setup()
      render(<Table data={mockList} columns={columns} />)

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

  describe('when I click on a page button rendering a number', () => {
    it('should render the correct shunk of data and update info text', async () => {
      const user = userEvent.setup()
      render(<Table data={mockList} columns={columns} />)

      const firstOption = screen.getByTestId('option-10')
      expect(firstOption.selected).toBe(true)
      const rowsToRenderinThirdPage = mockList.length - firstOption.value * 2

      const buttons = screen.getAllByTestId('page-button')
      expect(buttons[2]).toHaveTextContent('3')

      user.click(buttons[2])
      await waitFor(() =>
        expect(screen.getAllByTestId('row').length).toBe(
          rowsToRenderinThirdPage
        )
      )

      const ariaCurrentSecondButton = buttons[2].getAttribute('aria-current')
      expect(ariaCurrentSecondButton).toBe('page')

      expect(screen.getByTestId('table-info')).toHaveTextContent(
        'Showing 21 to 21 of 21 entries'
      )
    })
  })

  describe('when I click on a page button rendering previous or next', () => {
    it('should render the correct shunk of data and update info text', async () => {
      const user = userEvent.setup()
      render(<Table data={mockList} columns={columns} />)

      const firstOption = screen.getByTestId('option-10')
      expect(firstOption.selected).toBe(true)

      let buttons = screen.getAllByTestId('previous-next-button')
      expect(buttons[0]).toHaveTextContent('Next')

      user.click(buttons[0])
      await waitFor(() => expect(screen.getAllByTestId('row').length).toBe(10))
      await waitFor(() =>
        expect(screen.getByTestId('table-info')).toHaveTextContent(
          'Showing 11 to 20 of 21 entries'
        )
      )

      buttons = screen.getAllByTestId('previous-next-button')
      expect(buttons[0]).toHaveTextContent('Previous')

      user.click(buttons[0])
      await waitFor(() => expect(screen.getAllByTestId('row').length).toBe(10))
      await waitFor(() =>
        expect(screen.getByTestId('table-info')).toHaveTextContent(
          'Showing 1 to 10 of 21 entries'
        )
      )
    })
  })

  describe('when I type more than 1 character in search input', () => {
    it('should filter rows accordingly', async () => {
      const user = userEvent.setup()
      render(<Table data={mockList} columns={columns} />)

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
        expect(row).toHaveTextContent(/chris/i)
      })
    })
  })
})
