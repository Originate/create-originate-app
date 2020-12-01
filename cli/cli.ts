import { Command } from "commander";
import * as path from "path";
import chalk from "chalk";
import getPort from "get-port";
import { Ports, log, copyTemplate, updateTemplate } from "./helpers";

const logo = () => {
  console.error(
    chalk.magenta.bold.bgGray(`
   _                              
  / \\ ._ o  _  o ._   _. _|_  _   
  \\_/ |  | (_| | | | (_|  |_ (/_  
           __|                    
                                  
      Create-Originate-App        
`)
  );
};

main()
  .then((result) => {
    log(result);
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

async function main() {
  logo();

  const program = new Command();
  let ports: Ports = {
    frontend: null,
    backend: null,
  };

  program
    .command("create", { isDefault: true })
    .description("Make Something Original")
    .option("-p,--port <port_number>", "backend port")
    .action((opts: { port: number | null }) => {
      if (opts.port) {
        ports["backend"] = opts.port;
      }
    });

  program.parse(process.argv);
  if (!program.args.length) program.help();

  const appName = program.args[0];
  const srcDir = path.join(__dirname, "../template");
  const targetDir = path.join(__dirname, appName);
  if (!ports.backend) {
    ports.backend = await getPort();
  }
  if (!ports.frontend) {
    ports.frontend = await getPort();
  }

  log(chalk.cyan.bold(`Creating ${appName}`));
  log(chalk.blue(`Target Directory: ${targetDir}`));

  copyTemplate(srcDir, targetDir);
  updateTemplate(appName, targetDir, ports);

  return chalk.cyan.bold("Finished");
}
