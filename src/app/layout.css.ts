import { style } from "@vanilla-extract/css";
import { sprinkles } from "~/sprinkles/index.css";
import { vars } from "~/theme.css";

export const NavLink = style([
  sprinkles({
    textStyle: "small",
    paddingY: 0.5,
    paddingX: 1,
    color: "body",
    borderRadius: "md",
    display: "inline-block",
  }),
  {
    textDecoration: "none",
    ":hover": {
      background: vars.color.background["surface-01"],
    },
  },
]);
