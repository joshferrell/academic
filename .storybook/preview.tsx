import React from "react";
import type { Preview } from "@storybook/react";
import { themeClass } from "../src/theme.css";

import { Playfair_Display, Inter } from "next/font/google";
import "normalize.css";

const headingFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        className={`${bodyFont.variable} ${headingFont.variable} ${themeClass}`}
      >
        <Story />
      </div>
    ),
  ],
};

export default preview;
