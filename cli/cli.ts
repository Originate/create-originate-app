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
  let ports = new Ports();

  program
    .command("create", { isDefault: true })
    .description("Make Something Original")
    .option("-bp,--backend_port <port_number>", "Backend Port")
    .option("-fp,--frontend_port <port_number>", "Frontend Port")
    .option("-dbp,--db_port <port_number>", "Frontend Port")
    .action(
      (opts: {
        frontend_port: number | undefined;
        backend_port: number | undefined;
        db_port: number | undefined;
      }) => {
        ports.frontend = opts.frontend_port;
        ports.backend = opts.backend_port;
        ports.db = opts.db_port;
      }
    );
  program.parse(process.argv);
  if (!program.args.length) program.help();

  await ports.setup();
  const appName = program.args[0];
  const srcDir = path.join(__dirname, "../template");
  const targetDir = path.join(__dirname, appName);

  log(chalk.cyan.bold(`Creating ${appName}`));
  log(chalk.blue(`Target Directory: ${targetDir}`));

  await copyTemplate(srcDir, targetDir);
  updateTemplate(appName, targetDir, ports);

  return chalk.cyan.bold("Finished");
}
