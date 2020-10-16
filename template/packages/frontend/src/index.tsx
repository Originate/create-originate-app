import * as React from "react"
import ReactDOM from "react-dom"
import { Error } from "./components/error"
import { parseEnv } from "./env"
import { Switchboard } from "./Switchboard"

const main = () => {
  const root = document.getElementById("root")
  const env = parseEnv()
  if (typeof env == "string") {
    ReactDOM.render(
      <Error
        header="unable to parse webpack env"
        message={env}
        footer="unsolicited advice: check your packages/frontend/.env file"
      />,
      root,
    )
  } else {
    ReactDOM.render(<Switchboard env={env} />, root)
  }
}

main()
