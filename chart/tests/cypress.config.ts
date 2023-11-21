import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    env: {
      url: "https://fortify.bigbang.dev",
      new_pwd: "6g#yN2^Ky[l^kPA"
    },
    video: true,
    videoCompression: 35,
    screenshot: true,
    screenshotOnRunFailure: true,
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
