import * as prettier from "prettier";
import * as fs from "fs";
import * as fse from "fs-extra";
import * as path from "path";
//@ts-ignore
import * as portastic from "portastic";
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
  try {
    fse.copySync(srcDir, targetDir);
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

export function editPackageJson(
  appName: string,
  targetDir: string,
  packageName: Package
) {
  const filename = path.join(targetDir, `packages/${packageName}/package.json`);

  try {
    let json = JSON.parse(fs.readFileSync(filename).toString());
    json = Object.assign({}, json, {
      name: `@${appName}/${packageName}`,
    });
    fs.writeFileSync(
      filename,
      prettier.format(JSON.stringify(json), { semi: false, parser: "json" })
    );
    log(chalk.blue(`Prepared ${filename}`));
  } catch (err) {
    throw new Error(chalk.red(`Error preparing ${filename}\n${err}`));
  }
}

export function editEnvFile(
  port: number,
  targetDir: string,
  packageName: Package
) {
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

export async function findEmptyPort(): Promise<number> {
  //TODO: Do we want to choose a port range for originate projects or leave it open? 10000-14999?
  const randomPort = Math.floor(Math.random() * (65535 - 10000 + 1)) + 10000;
  const inUse = await portastic.test(randomPort);
  if (inUse) {
    return findEmptyPort();
  } else {
    return randomPort;
  }
}
