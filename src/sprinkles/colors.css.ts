import { defineProperties } from "@vanilla-extract/sprinkles";

import { vars } from "~/theme.css";

export const backgroundSystem = defineProperties({
  properties: {
    backgroundColor: vars.color.background,
  },
  shorthands: {
    bg: ["backgroundColor"],
  },
});

export const colorSystem = defineProperties({
  properties: {
    color: Object.assign(vars.color.text, {
      gradient: {
        backgroundColor: "#fffd99",
        backgroundImage: "linear-gradient(45deg, #fffd99, #ffba27)",
        backgroundSize: "100%",
        "-webkit-text-fill-color": "transparent",
        "-moz-text-fill-color": "transparent",
        backgroundRepeat: "repeat",
        backgroundClip: "text",
      },
    }),
  },
});
