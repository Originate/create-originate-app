#!/usr/bin/env node
import chalk from "chalk"
import { run } from "./app"
import { git_branch_name } from "./cmd"

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

async function main() {
  logo()
  const branch_name = git_branch_name()
  await run(process.argv, branch_name)
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch(err => {
    console.error(`error: ${err.message}`)
    process.exit(1)
  })
