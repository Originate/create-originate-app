import * as prettier from "prettier"
import * as fs from "fs"
import * as path from "path"
import chalk from "chalk"
import getPort from "get-port"
import degit from "degit"
import stripIndent from "strip-indent"
import { git_branch_name } from "./cmd"

export const log = console.log

export function expectPort(input: unknown): number {
  if (typeof input === "string" && input.match(/\d+/)) {
    return parseInt(input, 10)
  }
  throw new Error(`Expected a port number, but got '${input}'`)
}

export enum Package {
  Frontend = "frontend",
  Backend = "backend",
  TopLevel = "toplevel",
}

export class Ports {
  constructor(
    public frontend: number,
    public backend: number,
    public db: number,
  ) {}

  static async setup(params: {
    frontendPort?: number
    backendPort?: number
    dbPort?: number
  }): Promise<Ports> {
    const normalizePort = async (p?: number) => p ?? getPort()
    // Run async functions in parallel using `Promise.all` to save precious
    // nanoseconds.
    return new Ports(
      ...(await Promise.all([
        normalizePort(params.frontendPort),
        normalizePort(params.backendPort),
        normalizePort(params.dbPort),
      ])),
    )
  }
}

export const FRONTEND_REGEXP = /NEXT_PUBLIC_GRAPHQL_URL=http:\/\/localhost:\d+\/graphql/
export const BACKEND_REGEXP = /PORT=\d+/g
export const DATABASE_URL_REGEXP = /DATABASE_URL=postgres:\/\/postgres:password@localhost\/postgres/
export const README_REGEXP = /@replaceme/

export async function copyTemplate(targetDir: string): Promise<void> {
  let template_path = `github:originate/create-originate-app/template#${git_branch_name()}`

  try {
    const emitter = degit(template_path, {
      force: true,
      verbose: true,
    })

    await emitter.clone(targetDir)

    log(
      chalk.cyan(
        `Template copied \nfrom: ${chalk.cyan.bold(
          template_path,
        )} \nto: ${chalk.cyan.bold(targetDir)}`,
      ),
    )
  } catch (err) {
    throw new Error(
      chalk.red(`Error copying template from ${template_path} to ${targetDir}`),
    )
  }
}

export function updateTemplate(
  appName: string,
  targetDir: string,
  ports: Ports,
) {
  editReadme(appName, targetDir, ports)
  editFrontendPackageJson(appName, targetDir, ports)
  editBackendPackageJson(appName, targetDir, ports)
  editBackendTopLevelJson(appName, targetDir)
  editFrontendEnvFile(targetDir, ports)
  editBackendEnvFile(targetDir, ports)

  log(
    chalk.cyan(
      stripIndent(
        `Updated template with values: 
  package name: ${chalk.cyan.bold(appName)}
  frontend port: ${chalk.cyan.bold(ports.frontend)}
  backend port: ${chalk.cyan.bold(ports.backend)}
  database port: ${chalk.cyan.bold(ports.db)}
`,
      ),
    ),
  )
}

export function editReadme(appName: string, targetDir: string, ports: Ports) {
  const filename = path.join(targetDir, `README.md`)
  const FRONTEND_PORT_REGEXP = /@frontendPort/
  const BACKEND_PORT_REGEXP = /@backendPort/
  const DB_PORT_REGEXP = /@dbPort/

  try {
    searchReplaceFile(README_REGEXP, appName, filename)
    searchReplaceFile(FRONTEND_PORT_REGEXP, ports.frontend.toString(), filename)
    searchReplaceFile(BACKEND_PORT_REGEXP, ports.backend.toString(), filename)
    searchReplaceFile(DB_PORT_REGEXP, ports.db.toString(), filename)
    log(chalk.blue(`Prepared ${filename}`))
  } catch (err) {
    throw new Error(chalk.red(`Error preparing ${filename}\n${err}`))
  }
}

