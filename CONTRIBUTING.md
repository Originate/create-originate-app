# Contributing

## Automated Releases

This project uses an automated release system. Changes merged to the `master`
branch will automatically produce a new tagged release, and a deploy to NPM if
the changes contain new features or bug fixes. For details on how this works see
the [Semantic Release documentation][].

[semantic release documentation]: https://semantic-release.gitbook.io/semantic-release/

We use specially-formatted commit messages to indicate whether each commit
contains a feature, a bug fix, a breaking change, or another type of change. See
[Conventional Commits][] for the commit message specification. When merging pull
requests please either squash and merge, or create a merge commit, and follow
the Conventional Commits commit message format! Basically the format requires
that the title begin with a tag to indicate a type of change, a colon, and then
a free-form description. For example,

- `feat: introduce feature X`
- `fix: feature X no longer does bad thing Y`
- `ci: set up automated releases / tests / etc.`
- `build: change webpack configuration`
- `docs: add contributing guidelines`
- `test: add test coverage to feature X`

To enforce the format we have a Github workflow that checks the title of each PR
against the spec. Please make sure that workflow passes before merging the PR,
and **make sure to use the title of the PR as the first line of the commit
message** when you merge. When you merge a PR Github automatically copies the PR
title into the first line of the commit message. It's OK to append the PR
number, or a ticket number - but please use the PR title as-is otherwise. If the
PR includes any breaking changes make sure to include a `BREAKING CHANGE:`
footer in the extended description according to the Conventional Commits spec.

[conventional commits]: https://www.conventionalcommits.org/en/v1.0.0/

When commits are pushed to `master` one of the following happens:

- If a new commit contains a `BREAKING CHANGE:` footer then the major number of
  the version is incremented (e.g. `v1.0.1` changes to `v2.0.0`), and the new
  version is published.
- If a new commit begins with `feat:` then the minor number of the version is
  incremented (e.g. `v1.0.1` changes to `v1.1.0`), and the new version is
  published.
- If a new commit begins with `fix:` then the patch number of the version is
  incremented (e.g. `v1.0.1` changes to `v1.0.2`), and the new version is
  published.
- If none of the above applies then nothing special happens - we don't create
  a tag or publish a release if there are no new features, fixes, or breaking
  changes.

Semantic Release also generates a change log for each release based on the
specially-formatted commit messages. You can see these on the Github releases
page.
