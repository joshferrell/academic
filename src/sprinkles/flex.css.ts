import { defineProperties } from "@vanilla-extract/sprinkles";
import { vars } from "~/theme.css";

const articleSizes = {
  xs: "150px 1fr",
  sm: "200px 1fr",
  md: "300px 1fr",
  lg: "340px 1fr",
};

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
    height: { xs: "150px", sm: "200px", md: "300px", lg: "340px" },
    gridTemplateColumns: articleSizes,
    gridTemplateRows: { sm: "200px", md: "300px", lg: "340px" },
    flexDirection: ["row", "column", "column-reverse", "row-reverse"],
    flexWrap: ["wrap", "nowrap"],
    justifyContent: ["center", "flex-start", "flex-end", "space-between"],
    alignItems: ["flex-start", "flex-end", "center", "stetch"],
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
