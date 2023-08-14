"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";

import { Project } from "~/actions/types";

import { Box } from "~/widgets/box";
import { TeachingCard, TeachingCardData } from "./teaching-card";
import { ResearchCard } from "./research-card";
import * as styles from "./styles.css";

type LinkProps = {
  text: string;
  href: string;
};

const LinkItem = ({ href, text }: LinkProps) => (
  <NavigationMenu.Item>
    <NavigationMenu.Link asChild>
      <Link href={href} className={styles.Link}>
        {text}
      </Link>
    </NavigationMenu.Link>
  </NavigationMenu.Item>
);

const NavTrigger = ({ text }: { text: string }) => (
  <NavigationMenu.Trigger
    onPointerMove={(e) => e.preventDefault()}
    onPointerLeave={(e) => e.preventDefault()}
    className={styles.Link}
    style={{ display: "flex", gap: "4px", alignItems: "center" }}
  >
    {text}
    <ChevronDownIcon size={20} strokeWidth={3} />
  </NavigationMenu.Trigger>
);

type PropTypes = TeachingCardData & {
  project?: Project;
};

const NavBar = ({ project, experience, courseList }: PropTypes) => (
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
        {experience.length === 1 && !courseList ? (
          <LinkItem href={`/teaching/${experience[0].id}`} text="Teaching" />
        ) : (
          <NavigationMenu.Item>
            <NavTrigger text="Teaching" />
            <TeachingCard experience={experience} courseList={courseList} />
          </NavigationMenu.Item>
        )}
        <NavigationMenu.Item>
          <NavTrigger text="Research" />
          <ResearchCard project={project} />
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <div className={styles.ViewportPosition}>
        <NavigationMenu.Viewport className={styles.Viewport} />
      </div>
    </NavigationMenu.Root>
  </Box>
);

export default NavBar;
