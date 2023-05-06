import { defineProperties } from "@vanilla-extract/sprinkles";

import { vars } from "~/theme.css";

export const textSystem = defineProperties({
  conditions: {
    mobile: {},
    tablet: { "@media": "screen and (min-width: 768px)" },
    desktop: { "@media": "screen and (min-width: 1024px)" },
  },
  defaultCondition: "mobile",
  responsiveArray: ["mobile", "tablet", "desktop"],
  properties: {
    textStyle: {
      small: {
        fontSize: vars.font.textSize.small,
        lineHeight: vars.font.textSizeHeight.small,
        fontFamily: vars.font.family.body,
        fontWeight: vars.font.textWeight.normal,
      },
      base: {
        fontSize: vars.font.textSize.base,
        lineHeight: vars.font.textSizeHeight.base,
        fontFamily: vars.font.family.body,
        fontWeight: vars.font.textWeight.normal,
      },
      large: {
        fontSize: vars.font.textSize.large,
        lineHeight: vars.font.textSizeHeight.large,
        fontFamily: vars.font.family.body,
        fontWeight: vars.font.textWeight.normal,
      },
      super: {
        fontSize: vars.font.textSize.super,
        lineHeight: vars.font.textSizeHeight.super,
        fontFamily: vars.font.family.body,
        fontWeight: vars.font.textWeight.normal,
      },
    },
  },
});

export const headingSystem = defineProperties({
  conditions: {
    mobile: {},
    tablet: { "@media": "screen and (min-width: 768px)" },
    desktop: { "@media": "screen and (min-width: 1024px)" },
  },
  defaultCondition: "mobile",
  responsiveArray: ["mobile", "tablet", "desktop"],
  properties: {
    headingStyle: {
      super: {
        fontSize: vars.font.headingSize.super,
        lineHeight: vars.font.headingSizeHeight.super,
        fontFamily: vars.font.family.heading,
        fontWeight: vars.font.headingWeight.medium,
      },
      superMobile: {
        fontSize: vars.font.headingSize.superMobile,
        lineHeight: vars.font.headingSizeHeight.superMobile,
        fontFamily: vars.font.family.heading,
        fontWeight: vars.font.headingWeight.medium,
      },
      title: {
        fontSize: vars.font.headingSize.title,
        lineHeight: vars.font.headingSizeHeight.title,
        fontFamily: vars.font.family.heading,
        fontWeight: vars.font.headingWeight.normal,
      },
      subtitle: {
        fontSize: vars.font.headingSize.subtitle,
        lineHeight: vars.font.headingSizeHeight.subtitle,
        fontFamily: vars.font.family.heading,
        fontWeight: vars.font.headingWeight.normal,
      },
    },
  },
});
