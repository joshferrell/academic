import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { sprinkles } from "~/sprinkles/index.css";
import { vars } from "~/theme.css";

export const Article = recipe({
  base: [
    sprinkles({
      backgroundColor: "surface-01",
      borderRadius: "md",
      paddingX: 2,
      paddingBottom: 2,
    }),
    {
      position: "relative",
      isolation: "isolate",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      overflow: "hidden",
      transition: "all .2s ease-in-out",
      ":hover": {
        transform: "scale(1.01)",
        boxShadow:
          "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(17, 24, 39, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px",
      },
      ":focus-within": {
        transform: "scale(1.01)",
        boxShadow:
          "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(17, 24, 39, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px",
      },
    },
  ],
  variants: {
    size: {
      large: {
        paddingTop: "20rem",
      },
      medium: {
        paddingTop: "8rem",
      },
    },
  },
});

export const Image = style({
  position: "absolute",
  objectFit: "cover",
  width: "100%",
  height: "100%",
  zIndex: "-10",
  inset: "0px",
});

export const Gradient = recipe({
  base: {
    position: "absolute",
    inset: 0,
    zIndex: -10,
  },
  variants: {
    size: {
      medium: {
        background:
          "linear-gradient(to top, rgb(17, 24, 39), rgba(17, 24, 39, 0.7), rgba(17, 24, 39, .4))",
      },
      large: {
        background:
          "linear-gradient(to top, rgb(17, 24, 39), rgba(17, 24, 39, 0.5), rgba(17, 24, 39, .3))",
      },
    },
  },
});

export const GradientRing = style({
  position: "absolute",
  inset: 0,
  zIndex: "-10",
  borderRadius: "2rem",
  boxShadow:
    "rgb(255, 255, 255) 0px 0px 0px 0px inset, rgba(17, 24, 39, 0.1) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0) 0px 0px 0px 0px",
});

export const Subtitle = style([
  sprinkles({
    color: "soft",
    textStyle: "large",
  }),
  {
    fontWeight: 600,
  },
]);

export const Link = style([
  sprinkles({ textStyle: "large" }),
  {
    textDecoration: "none",
    color: "white",
    fontWeight: 600,
    ":hover": {
      color: vars.color.text.soft,
    },
    ":focus": {
      color: vars.color.text.soft,
    },
  },
]);

export const LinkSpan = style({
  position: "absolute",
  inset: "0px",
});
