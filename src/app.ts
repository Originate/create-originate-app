import { Command, program } from "commander"
import * as path from "path"
import chalk from "chalk"
import {
  log,
  getVersion,
  expectPort,
  Ports,
  copyTemplate,
  updateTemplate,
} from "./helpers"
import { run_yarn } from "./cmd"

export async function run(args: string[], branch_name: string = "master") {
  program
    .version(getVersion())
    .command("create <project_name>", { isDefault: true })
    .description("Make Something Original")
    .option(
      "-b, --backend-port <port_number>",
      "dev backend API port",
      expectPort,
    )
    .option(
      "-f, --frontend-port <port_number>",
      "dev frontend server port",
      expectPort,
    )
    .option("-d, --db-port <port_number>", "dev database port", expectPort)
    .option("-r, --revision <revision>", "git revision")
    .option("-n, --without-yarn", "Do not run yarn in project dir")
    .action(async (appName: string, command: Command) =>
      create(appName, branch_name, command.opts()),
    )

  await program.parseAsync(args)
}

async function create(
  appName: string,
  branch_name: string,
  opts: {
    frontendPort?: number
    backendPort?: number
    dbPort?: number
    withoutYarn?: boolean
    revision?: string
  },
) {
  const ports = await Ports.setup(opts)
  const targetDir = path.resolve(appName)

  log(chalk.cyan.bold(`Creating ${appName}`))
  log(chalk.blue(`Target Directory: ${targetDir}`))

  if (opts.revision) {
    branch_name = opts.revision
  }

  await copyTemplate(targetDir, branch_name)
  updateTemplate(appName, targetDir, ports)
  if (!opts.withoutYarn) {
    await run_yarn(targetDir)
  }

  log(chalk.cyan.bold("Finished"))
}
