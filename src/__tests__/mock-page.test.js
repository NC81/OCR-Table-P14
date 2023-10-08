import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockList1 } from '../mock/lists/mock-list-1'
import MockPage from '../mock/mock-page'

describe('Given I am a user with the table displayed', () => {
  describe('when the list receive a new entry', () => {
    it('should add a new row at the end of the table', async () => {
      const user = userEvent.setup()
      render(<MockPage />)

      const buttons = screen.getAllByTestId('page-button')
      const lastButton = buttons[buttons.length - 1]

      const lastPageElements = mockList1.filter(
        (el, index) => index > (buttons.length - 1) * 10 - 1
      )

      user.click(lastButton)
      await waitFor(() =>
        expect(screen.getAllByTestId('row').length).toBe(
          lastPageElements.length
        )
      )

      const mockUpdateButton = screen.getByTestId('mock-update-button')
      user.click(mockUpdateButton)
      await waitFor(() =>
        expect(screen.getAllByTestId('row').length).toBe(
          lastPageElements.length + 1
        )
      )
    })
  })
})
