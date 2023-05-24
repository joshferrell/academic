import { recipe } from "@vanilla-extract/recipes";
import { vars } from "~/theme.css";
import { sprinkles } from "~/sprinkles/index.css";

export const Section = recipe({
  base: {
    paddingLeft: vars.space[3],
    paddingRight: vars.space[3],
  },
  variants: {
    colors: {
      primary: {
        background: vars.color.background.inverted,
        color: vars.color.text.inverted,
      },
      transparent: {
        background: "transparent",
      },
      "surface-01": {
        background: vars.color.background["surface-01"],
      },
      white: {
        background: vars.color.background.body,
      },
      blur: {
        background: "rgba(255, 255, 255, 0.4)",
        backdropFilter: "blur(33px)",
        color: vars.color.text.body,
      },
    },
    prominance: {
      normal: {
        paddingTop: vars.space[6],
        paddingBottom: vars.space[6],
      },
      focus: sprinkles({
        paddingBottom: [6, 6, 8],
        paddingTop: [4, 4, 6],
      }),
      center: {
        paddingTop: vars.space[6],
        paddingBottom: vars.space[6],
      },
      small: {
        paddingTop: vars.space[1],
        paddingBottom: vars.space[1],
      },
    },
  },
});

export const Content = recipe({
  base: {
    margin: "0 auto",
    maxWidth: "67rem",
  },
  variants: {
    prominance: {
      normal: {},
      focus: {
        alignItems: "flex-start",
      },
      center: {
        maxWidth: "53rem",
        display: "flex",
        flexDirection: "column",
        gap: vars.space[2],
        justifyContent: "center",
        alignItems: "center",
      },
    },
  },
});

export const Title = recipe({
  base: sprinkles({ headingStyle: "title", marginTop: 0 }),
  variants: {
    prominance: {
      normal: {},
      focus: {},
      center: {},
    },
  },
});
