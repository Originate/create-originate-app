// Write the server's GraphQL schema to a file given by a command line argument.

import { initializeSchema } from "../src/graphqlSchema"
import { printSchema } from "graphql"
import { writeFile } from "fs"

const processArgs = process.argv.slice(2)
const outfile = processArgs[0] ?? "schema.graphql"

async function main() {
  const schema = await initializeSchema()
  writeFile(outfile, printSchema(schema), "utf8", err => {
    if (err) {
      console.error(err)
      process.exit(1)
    } else {
      console.log(`Wrote GraphQL schema to ${outfile}`)
    }
  })
}

main()
