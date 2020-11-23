import { Command } from "commander";
import * as path from "path";
// @ts-ignore
import chalk from "chalk";
import { findEmptyPort, log, copyTemplate, updateTemplate } from "./helpers";

const logo = () => {
  console.log(
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
  })
  .catch((err) => {
    console.error(err);
  });

async function main() {
  logo();

  const program = new Command();
  program
    .command("create", { isDefault: true })
    .description("Make Something Original")
    .option("-p,--port <port_number>", "backend port")
    .action(() => {});

  program.parse(process.argv);
  if (!program.args.length) program.help();

  const appName = program.args[0];
  const srcDir = path.join(__dirname, "../template");
  const targetDir = path.join(__dirname, appName);
  const port = await findEmptyPort();

  log(chalk.cyan.bold(`Creating ${appName}`));
  log(chalk.blue(`Target Directory: ${targetDir}`));

  copyTemplate(srcDir, targetDir);
  updateTemplate(appName, targetDir, port);

  return chalk.cyan.bold("Finished");
}
