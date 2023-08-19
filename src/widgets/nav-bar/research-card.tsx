import {
  Content,
  NavigationMenuList,
  Item,
  Link as NavigationLink,
  type NavigationMenuContentProps,
} from "@radix-ui/react-navigation-menu";
import Link from "next/link";

import { Project } from "~/actions/types";

import { Box } from "~/widgets/box";
import { ProjectCardBuilder } from "~/widgets/project-card";
import * as styles from "./styles.css";
import * as projectStyles from "../project-card/styles.css";
import { vars } from "~/theme.css";

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
    <NavigationLink
      asChild
      style={{ textDecoration: "none", display: "block" }}
    >
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
    </NavigationLink>
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
        as={NavigationMenuList}
        margin={0}
        display={["flex", "grid"]}
        flexDirection="column"
        gap={[1, 0]}
        padding={1}
        style={{
          listStyleType: "none",
          gridTemplateColumns: "280px 320px",
          gridTemplateRows: "repeat(4, 90px)",
          columnGap: vars.space["0.5"],
        }}
      >
        {project && (
          <Item style={{ gridRowEnd: 5, gridRowStart: 1, display: "flex" }}>
            <ProjectCardBuilder project={project}>
              <NavigationLink asChild>
                <Link
                  href={`/projects/${project.id}`}
                  className={projectStyles.Link}
                >
                  <span className={projectStyles.LinkSpan} />
                  {project.name}
                </Link>
              </NavigationLink>
            </ProjectCardBuilder>
          </Item>
        )}
        {navItems.map((x) => (
          <NavItem key={x.href} {...x} />
        ))}
      </Box>
    </Content>
  );
};
