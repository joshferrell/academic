import { defineProperties } from "@vanilla-extract/sprinkles";
import { keyframes } from "@vanilla-extract/css";

const moveBg = keyframes({
  to: {
    backgroundPosition: "400% 0",
  },
});

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
        background:
          "linear-gradient(45deg, #fffd99, #96e2ff, #fffd99) 0 0 / 400% 100%",
        backgroundSize: "400%",
        "-webkit-text-fill-color": "transparent",
        "-moz-text-fill-color": "transparent",
        backgroundRepeat: "repeat",
        backgroundClip: "text",
        "@media": {
          "(prefers-reduced-motion: no-preference)": {
            animation: `${moveBg} 40s infinite linear`,
          },
        },
      },
    }),
  },
});
