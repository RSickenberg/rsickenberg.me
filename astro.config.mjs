import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import preact from "@astrojs/preact";
import icon from 'astro-icon';
import partytown from "@astrojs/partytown";

// https://astro.build/config
import sentry from "@sentry/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact({
    compat: true
  }), icon({
    include: {
      arcticons: ['mail', 'github', 'linkedin', 'x-twitter', 'document-viewer']
    }
  }), partytown({
    config: {
      forward: ['dataLayer.push']
    }
  }), sentry({
    dsn: "https://b3cfcc72d00637196118bd93eeb135b4@o562906.ingest.us.sentry.io/4506882226323456",
    sourceMapsUploadOptions: {
      project: "rsickenberg-next",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    },
  })],
  site: 'https://rsickenberg.me',
  output: 'static',
});