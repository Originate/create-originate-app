import * as React from "react"
import { storiesOf } from "@storybook/react"
import Title from "../components/Title"

storiesOf("Title", module).add("with text", () => {
  return <Title>Recipes</Title>
})
