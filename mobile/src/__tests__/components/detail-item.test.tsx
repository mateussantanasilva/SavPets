import { DetailItem } from '@/src/components/detail-item'
import { DEPARTAMENTS } from '@/src/utils/data/seed'
import { render, screen } from '@testing-library/react-native'

describe('Component: DetailItem', () => {
  it('should be render the detail component with uppercase title', () => {
    render(<DetailItem title="name" value={DEPARTAMENTS[0].name} />)

    expect(screen.getByText('NAME')).toBeTruthy()
  })
})
