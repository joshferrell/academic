import { defineProperties } from "@vanilla-extract/sprinkles";
import { vars } from "~/theme.css";

export const flex = defineProperties({
  conditions: {
    mobile: {},
    tablet: { "@media": "screen and (min-width: 768px)" },
    desktop: { "@media": "screen and (min-width: 1024px)" },
  },
  defaultCondition: "mobile",
  responsiveArray: ["mobile", "tablet", "desktop"],
  properties: {
    flex: {
      full: "100%",
      1: 1,
      2: 2,
      3: 3,
    },
    flexDirection: ["row", "column", "column-reverse", "row-reverse"],
    flexWrap: ["wrap", "nowrap"],
    justifyContent: ["center", "flex-start", "flex-end"],
    alignItems: ["flex-start", "flex-end", "center"],
    gap: vars.space,
  },
});

export const display = defineProperties({
  conditions: {
    mobile: {},
    tablet: { "@media": "screen and (min-width: 768px)" },
    desktop: { "@media": "screen and (min-width: 1024px)" },
  },
  defaultCondition: "mobile",
  responsiveArray: ["mobile", "tablet", "desktop"],
  properties: {
    display: [
      "grid",
      "flex",
      "inline-flex",
      "inline-block",
      "inline",
      "inline-flex",
      "inline-grid",
      "block",
    ],
  },
});
