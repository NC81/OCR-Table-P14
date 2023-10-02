import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockList } from '../mock/mockList'
import { sortList, filterList } from '../utils/format/format'
import { defaultColumns } from '../utils/columns'
import { act } from 'react-dom/test-utils'
import Table from './table'

describe('Given the table is displayed', () => {
  it('should render all the headers', () => {
    render(<Table data={mockList} />)

    const propertiesNumber = Object.keys(mockList[0]).length
    const headColumns = screen.getAllByTestId('head-column')
    expect(headColumns.length).toBe(propertiesNumber)

    const headerTitleContainers = screen.getAllByTestId('header-title')
    const renderedHeaders = headerTitleContainers.map((el) => {
      return el.textContent
    })
    const dataHeaders = defaultColumns.map((el) => {
      return el.header
    })
    expect(renderedHeaders).toEqual(dataHeaders)
  })

  it('should render all the required tools', () => {
    render(<Table data={mockList} />)

    expect(screen.getByTestId('entries-select')).toBeInTheDocument()
    expect(screen.getByTestId('search-input')).toBeInTheDocument()
    expect(screen.getByTestId('table-info')).toBeInTheDocument()
  })
})

describe('Given the data list is empty', () => {
  it('should render an appropriate message', async () => {
    render(<Table data={[]} />)

    await waitFor(() => expect(screen.queryAllByTestId('row').length).toBe(0))
    expect(
      screen.getByText('No data available in table...')
    ).toBeInTheDocument()
  })
})

describe('Given the data list is not empty', () => {
  it('should render default number of rows with the corresponding info text', async () => {
    render(<Table data={mockList} />)

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
    render(<Table data={mockList} />)

    expect(
      screen.getAllByTestId('head-column')[0].getAttribute('aria-sort')
    ).toBe('ascending')

    const headColumns = screen.getAllByTestId('head-column')
    const order = headColumns[0].getAttribute('aria-sort')
    expect(order).toBe('ascending')

    const sortedList = sortList(mockList, 'firstName', 'ascending')
    const firstPageElements = sortedList.filter((el, index) => index < 10)
    const firstPageFirstNames = firstPageElements.map((el) => {
      return el.firstName
    })

    const firstNameContainers = screen.getAllByTestId('cell-firstName')
    const renderedFirstNames = firstNameContainers.map((el) => {
      return el.textContent
    })

    expect(renderedFirstNames).toEqual(firstPageFirstNames)
  })

  it('should render the appropriate number of page buttons', async () => {
    render(<Table data={mockList} />)

    const buttons = screen.getAllByTestId('page-button')
    const ariaCurrentFirstButton = buttons[0].getAttribute('aria-current')
    expect(buttons.length).toBe(3)
    expect(ariaCurrentFirstButton).toBe('page')
  })
})

describe('Given I want to sort the table', () => {
  describe('when I click on the first header already sorting in ascending order', () => {
    it('should sort rows in descending order', async () => {
      const user = userEvent.setup()
      render(<Table data={mockList} />)

      user.click(screen.getAllByTestId('head-column')[0])
      await waitFor(() =>
        expect(
          screen.getAllByTestId('head-column')[0].getAttribute('aria-sort')
        ).toBe('descending')
      )

      const sortedList = sortList(mockList, 'firstName', 'descending')
      const firstPageElements = sortedList.filter((el, index) => index < 10)
      const firstPagelastNames = firstPageElements.map((el) => {
        return el.lastName
      })

      await waitFor(() =>
        expect(
          screen.getAllByTestId('cell-lastName').map((el) => {
            return el.textContent
          })
        ).toEqual(firstPagelastNames)
      )
    })

    describe('when the second header is focused and I press enter', () => {
      it('should sort rows in ascending order', async () => {
        render(<Table data={mockList} />)

        const lastNameHeader = screen.getAllByTestId('head-column')[1]
        lastNameHeader.focus()

        expect(lastNameHeader).toHaveFocus()

        userEvent.keyboard('{Enter}')
        await waitFor(() =>
          expect(lastNameHeader.getAttribute('aria-sort')).toBe('ascending')
        )

        const sortedList = sortList(mockList, 'lastName', 'ascending')
        const firstPageElements = sortedList.filter((el, index) => index < 10)
        const firstPagelastNames = firstPageElements.map((el) => {
          return el.lastName
        })

        await waitFor(() =>
          expect(
            screen.getAllByTestId('cell-lastName').map((el) => {
              return el.textContent
            })
          ).toEqual(firstPagelastNames)
        )
      })
    })
  })
})

