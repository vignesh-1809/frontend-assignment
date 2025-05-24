import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

// Set the default theme to light
addons.setConfig({
  theme: themes.light,
});