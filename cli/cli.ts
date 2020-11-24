import { Command } from "commander";
import * as path from "path";
import chalk from "chalk";
import getPort from "get-port";
import { log, copyTemplate, updateTemplate } from "./helpers";

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
  let port: number | null = null;

  program
    .command("create", { isDefault: true })
    .description("Make Something Original")
    .option("-p,--port <port_number>", "backend port")
    .action((opts) => {
      if (opts.port) {
        port = opts.port;
      }
    });

  program.parse(process.argv);
  if (!program.args.length) program.help();

  const appName = program.args[0];
  const srcDir = path.join(__dirname, "../template");
  const targetDir = path.join(__dirname, appName);
  if (!port) {
    port = await getPort();
  }

  log(chalk.cyan.bold(`Creating ${appName}`));
  log(chalk.blue(`Target Directory: ${targetDir}`));

  copyTemplate(srcDir, targetDir);
  updateTemplate(appName, targetDir, port);

  return chalk.cyan.bold("Finished");
}
