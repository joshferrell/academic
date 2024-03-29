import type { StorybookConfig } from "@storybook/nextjs";
import { VanillaExtractPlugin } from '@vanilla-extract/webpack-plugin';

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  core: {
    builder: '@storybook/builder-webpack5'
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    return Object.assign({}, config, {
      plugins:  config.plugins?.concat([new VanillaExtractPlugin()]),
    })
  }
};
export default config;
