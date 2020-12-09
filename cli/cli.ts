import { Command } from "commander";
import * as path from "path";
import chalk from "chalk";
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

  program
    .command("create", { isDefault: true })
    .description("Make Something Original")
    .option("-bp,--backend_port <port_number>", "Backend Port")
    .option("-fp,--frontend_port <port_number>", "Frontend Port")
    .option("-dbp,--db_port <port_number>", "Frontend Port");
  program.parse(process.argv);
  if (!program.args.length) program.help();

  const ports = await Ports.setup(program.opts());
  const appName = program.args[0];
  const targetDir = path.resolve(appName);

  log(chalk.cyan.bold(`Creating ${appName}`));
  log(chalk.blue(`Target Directory: ${targetDir}`));

  await copyTemplate(targetDir);
  updateTemplate(appName, targetDir, ports);

  return chalk.cyan.bold("Finished");
}
