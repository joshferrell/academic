import { style } from "@vanilla-extract/css";
import { vars } from "~/theme.css";

export const Link = style({
  color: vars.color.interactive.secondaryText,
  ":hover": {
    color: vars.color.interactive.secondary,
  },
});
