import { createSprinkles } from "@vanilla-extract/sprinkles";

import { paddingSystem, marginSystem } from "./space.css";
import { textSystem, headingSystem } from "./text.css";
import { backgroundSystem, colorSystem } from "./colors.css";
import { maxWidth, width } from "./width.css";
import { flex, display } from "./flex.css";

export const sprinkles = createSprinkles(
  paddingSystem,
  marginSystem,
  textSystem,
  headingSystem,
  colorSystem,
  backgroundSystem,
  maxWidth,
  width,
  flex,
  display
);

export type Sprinkles = Parameters<typeof sprinkles>[0];
export type TextSystem = Pick<Sprinkles, "textStyle">;
export type HeadingSystem = Pick<Sprinkles, "headingStyle">;
export type SpacingSystem = Pick<
  Sprinkles,
  | "padding"
  | "paddingLeft"
  | "paddingRight"
  | "paddingBottom"
  | "paddingTop"
  | "paddingX"
  | "paddingY"
  | "margin"
  | "marginBottom"
  | "marginLeft"
  | "marginRight"
  | "marginTop"
  | "marginX"
  | "marginY"
>;
export type MarginSystem = Pick<
  Sprinkles,
  | "margin"
  | "marginBottom"
  | "marginLeft"
  | "marginRight"
  | "marginTop"
  | "marginX"
  | "marginY"
>;
export type WidthSystem = Pick<Sprinkles, "width" | "maxWidth">;
export type FlexSystem = Pick<Sprinkles, "flex">;
