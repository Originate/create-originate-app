## project board

https://github.com/Originate/create-originate-app/projects/1

TODO: The instructions is this document are out-of-date

## ~/.npmrc

[Create a personal access token](https://github.com/settings/tokens) and then add this to your `~/.npmrc`. This allows Yarn and NPM to find [@Originate/leash](https://github.com/Originate/leash).

```
@Originate:registry=https://npm.pkg.github.com

_authToken=<PASTE AUTH TOKEN HERE>
always-auth=true
```

## development install

We ask users to run create-originate-app by running `npx create-originate-app [folder]`, just as create-react-app does. However, this is a poor experience if you're actively hacking on COA, as you won't want to litter your filesystem with thousands of directories. What you should do, instead, is:

- `yarn init [app name]`
- `cd [app name]`
- `git clone https://github.com/Originate/create-originate-app vendor/`
- `rm -f package.json && ./vendor/bootstrap`
- Put your changes into `./vendor`
- `rm -f package.json && ./vendor/bootstrap`
- Debug
- `rm -f package.json && ./vendor/bootstrap`
- Rinse, lather, repeat

`rm -f package.json && ./vendor/boostrap` is designed to be run as many times as you want. (We could say it's idempotent.) As you add new files and directories to COA, `./vendor/bootstrap` will refuse to sync them over, for fear of overwriting a project's files. But removing `package.json` triggers its "oh, ok, you want to set up fresh" logic.

### alternatively

The `./template` directory in this project is designed to be a working Yarn package. You should be able to:

- `git clone https://github.com/Originate/create-originate-app coa`
- `cd coa/template`
- `yarn`
- `../dev`

To run the development environment as usual. This sort of works as a happy side effect of our design, because we currently do not have any empty values to fill in. It might be that we preserve this quality of the app as we continue to expand the project, but it also might be that we replace this mechanism with something similar. In any case, these two development workflows are designed to minimize the write-test-debug loop, which can be long when you're working on a project like this.

## continuous integration

There are _two_ instances of `.github/workflows/ci.yml` in this repository: one in `templates/` and one in the root directory. The reason for that is we want to initialize new apps with a GitHub CI, but we _also_ want to run CI on our own project. The one we run on our own project is a little convoluted because we need access to the `@Originate` organization to grab the `@Originate/leash` project. To accomplish that, we set up a `machine-originate` user, whose password you can find on Slack in the `#create-originate-app` channel, whose personal access token we've added to the repository as `MACHINE_GITHUB_PACKAGES_TOKEN`. The user's email address is `machine@originate.com`, which points to a Google Group that you should have read/write access to already.
