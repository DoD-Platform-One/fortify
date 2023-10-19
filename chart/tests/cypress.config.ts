import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    videoCompression: false,
    env: {
      url: "https://fortify.bigbang.dev",
      new_pwd: "6g#yN2^Ky[l^kPA"
    },
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
