import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import preact from "@astrojs/preact";
import icon from 'astro-icon';
import partytown from "@astrojs/partytown";

import browserslist from "browserslist";
import { resolveToEsbuildTarget } from "esbuild-plugin-browserslist";

// https://astro.build/config
import sentry from "@sentry/astro";

// https://astro.build/config
export default defineConfig({
  vite : {
    build: {
      cssTarget: resolveToEsbuildTarget(browserslist()),
      resolveToEsbuildTarget: resolveToEsbuildTarget(browserslist())
    }
  },
  integrations: [tailwind(), preact({
    compat: true
  }), icon({
    include: {
      ph: ['head-circuit-thin', 'envelope-thin', 'github-logo-thin', 'linkedin-logo-thin', 'instagram-logo-thin', 'file-pdf-thin', 'megaphone', 'quotes'],
    }
  }), partytown({
    config: {
      forward: ['dataLayer.push']
    }
  }), sentry({
    dsn: "https://b3cfcc72d00637196118bd93eeb135b4@o562906.ingest.us.sentry.io/4506882226323456",
    sourceMapsUploadOptions: {
      project: "rsickenberg-me",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    },
  })],
  site: 'https://rsickenberg.me',
  output: 'static',
});