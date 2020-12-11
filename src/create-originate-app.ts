#!/usr/bin/env node

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

const logo = () => {
  console.error(
    chalk.magenta.bold.bgGray(`
   _                              
  / \\ ._ o  _  o ._   _. _|_  _   
  \\_/ |  | (_| | | | (_|  |_ (/_  
           __|                    
                                  
      Create-Originate-App        
`),
  )
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch(err => {
    console.error(`error: ${err.message}`)
    process.exit(1)
  })

async function main() {
  logo()

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
    .action(async (appName: string, command: Command) =>
      create(appName, command.opts()),
    )

  await program.parseAsync(process.argv)
}

async function create(
  appName: string,
  opts: {
    frontendPort?: number
    backendPort?: number
    dbPort?: number
  },
) {
  const ports = await Ports.setup(opts)
  const targetDir = path.resolve(appName)

  log(chalk.cyan.bold(`Creating ${appName}`))
  log(chalk.blue(`Target Directory: ${targetDir}`))

  await copyTemplate(targetDir)
  updateTemplate(appName, targetDir, ports)

  log(chalk.cyan.bold("Finished"))
}
