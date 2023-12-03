import type { Meta, StoryObj } from '@storybook/react'

import Background from '../Background/Background'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'Primary Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
}

type Story = StoryObj<typeof Button>

export const MyPrimary: Story = {
  name: 'Primary',
  render: () => (
    <Background>
      <Button>Primary</Button>,
    </Background>
  ),
}

export default meta
