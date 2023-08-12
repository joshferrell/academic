import type { Meta, StoryObj } from '@storybook/react';
import { ButtonLink, ButtonLinkProps } from './index';

const meta = {
    component: ButtonLink,
    tags: ['autodocs']
} satisfies Meta<ButtonLinkProps>;

export default meta;
type Story = StoryObj<ButtonLinkProps>;

export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'Test',
        href: '#'
    }
}