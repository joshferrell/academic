import { recipe } from "@vanilla-extract/recipes";
import { sprinkles } from "~/sprinkles/index.css";
import { vars } from "~/theme.css";

export const button = recipe({
  base: {
    textAlign: "center",
    transition: "all 0.1s ease-in",
    display: "inline-block",
    boxSizing: "border-box",
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
          color: vars.color.text.body,
          backgroundColor: vars.color.background["surface-01"],
        },
      },
      tertiary: {
        backgroundColor: "transparent",
        color: vars.color.background["surface-01"],
        borderColor: vars.color.background["surface-01"],
        ":hover": {
          color: vars.color.text.body,
          backgroundColor: vars.color.background["surface-01"],
        },
      },
    },
    size: {
      small: sprinkles({
        paddingY: 0.125,
        paddingX: 0.75,
        textStyle: "small",
        borderRadius: "all",
      }),
      medium: sprinkles({
        paddingY: 0.5,
        paddingX: 1,
        textStyle: "base",
        borderRadius: "all",
      }),
      normal: {
        borderRadius: vars.radius.sm,
        padding: `${vars.space[1]} ${vars.space[3]}`,
      },
    },
  },
});
