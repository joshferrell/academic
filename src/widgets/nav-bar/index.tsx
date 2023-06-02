"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { Box } from "~/widgets/box";
import * as styles from "./styles.css";
import {
  AwardIcon,
  BookOpenIcon,
  BriefcaseIcon,
  ChevronDown,
  Tv2Icon,
} from "lucide-react";
import { Project } from "~/actions";
import { ProjectCard } from "~/widgets/project-card";

type LinkProps = {
  text: string;
  href: string;
};

type NavItemProps = {
  title: string;
  description: string;
  href: string;
};

export const Item = ({ title, description, href }: NavItemProps) => (
  <NavigationMenu.Item>
    <NavigationMenu.Link
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
    </NavigationMenu.Link>
  </NavigationMenu.Item>
);

const LinkItem = ({ href, text }: LinkProps) => (
  <NavigationMenu.Item>
    <NavigationMenu.Link asChild>
      <Link href={href} className={styles.Link}>
        {text}
      </Link>
    </NavigationMenu.Link>
  </NavigationMenu.Item>
);

type PropTypes = {
  project?: Project;
};

const NavBar = ({ project }: PropTypes) => {
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
    <Box
      backgroundColor="inverted"
      color="inverted"
      paddingY={2}
      paddingX={[0, 2]}
      style={{ boxSizing: "border-box" }}
    >
      <NavigationMenu.Root className={styles.Root}>
        <NavigationMenu.List className={styles.List}>
          <LinkItem href="/" text="Home" />
          <LinkItem href="/about" text="About" />
          <LinkItem href="/teaching" text="Teaching" />
          <NavigationMenu.Item>
            <NavigationMenu.Trigger
              onPointerMove={(e) => e.preventDefault()}
              onPointerLeave={(e) => e.preventDefault()}
              className={styles.Link}
              style={{ display: "flex", gap: "4px", alignItems: "center" }}
            >
              Research
              <ChevronDown size={20} strokeWidth={3} />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className={styles.Content}>
              <Box
                display={["flex", "grid"]}
                flexDirection="column"
                flexWrap="nowrap"
                gap={1}
                style={{ gridTemplateColumns: "280px 320px" }}
                padding={1}
              >
                {project && <ProjectCard project={project} />}
                <Box
                  as={NavigationMenu.NavigationMenuList}
                  display="flex"
                  flexDirection="column"
                  wrap="nowrap"
                  margin={0}
                  padding={0}
                  gap={0.125}
                  style={{ listStyleType: "none" }}
                >
                  {navItems.map((x) => (
                    <Item key={x.title} {...x} />
                  ))}
                </Box>
              </Box>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        </NavigationMenu.List>
        <div className={styles.ViewportPosition}>
          <NavigationMenu.Viewport className={styles.Viewport} />
        </div>
      </NavigationMenu.Root>
    </Box>
  );
};

export default NavBar;
