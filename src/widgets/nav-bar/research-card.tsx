import {
  Content,
  NavigationMenuList,
  Item,
  Link,
  type NavigationMenuContentProps,
} from "@radix-ui/react-navigation-menu";

import { Project } from "~/actions/types";

import { Box } from "~/widgets/box";
import { ProjectCard } from "~/widgets/project-card";
import * as styles from "./styles.css";

export interface ResearchCardProps extends NavigationMenuContentProps {
  project?: Pick<Project, "img" | "id" | "tags" | "name">;
}

type NavItemProps = {
  title: string;
  description: string;
  href: string;
};

const NavItem = ({ title, description, href }: NavItemProps) => (
  <Item>
    <Link asChild style={{ textDecoration: "none", display: "block" }}>
      <Link href={href} className={styles.LinkItem}>
        <div style={{ textDecoration: "none" }}>
          <Box headingStyle="subtitle" marginBottom={0.125}>
            {title}
          </Box>
          <Box textStyle="base" color="secondary">
            {description}
          </Box>
        </div>
      </Link>
    </Link>
  </Item>
);

export const ResearchCard = ({ project, ...props }: ResearchCardProps) => {
  const navItems = [
    {
      title: "Projects",
      description: "Research and other scholarship",
      href: "/projects",
    },
    {
      title: "Presentations",
      description: "Upcoming and past presentations",
      href: "/events",
    },
    {
      title: "Publications",
      description: "Journal articles and more",
      href: "/publications",
    },
    {
      title: "Grants & Awards",
      description: "Grants, fellowships, and awards",
      href: "/grants",
    },
  ];

  return (
    <Content className={styles.Content} {...props}>
      <Box
        display={["flex", "grid"]}
        flexDirection="column"
        flexWrap="nowrap"
        gap={1}
        style={{ gridTemplateColumns: "280px 320px" }}
        padding={1}
      >
        <Box
          as={NavigationMenuList}
          display="flex"
          flexDirection="column"
          wrap="nowrap"
          margin={0}
          padding={0}
          gap={0.125}
          style={{ listStyleType: "none" }}
        >
          {navItems.map((x) => (
            <NavItem key={x.title} {...x} />
          ))}
        </Box>
        {project && <ProjectCard style={{ order: "-1" }} project={project} />}
      </Box>
    </Content>
  );
};
