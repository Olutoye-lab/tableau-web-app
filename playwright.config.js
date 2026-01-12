// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    launchOptions: {
      slowMo: 100,      // slows actions
      headless: false,  // opens the browser so you can see it
    },
  },
});
