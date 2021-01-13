#!/usr/bin/env node
import chalk from "chalk"
import { run } from "./app"

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
  await run(process.argv)
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch(err => {
    console.error(`error: ${err.message}`)
    process.exit(1)
  })
