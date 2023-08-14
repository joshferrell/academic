import { recipe } from "@vanilla-extract/recipes";
import { vars } from "~/theme.css";

export const card = recipe({
  base: {
    borderRadius: vars.radius.sm,
    padding: vars.space[3],
    border: "1px solid",
    borderColor: vars.color.background.inverted,
  },
  variants: {
    variant: {
      primary: {},
      secondary: {
        backgroundColor: vars.color.background.footer,
        borderColor: 'transparent',
      },
    },
  },
});
