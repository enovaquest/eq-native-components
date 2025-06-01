import { withBackgrounds } from "@storybook/addon-ondevice-backgrounds";
import type { Preview } from "@storybook/react";
import { ThemeProvider } from "../themes/themeProvider";

const withThemeProvider = (Story, context) => {
  return (
      <ThemeProvider initialThemeName="primaryEQTheme">
        <Story {...context} />
      </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [
    withBackgrounds,
    withThemeProvider
 ],

  parameters: {
    backgrounds: {
      default: "plain",
      values: [
        { name: "plain", value: "white" },
        { name: "warm", value: "hotpink" },
        { name: "cool", value: "deepskyblue" },
      ],
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
