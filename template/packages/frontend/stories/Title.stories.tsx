import * as React from "react"
import { storiesOf } from "@storybook/react"
import { Title } from "../pages/IndexStyles"
import { theme } from "../pages/Theme"
import { GlobalStyle } from "../pages/GlobalStyles"
import { ThemeProvider } from "styled-components"

storiesOf("Title", module).add("with text", () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Title>
        Welcome to{" "}
        <a href="https://github.com/Originate/create-react-app">
          Create Originate App!
        </a>
      </Title>
    </ThemeProvider>
  )
})
