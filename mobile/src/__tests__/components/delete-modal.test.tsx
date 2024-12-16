import { DeleteModal } from '@/src/components/delete-modal'
import { DEPARTAMENTS } from '@/src/utils/data/seed'
import { render, screen } from '@testing-library/react-native'

describe('Component: DeleteModal', () => {
  it('should be render opening the modal component', () => {
    render(
      <DeleteModal
        isVisible
        itemName={DEPARTAMENTS[0].name}
        onClose={() => {}}
        onDelete={() => {}}
      />,
    )

    const deleteButton = screen.getByTestId('delete-button')

    expect(deleteButton).toBeTruthy()
  })
})
