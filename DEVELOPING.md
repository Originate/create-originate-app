## development install

You won't want to constantly run `npx` as you work on COA. You can instead clone this project to a `vendor` directory inside a test project and then modify COA from within that directory.

- `yarn init [app name]`
- `cd [app name]`
- `git clone https://github.com/Originate/create-originate-app vendor/`
- `rm -f package.json && ./vendor/bootstrap`

`rm -f package.json && ./vendor/boostrap` is designed to be run as many times as you want (idempotent), so you should be able to add new features to COA and then see them immediately by rerunning that one-liner.
