import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  "stories": [
    "../src/app/shared/ui/**/*.stories.@(ts|tsx)",
    "../src/app/features/entities/components/**/*.stories.@(ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": "@storybook/angular"
};
export default config;