import type { Meta, StoryObj } from '@storybook/react';
import { Feedback, FeedbackPropTypes } from '.';

const meta = {
    component: Feedback,
    tags: ['autodocs']
} satisfies Meta<FeedbackPropTypes>;

export default meta;
type Story = StoryObj<FeedbackPropTypes>;

export const Photo: Story = {
    args: {
        feedback: {
            id: '1234',
            feedback: `"I plan to use the skills I've developed and information I've learned to be a critical and informed citizen when it comes to consuming information about research projects. I'm a more informed person and can be more critical of the information I take in each day as I will question the motives goals and collection strategies of the research that is presented to me."`,
            title: 'Anonymous Student',
            subtitle: 'Summer 2014',
            feature: false,
            photo: {
                src: "https://picsum.photos/id/237/100/100",
                alt: "Lorem ipsum dolor",
            }
        }
    }
}

export const NoPhoto: Story = {
    args: {
        feedback: {
            id: '1234',
            feedback: `"I plan to use the skills I've developed and information I've learned to be a critical and informed citizen when it comes to consuming information about research projects. I'm a more informed person and can be more critical of the information I take in each day as I will question the motives goals and collection strategies of the research that is presented to me."`,
            title: 'Summer 2014',
            feature: false,
        }
    }
}