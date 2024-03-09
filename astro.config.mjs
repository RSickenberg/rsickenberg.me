import {defineConfig} from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import preact from "@astrojs/preact";
import icon from 'astro-icon';
import partytown from "@astrojs/partytown";

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
            forward: ['dataLayer.push'],
        }
    })],
    site: 'https://next.rsickenberg.me',
    output: 'static',
});