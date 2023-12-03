import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderComponent } from '../test-utils'
import BottomNav from './BottomNav'

describe('Bottom Nav Bar', () => {
  it('should render the bar', () => {
    renderComponent(<BottomNav />)

    expect(screen.getByAltText(/profile/i)).toBeInTheDocument()
    expect(screen.getByAltText(/tasks/i)).toBeInTheDocument()
    expect(screen.getByAltText(/stats/i)).toBeInTheDocument()

    // expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