describe('Given I select the second entries value', () => {
  it('should render the appropriate number of rows and update info text', async () => {
    const user = userEvent.setup()
    render(<Table data={mockList} />)

    const select = screen.getByTestId('entries-select')
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

describe('Given I want to navigate between pages', () => {
  describe('when I click on the last page button', () => {
    it('should render the correct shunk of data and update info text', async () => {
      const user = userEvent.setup()
      render(<Table data={mockList} />)

      const sortedList = sortList(mockList, 'firstName', 'ascending')

      const buttons = screen.getAllByTestId('page-button')
      const lastPageElements = sortedList.filter(
        (el, index) => index > (buttons.length - 1) * 10 - 1
      )
      const lastPageCities = lastPageElements.map((el) => {
        return el.city
      })

      const lastButton = buttons[buttons.length - 1]
      user.click(lastButton)
      await waitFor(() =>
        expect(
          screen.getAllByTestId('cell-city').map((el) => {
            return el.textContent
          })
        ).toEqual(lastPageCities)
      )

      const ariaCurrentLastButton = lastButton.getAttribute('aria-current')
      expect(ariaCurrentLastButton).toBe('page')

      expect(screen.getByTestId('table-info')).toHaveTextContent(
        'Showing 21 to 21 of 21 entries'
      )
    })
  })

  describe('when I click on next/previous page buttons', () => {
    it('should render the correct shunk of data and update info text', async () => {
      const user = userEvent.setup()
      render(<Table data={mockList} />)

      const sortedList = sortList(mockList, 'firstName', 'ascending')
      const secondPageElements = sortedList.filter(
        (el, index) => index > 9 && index < 20
      )
      const secondPageBirthDates = secondPageElements.map((el) => {
        return el.birthDate
      })

      const nextButton = screen.getByTestId('next-button')
      user.click(nextButton)
      await waitFor(() =>
        expect(
          screen.getAllByTestId('cell-birthDate').map((el) => {
            return el.textContent
          })
        ).toEqual(secondPageBirthDates)
      )

      expect(screen.getByTestId('table-info')).toHaveTextContent(
        'Showing 11 to 20 of 21 entries'
      )

      const firstPageElements = sortedList.filter(
        (el, index) => index >= 0 && index < 10
      )
      const firstPageStates = firstPageElements.map((el) => {
        return el.state
      })

      const previousButton = screen.getByTestId('previous-button')
      user.click(previousButton)
      await waitFor(() =>
        expect(
          screen.getAllByTestId('cell-state').map((el) => {
            return el.textContent
          })
        ).toEqual(firstPageStates)
      )

      expect(screen.getByTestId('table-info')).toHaveTextContent(
        'Showing 1 to 10 of 21 entries'
      )
    })
  })
})

describe('Given I type text in search input', () => {
  it('should filter rows accordingly', async () => {
    const user = userEvent.setup()
    render(<Table data={mockList} />)

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

  describe('when no record have been found', () => {
    it('should render an appropriate message', async () => {
      const user = userEvent.setup()
      render(<Table data={mockList} />)

      const input = screen.getByTestId('search-input')
      const stringToSearch = 'aaa'

      const filteredList = filterList(mockList, stringToSearch)
      expect(filteredList.length).toBe(0)

      user.type(input, stringToSearch)
      await waitFor(() => expect(screen.queryAllByTestId('row').length).toBe(0))
      expect(
        screen.getByText('No matching record found...')
      ).toBeInTheDocument()
    })
  })
})
