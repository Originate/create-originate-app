import * as prettier from "prettier";
import * as fs from "fs";
import * as fse from "fs-extra";
import * as path from "path";
import chalk from "chalk";
export const log = console.log;

export enum Package {
  Frontend = "frontend",
  Backend = "backend",
}

export const FRONTEND_REGEXP = /\NEXT_PUBLIC_GRAPHQL_URL=http:\/\/localhost:\d+\/graphql/;
export const BACKEND_REGEXP = /\PORT=\d+/g;

export class UnreachableCaseError extends Error {
  constructor(val: never) {
    super(`Unreachable case: ${JSON.stringify(val)}`);
  }
}

export function copyTemplate(srcDir: string, targetDir: string) {
  // Copy template ignoring node_modules
  try {
    fse.copySync(srcDir, targetDir, {
      filter: function (path) {
        return !(path.indexOf("node_modules") > -1);
      },
    });
    log(chalk.cyan(`Template copied to:\n  ${chalk.cyan.bold(targetDir)}`));
  } catch {
    throw new Error(
      chalk.red(`Error copying template from ${srcDir} to ${targetDir}`)
    );
  }
}

export function updateTemplate(
  appName: string,
  targetDir: string,
  port: number
) {
  editReadme(appName, targetDir);
  editPackageJson(appName, targetDir, Package.Frontend);
  editPackageJson(appName, targetDir, Package.Backend);
  editEnvFile(port, targetDir, Package.Frontend);
  editEnvFile(port, targetDir, Package.Backend);
  log(
    chalk.cyan(
      `Updated template with values: 
  package name: ${chalk.cyan.bold(appName)}
  backend port: ${chalk.cyan.bold(port)}
`
    )
  );
}

export function editReadme(appName: string, targetDir: string) {
  const filename = path.join(targetDir, `README.md`);

  try {
    const readmeContents = `#${appName}\n\nGenerated with create-originate-app`;
    fs.writeFileSync(filename, readmeContents);
    log(chalk.blue(`Prepared ${filename}`));
  } catch (err) {
    throw new Error(chalk.red(`Error preparing ${filename}\n${err}`));
  }
}

export function editPackageJson(
  appName: string,
  targetDir: string,
  packageName: Package
) {
  const filename = path.join(targetDir, `packages/${packageName}/package.json`);

  try {
    switch (packageName) {
      case Package.Frontend: {
        // Update name package.json to use appName
        let json = JSON.parse(fs.readFileSync(filename).toString());
        json = Object.assign({}, json, {
          name: `@${appName}/${packageName}`,
        });
        fs.writeFileSync(
          filename,
          prettier.format(JSON.stringify(json), { semi: false, parser: "json" })
        );
        log(chalk.blue(`Prepared ${filename}`));
        return;
      }
      case Package.Backend: {
        // Update name and db commands in package.json to use appName
        let json = JSON.parse(fs.readFileSync(filename).toString());
        json.name = `@${appName}/${packageName}`;
        json.scripts[
          "db:start"
        ] = `docker start ${appName}-postgres 2>/dev/null || docker run -e POSTGRES_PASSWORD=password -p 5432:5432 -d --name ${appName}-postgres postgres:latest`;
        json.scripts["db:stop"] = `docker stop ${appName}-postgres`;
        json.scripts[
          "db:destroy"
        ] = `yarn db:stop >/dev/null && docker rm ${appName}-postgres`;
        json.scripts[
          "db:shell"
        ] = `docker exec -it ${appName}-postgres psql -U postgres`;
        fs.writeFileSync(
          filename,
          prettier.format(JSON.stringify(json), {
            semi: false,
            parser: "json",
          })
        );
        log(chalk.blue(`Prepared ${filename}`));
        return;
      }
      default:
        throw new UnreachableCaseError(packageName);
    }
  } catch (err) {
    throw new Error(chalk.red(`Error preparing ${filename}\n${err}`));
  }
}

export function editEnvFile(
  port: number,
  targetDir: string,
  packageName: Package
) {
  // Updates backend port in .env files
  switch (packageName) {
    case Package.Frontend: {
      const filename = `${targetDir}/packages/${packageName}/.env.development`;
      let replace = `NEXT_PUBLIC_GRAPHQL_URL=http:\/\/localhost:${port}\/graphql`;
      searchReplaceFile(FRONTEND_REGEXP, replace, filename);
      return;
    }
    case Package.Backend: {
      const filename = `${targetDir}/packages/${packageName}/.env`;
      let replace = `PORT=${port}`;
      searchReplaceFile(BACKEND_REGEXP, replace, filename);
      return;
    }
    default:
      throw new UnreachableCaseError(packageName);
  }
}

export function searchReplaceFile(
  regexp: RegExp,
  replace: string,
  filename: string
) {
  var newEnv = "";
  fs.readFileSync(filename, "utf8")
    .split("\n")
    .forEach(function (line: string) {
      newEnv += line.replace(regexp, replace) + "\n";
    });

  try {
    fs.writeFileSync(filename, newEnv);
    log(chalk.blue(`Prepared ${filename}`));
  } catch (err) {
    throw new Error(chalk.red(`Error preparing ${filename}\n${err}`));
  }
}
