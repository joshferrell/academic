import { recipe } from "@vanilla-extract/recipes";
import { vars } from "~/theme.css";

export const button = recipe({
  base: {
    borderRadius: vars.radius.sm,
    textAlign: "center",
    transition: "all 0.1s ease-in",
    display: "inline-block",
    boxSizing: "border-box",
    padding: `${vars.space[1]} ${vars.space[3]}`,
    textDecoration: "none",
    border: "1px solid",
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: vars.color.interactive.primary,
        borderColor: vars.color.interactive.primary,
        color: vars.color.interactive.primaryText,
        ":hover": {
          color: vars.color.interactive.primaryText,
          backgroundColor: vars.color.interactive.primaryHover,
        },
      },
      secondary: {
        backgroundColor: vars.color.background.body,
        borderColor: vars.color.interactive.primary,
        color: vars.color.text.body,
        ":hover": {
          color: vars.color.interactive.primaryText,
          backgroundColor: vars.color.background["surface-01"],
        },
      },
    },
  },
});
