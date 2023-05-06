import { createTheme, globalStyle } from "@vanilla-extract/css";

const palette = {
  primary: {
    800: "#10251B",
    600: "#1E4C34",
    400: "#39755A",
    300: "#6A9E82",
    200: "#A5C5AD",
    100: "#C3DeD5",
  },
  secondary: {
    800: "#AA4b00",
    600: "#D97300",
    400: "#FF8A00",
    300: "#FFAB36",
    200: "#FFC875",
    100: "#FFE3b3",
  },
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0a0a0a",
  },
};

export const [themeClass, vars] = createTheme({
  color: {
    background: {
      body: palette.neutral[50],
      "surface-01": palette.primary[200],
      inverted: palette.primary[800],
    },
    text: {
      body: palette.primary[800],
      secondary: palette.primary[400],
      soft: palette.primary[200],
      inverted: palette.neutral[50],
      highlight: palette.primary[400],
    },
    link: {
      primary: palette.primary[600],
      "primary-hover": palette.primary[800],
    },
    borders: {
      primary: palette.primary[800],
    },
    interactive: {
      primary: palette.primary[600],
      primaryHover: palette.primary[400],
      primaryText: palette.neutral[100],
      secondary: palette.secondary[600],
      secondaryHover: palette.secondary[400],
      secondaryText: palette.neutral[100],
    },
  },
  font: {
    family: {
      heading: "var(--font-heading), Georgia, serif",
      body: 'var(--font-body), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
    textSize: {
      small: "0.875rem",
      base: "1rem",
      large: "1.125rem",
      super: "1.25rem",
    },
    textSizeHeight: {
      small: "1.25rem",
      base: "1.5rem",
      large: "1.75rem",
      super: "2rem",
    },
    textWeight: {
      light: "300",
      normal: "400",
      medium: "600",
      bold: "700",
    },
    headingSize: {
      super: "4.5rem",
      superMobile: "3rem",
      title: "2.25rem",
      subtitle: "1.5rem",
    },
    headingSizeHeight: {
      super: "1",
      superMobile: "3.15rem",
      title: "2.5rem",
      subtitle: "2rem",
    },
    headingWeight: {
      normal: "400",
      medium: "600",
      bold: "700",
    },
  },
  space: {
    none: "0rem",
    auto: "auto",
    0: "0rem",
    0.125: "0.125rem",
    0.25: "0.25rem",
    0.5: "0.5rem",
    1: "1rem",
    2: "1.5rem",
    3: "2rem",
    4: "2.5rem",
    5: "3rem",
    6: "4rem",
    7: "5rem",
    8: "6rem",
    9: "10rem",
  },
  radius: {
    none: "0rem",
    0: "0rem",
    sm: "0.25rem",
    md: "0.5rem",
    all: "999999999px",
  },
});

globalStyle("a", {
  color: vars.color.link.primary,
  transition: "all 0.1s ease-in",
});
globalStyle("a:hover", { color: vars.color.link["primary-hover"] });
