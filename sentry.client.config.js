import * as Sentry from '@sentry/astro';

Sentry.init({
    dsn: "https://b3cfcc72d00637196118bd93eeb135b4@o562906.ingest.us.sentry.io/4506882226323456",

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