export function editFrontendPackageJson(
  appName: string,
  targetDir: string,
  ports: Ports,
) {
  // Update name package.json to use appName
  const filename = path.join(
    targetDir,
    `packages/${Package.Frontend}/package.json`,
  )
  try {
    let json = JSON.parse(fs.readFileSync(filename, "utf8"))
    json.name = `@${appName}/${Package.Frontend}`
    json.scripts[
      "start:dev"
    ] = `concurrently -k 'next dev -p ${ports.frontend}' 'yarn codegen:watch'`
    fs.writeFileSync(
      filename,
      prettier.format(JSON.stringify(json), {
        semi: false,
        parser: "json",
      }),
    )
    log(chalk.blue(`Prepared ${filename}`))
    return
  } catch (err) {
    throw new Error(chalk.red(`Error preparing ${filename}\n${err}`))
  }
}

export function editBackendPackageJson(
  appName: string,
  targetDir: string,
  ports: Ports,
) {
  const filename = path.join(
    targetDir,
    `packages/${Package.Backend}/package.json`,
  )
  try {
    let json = JSON.parse(fs.readFileSync(filename, "utf8"))
    json.name = `@${appName}/${Package.Backend}`
    json.scripts[
      "db:start"
    ] = `docker start ${appName}-postgres 2>/dev/null || docker run -e POSTGRES_PASSWORD=password -p ${ports.db}:5432 -d --name ${appName}-postgres postgres:latest`
    json.scripts["db:stop"] = `docker stop ${appName}-postgres`
    json.scripts[
      "db:destroy"
    ] = `yarn db:stop >/dev/null && docker rm ${appName}-postgres`
    json.scripts[
      "db:shell"
    ] = `docker exec -it ${appName}-postgres psql -U postgres`
    fs.writeFileSync(
      filename,
      prettier.format(JSON.stringify(json), {
        semi: false,
        parser: "json",
      }),
    )
    log(chalk.blue(`Prepared ${filename}`))
    return
  } catch (err) {
    throw new Error(chalk.red(`Error preparing ${filename}\n${err}`))
  }
}

export function editBackendTopLevelJson(appName: string, targetDir: string) {
  const filename = path.join(targetDir, `package.json`)
  try {
    let json = JSON.parse(fs.readFileSync(filename, "utf8"))
    json.scripts[
      "dev:frontend"
    ] = `yarn workspace @${appName}/frontend start:dev`
    json.scripts["dev:backend"] = `yarn workspace @${appName}/backend start:dev`
    fs.writeFileSync(
      filename,
      prettier.format(JSON.stringify(json), { semi: false, parser: "json" }),
    )
    log(chalk.blue(`Prepared ${filename}`))
    return
  } catch (err) {
    throw new Error(chalk.red(`Error preparing ${filename}\n${err}`))
  }
}

export function editFrontendEnvFile(targetDir: string, ports: Ports) {
  const filename = `${targetDir}/packages/${Package.Frontend}/.env.development`
  let replace = `NEXT_PUBLIC_GRAPHQL_URL=http://localhost:${ports.backend}/graphql`
  searchReplaceFile(FRONTEND_REGEXP, replace, filename)
  log(chalk.blue(`Prepared ${filename}`))
  return
}

export function editBackendEnvFile(targetDir: string, ports: Ports) {
  const filename = `${targetDir}/packages/${Package.Backend}/.env.development`
  let backend_port_replace = `PORT=${ports.backend}`
  searchReplaceFile(BACKEND_REGEXP, backend_port_replace, filename)
  let database_url_replace = `DATABASE_URL=postgres://postgres:password@localhost:${ports.db}/postgres`
  searchReplaceFile(DATABASE_URL_REGEXP, database_url_replace, filename)
  log(chalk.blue(`Prepared ${filename}`))
  return
}

export function searchReplaceFile(
  regexp: RegExp,
  replace: string,
  filename: string,
) {
  let newEnv = ""
  fs.readFileSync(filename, "utf8")
    .split("\n")
    .forEach(function (line: string) {
      newEnv += line.replace(regexp, replace) + "\n"
    })

  try {
    fs.writeFileSync(filename, newEnv)
  } catch (err) {
    throw new Error(chalk.red(`Error preparing ${filename}\n${err}`))
  }
}

export function getVersion(): string {
  const json = fs.readFileSync(
    path.join(__dirname, "..", "package.json"),
    "utf8",
  )
  return JSON.parse(json).version
}
