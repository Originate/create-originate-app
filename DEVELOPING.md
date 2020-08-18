## project board

https://github.com/Originate/create-originate-app/projects/1

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
