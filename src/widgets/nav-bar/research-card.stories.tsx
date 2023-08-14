import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { type Meta, StoryObj } from "@storybook/react";
import { ResearchCard, ResearchCardProps } from "./research-card";

const meta = {
  component: ResearchCard,
} satisfies Meta<ResearchCardProps>;

export default meta;
type Story = StoryObj<ResearchCardProps>;

export const WithProject: Story = {
  args: {
    project: {
      id: "1234",
      name: "Something goes here",
      img: {
        src: "https://picsum.photos/id/237/200/300",
        alt: "Lorem ipsum dolor",
      },
      tags: [
        {
          title: "Dissertation",
          id: "1234",
        },
      ],
    },
  },
  render: (args) => (
    <NavigationMenu.Root>
      <NavigationMenu.Item style={{ listStyleType: "none" }}>
        <ResearchCard {...args} forceMount style={{ pointerEvents: "all" }} />
      </NavigationMenu.Item>
    </NavigationMenu.Root>
  ),
};

export const WithoutProject: Story = {
  render: (args) => (
    <NavigationMenu.Root>
      <NavigationMenu.Item style={{ listStyleType: "none" }}>
        <ResearchCard {...args} forceMount style={{ pointerEvents: "all" }} />
      </NavigationMenu.Item>
    </NavigationMenu.Root>
  ),
};
