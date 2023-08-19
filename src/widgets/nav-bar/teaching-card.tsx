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
  const hasCourses = courseList && Boolean(courseList.length);
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
        {experience.map(({ id, icon, title, description }) => (
          <Item key={id}>
            <NavLink
              asChild
              style={{
                display: "flex",
                margin: `${vars.space[1]} ${vars.space[1]} 0`,
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
        {hasCourses && (
          <>
            <Item role="none">
              <Box
                display="flex"
                justifyContent="space-between"
                backgroundColor="footer"
                marginTop={1}
                paddingTop={3}
                paddingBottom={1}
                paddingX={3}
                style={{ boxSizing: "border-box" }}
              >
                <Box textStyle="base" style={{ fontWeight: 500 }}>
                  Courses
                </Box>
                <NavLink asChild>
                  <Box
                    as={Link}
                    color="highlight"
                    display="flex"
                    alignItems="center"
                    gap={0.5}
                    href="/courses"
                  >
                    <div>See all</div>
                    <ArrowRightIcon size={18} />
                  </Box>
                </NavLink>
              </Box>
            </Item>
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
          </>
        )}
        <Box paddingBottom={2} bg={hasCourses ? "footer" : "body"} />
      </Box>
    </Content>
  );
};
