import * as prettier from "prettier";
import * as fs from "fs";
import * as fse from "fs-extra";
import * as path from "path";
import chalk from "chalk";
export const log = console.log;
import getPort from "get-port";

export enum Package {
  Frontend = "frontend",
  Backend = "backend",
  TopLevel = "toplevel",
}

export class Ports {
  frontend: number | undefined = undefined;
  backend: number | undefined = undefined;
  db: number | undefined = undefined;
  setup = async (): Promise<void> => {
    if (this.backend === undefined) {
      this.backend = await getPort();
    }
    if (this.frontend === undefined) {
      this.frontend = await getPort();
    }
    if (this.db === undefined) {
      this.db = await getPort();
    }
  };
}

export const FRONTEND_REGEXP = /\NEXT_PUBLIC_GRAPHQL_URL=http:\/\/localhost:\d+\/graphql/;
export const BACKEND_REGEXP = /\PORT=\d+/g;
export const DATABASE_URL_REGEXP = /\DATABASE_URL=postgres:\/\/postgres:password@localhost\/postgres/;

export class UnreachableCaseError extends Error {
  constructor(val: never) {
    super(`Unreachable case: ${JSON.stringify(val)}`);
  }
}

export function copyTemplate(srcDir: string, targetDir: string) {
  // Copy template, ignoring node_modules
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
  ports: Ports
) {
  editReadme(appName, targetDir);
  editPackageJson(appName, targetDir, Package.Frontend, ports);
  editPackageJson(appName, targetDir, Package.Backend, ports);
  editPackageJson(appName, targetDir, Package.TopLevel, ports);
  editEnvFile(targetDir, Package.Frontend, ports);
  editEnvFile(targetDir, Package.Backend, ports);
  log(
    chalk.cyan(
      `Updated template with values: 
  package name: ${chalk.cyan.bold(appName)}
  frontend port: ${chalk.cyan.bold(ports.frontend)}
  backend port: ${chalk.cyan.bold(ports.backend)}
  database port: ${chalk.cyan.bold(ports.db)}
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
  packageName: Package,
  ports: Ports
) {
  let filename!: string;
  try {
    switch (packageName) {
      case Package.Frontend: {
        // Update name package.json to use appName
        filename = path.join(targetDir, `packages/${packageName}/package.json`);
        let json = JSON.parse(fs.readFileSync(filename).toString());
        json.scripts["name"] = `@${appName}/${packageName}`;
        json.scripts[
          "start:dev"
        ] = `concurrently -k 'next dev -p ${ports.frontend}' 'yarn codegen:watch'`;
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
      case Package.Backend: {
        // Update name and db commands in package.json to use appName
        filename = path.join(targetDir, `packages/${packageName}/package.json`);
        let json = JSON.parse(fs.readFileSync(filename).toString());
        json.name = `@${appName}/${packageName}`;
        json.scripts[
          "db:start"
        ] = `docker start ${appName}-postgres 2>/dev/null || docker run -e POSTGRES_PASSWORD=password -p ${ports.db}:5432 -d --name ${appName}-postgres postgres:latest`;
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
      case Package.TopLevel: {
        filename = path.join(targetDir, `package.json`);
        let json = JSON.parse(fs.readFileSync(filename).toString());
        json.scripts[
          "dev:frontend"
        ] = `yarn workspace @${appName}/frontend start:dev`;
        json.scripts[
          "dev:backend"
        ] = `yarn workspace @${appName}/backend start:dev`;
        fs.writeFileSync(
          filename,
          prettier.format(JSON.stringify(json), { semi: false, parser: "json" })
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
  targetDir: string,
  packageName: Package,
  ports: Ports
) {
  // Updates backend port in .env files
  switch (packageName) {
    case Package.Frontend: {
      const filename = `${targetDir}/packages/${packageName}/.env.development`;
      let replace = `NEXT_PUBLIC_GRAPHQL_URL=http:\/\/localhost:${ports.backend}\/graphql`;
      searchReplaceFile(FRONTEND_REGEXP, replace, filename);
      return;
    }
    case Package.Backend: {
      const filename = `${targetDir}/packages/${packageName}/.env`;
      let backend_port_replace = `PORT=${ports.backend}`;
      searchReplaceFile(BACKEND_REGEXP, backend_port_replace, filename);
      let database_url_replace = `DATABASE_URL=postgres://postgres:password@localhost:${ports.db}/postgres`;
      searchReplaceFile(DATABASE_URL_REGEXP, database_url_replace, filename);
      return;
    }
    case Package.TopLevel: {
      throw new Error("No .env in top level package.json");
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
