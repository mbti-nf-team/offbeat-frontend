import path, { dirname, join } from "path";

import type { StorybookConfig } from "@storybook/nextjs";

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
  staticDirs: ['../public'],
  stories: [
    "../src/components/**/*.stories.mdx",
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/stories/**/*.mdx", 
    "../src/stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@chromatic-com/storybook"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/nextjs"),
    options: {
      nextConfigPath: path.resolve(__dirname, '../next.config.js'),
    },
  },
  webpackFinal: async (config) => {
    const imageRule = config.module?.rules?.find((rule) => {
      const test = (rule as { test: RegExp }).test;

      if (!test) {
        return false;
      }

      return test.test(".svg");
    }) as { [key: string]: any };

    imageRule.exclude = /\.svg$/;

    config.module?.rules?.push({
      test: /\.svg$/,
      use: [{
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: [{
              name: 'removeViewBox',
              active: false,
            }],
          },
        },
      }],
    });

    return config;
  },
  typescript: {
    check: true,
    reactDocgen: "react-docgen-typescript"
  }
};

export default config;
