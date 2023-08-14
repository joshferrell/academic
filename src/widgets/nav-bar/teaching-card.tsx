import {
  Content,
  NavigationMenuList,
  Item,
  Link as NavLink,
  type NavigationMenuContentProps,
} from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Course, Teaching } from "~/actions/types";
import { Box } from "../box";
import Icon from "../icon";
import { vars } from "~/theme.css";
import * as styles from "./styles.css";

export type TeachingCardData = {
  experience: Pick<Teaching, "id" | "title" | "icon" | "description">[];
  courseList?: Pick<Course, "id" | "title" | "courseTag">[];
};

export type TeachingCardProps = NavigationMenuContentProps & TeachingCardData;

export const TeachingCard = ({
  experience,
  courseList,
  ...props
}: TeachingCardProps) => {
  return (
    <Content className={styles.Content} {...props}>
      <Box
        as={NavigationMenuList}
        display="flex"
        flexDirection="column"
        padding={0}
        margin={0}
        width={["full", 450]}
        style={{ listStyleType: "none" }}
      >
        <Box paddingX={1} paddingY={1}>
          {experience.map(({ id, icon, title, description }) => (
            <Item key={id}>
              <NavLink
                asChild
                style={{
                  display: "flex",
                  gap: vars.space[2],
                  alignItems: "flex-start",
                  textDecoration: "none",
                }}
              >
                <Link className={styles.LinkItem} href={`/teaching/${id}`}>
                  <div className={styles.LinkItemIcon}>
                    <Icon name={icon} />
                  </div>
                  <div>
                    <Box
                      textStyle="base"
                      marginBottom={0.125}
                      style={{ marginTop: "-.125rem", fontWeight: 600 }}
                    >
                      {title}
                    </Box>
                    <Box textStyle="small">{description}</Box>
                  </div>
                </Link>
              </NavLink>
            </Item>
          ))}
        </Box>
        {courseList && Boolean(courseList.length) && (
          <Box
            backgroundColor="footer"
            paddingTop={1}
            paddingBottom={3}
            paddingX={1}
          >
            <Item role="none">
              <Box
                display="flex"
                justifyContent="space-between"
                marginBottom={0.5}
                padding={1}
              >
                <Box textStyle="base" style={{ fontWeight: 500 }}>
                  Courses
                </Box>
                <NavLink asChild>
                  <Box
                    as={Link}
                    display="flex"
                    alignItems="center"
                    gap={0.5}
                    href="/courses"
                    textStyle="base"
                    color="highlight"
                  >
                    See all
                    <ArrowRightIcon size={18} />
                  </Box>
                </NavLink>
              </Box>
            </Item>
            <Box display="flex" flexDirection="column">
              {courseList.map(({ id, title, courseTag }) => (
                <Item key={id}>
                  <NavLink asChild>
                    <Link className={styles.FooterLink} href={`/courses/${id}`}>
                      <Box textStyle="small">{courseTag}</Box>
                      <Box textStyle="base" style={{ fontWeight: 500 }}>
                        {title}
                      </Box>
                    </Link>
                  </NavLink>
                </Item>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Content>
  );
};
