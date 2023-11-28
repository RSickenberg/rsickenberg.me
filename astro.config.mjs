import {
    defineConfig
}
from 'astro/config';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import preact from "@astrojs/preact";
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({ 
    integrations: [tailwind(), preact({compat: true}), icon({
        include: {
            arcticons: ['mail', 'github', 'linkedin', 'x-twitter', 'document-viewer']
        }
    })],
    site: 'https://next.rsickenberg.me',
});
