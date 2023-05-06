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
    color: vars.color.text,
  },
});
