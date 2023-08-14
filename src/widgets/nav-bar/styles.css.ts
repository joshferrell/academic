import { style, keyframes } from "@vanilla-extract/css";
import { sprinkles } from "~/sprinkles/index.css";
import { vars } from "~/theme.css";

const scaleIn = keyframes({
  from: {
    opacity: 0,
    transform: "rotateX(-30deg) scale(0.9)",
  },
  to: {
    opacity: 1,
    transform: "rotateX(0deg) scale(1)",
  },
});

const scaleOut = keyframes({
  from: {
    opacity: 1,
    transform: "rotateX(0deg) scale(1)",
  },
  to: {
    opacity: 0,
    transform: "rotateX(-10deg) scale(0.95)",
  },
});

export const Root = style([
  sprinkles({
    maxWidth: "container",
    marginX: "auto",
  }),
  {
    position: "relative",
    width: "100vw",
  },
]);

export const List = style([
  sprinkles({
    display: "flex",
    gap: [1, 4],
    justifyContent: ["center", "flex-start"],
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 0,
    margin: 0,
  }),
  {
    listStyleType: "none",
  },
]);

export const LinkItem = style([
  sprinkles({
    padding: 1,
    borderRadius: "md",
  }),
  {
    borderRadius: vars.radius.md,
    ":hover": {
      background: vars.color.background["surface-01"],
      color: `${vars.color.text.body} !important`,
    },
    ':focus-within': {
      background: vars.color.background["surface-01"],
      color: `${vars.color.text.body} !important`,
    }
  },
]);

export const FooterLink = style([
  sprinkles({
    color: 'body',
    paddingX: 1,
    paddingY: .5,
    display: 'block'
  }),
  {
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
      color: vars.color.interactive.primaryHover
    }
  }
])

export const LinkItemIcon = style([
  sprinkles({
    padding: 0.5,
    borderRadius: 'md',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'footer'
  }),
  {
    boxSizing: 'border-box',
    color: vars.color.text.body,
    height: '40px',
    width: '40px',
    selectors: {
      [`${LinkItem}:focus-within &, ${LinkItem}:hover &`]: {
        color: vars.color.text.highlight
      }
    }
  }
])

export const Link = style([
  sprinkles({
    display: "block",
    paddingY: 0.5,
    paddingX: 1,
    borderRadius: "sm",
    color: "soft",
    textStyle: "large",
  }),
  {
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    textDecoration: "none",
    ":focus": {
      boxShadow: `0 0 0 2px ${vars.color.text.highlight}`,
    },
    ":hover": {
      color: vars.color.text.body,
      backgroundColor: vars.color.background["surface-01"],
    },
  },
]);

export const Content = style({
  position: "absolute",
  top: 0,
  left: 0,
  color: vars.color.text.body,
  width: "100%",
  // height: "var(--radix-navigation-menu-viewport-height)",
  "@media": {
    "screen and (min-width: 768px)": {
      width: "auto",
    },
  },
});

export const ViewportPosition = style({
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  width: "100%",
  zIndex: 99999,
  top: "100%",
  boxSizing: "border-box",
  left: 0,
  perspective: "2000px",
});

export const Viewport = style({
  position: "relative",
  transformOrigin: "top center",
  marginTop: "10px",
  background: "white",
  boxShadow:
    "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(17, 24, 39, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px",
  borderRadius: "6px",
  boxSizing: "content-box",
  width: "100%",
  height: "var(--radix-navigation-menu-viewport-height)",
  transition: "width, 300ms ease",
  selectors: {
    '&[data-state="open"]': {
      animation: `${scaleIn} 200ms ease`,
    },
    '&[data-state="closed"]': {
      animation: `${scaleOut} 200ms ease`,
    },
  },
  "@media": {
    "(prefers-reduced-motion)": {
      animation: "none !important",
    },
    "screen and (min-width: 768px)": {
      width: "var(--radix-navigation-menu-viewport-width)",
    },
  },
});

export const FeaturedProject = style({});
