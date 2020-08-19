`npx github:Originate/create-originate-app [app name]` to get started.

## prerequisites

- Fairly modern macOS or Linux
- Node v12 ([see "Node Target Mapping"](https://github.com/microsoft/TypeScript/wiki/Node-Target-Mapping) for other Node versions, [see "tj/n"](https://github.com/tj/n) for Node management)
- Set up your ~/.npmrc (see below)
- Yarn
- Git
- zsh

## ~/.npmrc

[Create a personal access token](https://github.com/settings/tokens) and then add this to your `~/.npmrc`. This allows Yarn and NPM to find [@Originate/leash](https://github.com/Originate/leash).

```
@Originate:registry=https://npm.pkg.github.com

_authToken=<PASTE AUTH TOKEN HERE>
always-auth=true
```

## design document

See [issue 1](https://github.com/Originate/create-originate-app/issues/1).

## features thus far

### `yarn typecheck:watch` (or `yarn tw`)

Runs TypeScript on the much-beloved Watch Mode™ so you can keep an eye on type mishaps across the whole project while you write new code or refactor. You can run `yarn typecheck` to just typecheck once.

### `yarn dev`

This spins up the HTTP service on endpoint `http://localhost:3000` and webpack-dev-server on endpoint `http://localhost:8080`. (We've taught Webpack to proxy server requests back to `:3000`.) If you open `:8080` in a browser, you should see the changes you make to your React components appear on the page in realtime. You may know this feature variously as Hot Module Reloading or Fast Refresh. No matter what you call it, it's cool.

### `yarn lint`

Checks ESLint (which also runs Prettier) against the codebase. Run `yarn fix` to automatically fix problems that can be automatically fixed. Let us know if your text editor is able to run Prettier upon file saves; it should be able to pick up Prettier from its location in the project's `node_modules/`.

### ci

Push to a GitHub repo to run the CI, which typechecks and lints the repo on each push to each branch.
