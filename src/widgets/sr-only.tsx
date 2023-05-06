import { ElementType, createElement } from "react";

type PropTypes = {
  children: React.ReactNode;
  as?: ElementType;
};

export const SrOnly = ({ children, as = "div" }: PropTypes) => {
  const style = {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  };

  return createElement(as, { style }, children);
};
