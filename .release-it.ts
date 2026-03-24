import type {Config} from 'release-it';

export default {
    git: {
        commit: true,
        tag: true,
        push: true,
        commitMessage: "chore(release): ${version}",
        tagName: "v${version}",
        requireCleanWorkingDir: false,
        requireBranch: "main",
        requireUpstream: true,
        pushArgs: ["--follow-tags"],
        pushRepo: "origin",
        tagArgs: ['-s']
    },
    github: {
        release: true,
        draft: true,
        releaseNotes: "npx auto-changelog --commit-limit false --stdout --unreleased-only -v ${version} --template https://raw.githubusercontent.com/release-it/release-it/main/templates/keepachangelog.hbs",
    },
    hooks: {
        "after:bump": "npx auto-changelog -p --commit-limit false -u"
    }
} satisfies Config;
