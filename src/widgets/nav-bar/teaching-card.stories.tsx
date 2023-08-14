import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { type Meta, StoryObj } from "@storybook/react";
import { TeachingCard, TeachingCardProps } from "./teaching-card";

const meta = {
  component: TeachingCard,
} satisfies Meta<TeachingCardProps>;

export default meta;
type Story = StoryObj<TeachingCardProps>;

export const WithCourses: Story = {
  args: {
    experience: [
      {
        id: "12",
        title: "Teaching Experience",
        icon: "compass",
        description: "brief descriptoin of something",
      },
      {
        id: "1234",
        title: "Mentorship",
        icon: "users-2",
        description: "another brief descriptoin",
      },
    ],
    courseList: [
      { id: "12", title: "Intro to social", courseTag: "Summer 2022" },
      { id: "1223", title: "Intro to social", courseTag: "Summer 2022" },
    ],
  },
  render: (args) => (
    <NavigationMenu.Root>
      <NavigationMenu.Item style={{ listStyleType: "none" }}>
        <TeachingCard {...args} forceMount style={{ pointerEvents: "all" }} />
      </NavigationMenu.Item>
    </NavigationMenu.Root>
  ),
};

export const NoCourses: Story = {
  args: {
    experience: [
      {
        id: "12",
        title: "Teaching Experience",
        icon: "compass",
        description: "Something something",
      },
      {
        id: "1234",
        title: "Mentorship",
        icon: "users-2",
        description: "Something else something else",
      },
    ],
  },
  render: (args) => (
    <NavigationMenu.Root>
      <NavigationMenu.Item style={{ listStyleType: "none" }}>
        <TeachingCard {...args} forceMount style={{ pointerEvents: "all" }} />
      </NavigationMenu.Item>
    </NavigationMenu.Root>
  ),
};
