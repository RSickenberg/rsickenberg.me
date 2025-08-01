import {defineConfig} from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import preact from "@astrojs/preact";
import icon from 'astro-icon';
import partytown from "@astrojs/partytown";
// import tailwindConfigViewer from 'astro-tailwind-config-viewer';

import browserslist from "browserslist";
import {resolveToEsbuildTarget} from "esbuild-plugin-browserslist";

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    vite: {
        build: {
            cssTarget: resolveToEsbuildTarget(browserslist(), {printUnknownTargets: false}),
            resolveToEsbuildTarget: resolveToEsbuildTarget(browserslist(), {printUnknownTargets: false}),
        },
		plugins: [tailwindcss()],
    },
    integrations: [
        preact({
            compat: true
        }),
        icon({
            include: {
                ph: ['head-circuit-thin', 'envelope-thin', 'github-logo-thin', 'linkedin-logo-thin', 'instagram-logo-thin', 'file-pdf-thin', 'megaphone', 'quotes'],
            }
        }),
        partytown({
            config: {
                forward: ['dataLayer.push']
            }
        }),
        sitemap({
            changefreq: 'weekly',
            priority: 0.7
        }),
        // tailwindConfigViewer({
        //     configFile: 'tailwind.config.cjs'
        // })],
		],
    site: 'https://rsickenberg.me',
    output: 'static',
});
