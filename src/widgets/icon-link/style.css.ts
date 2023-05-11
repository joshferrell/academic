import { recipe } from "@vanilla-extract/recipes";
import { vars } from "~/theme.css";

export const Link = recipe({
  variants: {
    variant: {
      primary: {
        color: vars.color.link.primary,
        ":hover": {
          color: vars.color.link["primary-hover"],
        },
      },
      subtle: {
        color: vars.color.text.body,
        ":hover": {
          color: vars.color.link["primary"],
        },
      },
      inverted: {
        color: vars.color.interactive.secondaryText,
        ":hover": {
          color: vars.color.interactive.secondaryHover,
        },
      },
    },
  },
});
