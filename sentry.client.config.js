import * as Sentry from '@sentry/astro';

Sentry.init({
    dsn: "https://28360435ac4428d86537d9ce8dc20cf5@o4512448086736896.ingest.de.sentry.io/4512448089489488",

    release: 'rsickenberg-me@' + process.env.npm_package_version,
    sendDefaultPii: true,
    autoInstrumentation: {
        requestHandler: false,
    },
    sourceMapsUploadOptions: {
        project: "rsickenberg-me",
        authToken: process.env.SENTRY_AUTH_TOKEN,
    },
});
