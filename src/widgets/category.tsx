import React from "react";
import { Box } from "./box";

type PropTypes = {
  title: string;
  level?: "primary" | "secondary";
  size?: "small" | "large";
  children: React.ReactNode;
};

const Category = ({
  title,
  size = "small",
  level = "primary",
  children,
}: PropTypes) => {
  const gridTemplateColumns = {
    primary: {
      small: "150px 1fr",
      large: "300px 1fr",
    },
    secondary: {
      small: "100px 1fr",
      large: "22ch 1fr",
    },
  };

  return (
    <Box
      display={["flex", "grid"]}
      flexDirection="column"
      alignItems="flex-start"
      gap={2}
      style={{
        gridTemplateColumns: gridTemplateColumns[level][size],
      }}
    >
      <Box
        as={level === "primary" ? "h2" : "h3"}
        margin={0}
        headingStyle={level === "primary" ? "title" : "subtitle"}
        style={{
          lineHeight: size === "small" ? "1.875rem" : undefined,
          textTransform: "capitalize",
        }}
      >
        {title}
      </Box>
      <div>{children}</div>
    </Box>
  );
};

const List = ({ children }: { children: React.ReactNode }) => (
  <Box
    display="flex"
    flexDirection="column"
    gap={4}
    justifyContent="flex-start"
  >
    {children}
  </Box>
);

export default Object.assign(Category, { List });
