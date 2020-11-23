import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document"
import { ServerStyleSheet } from "styled-components"

/**
 * This custom Document class customizes server-side rendering and generation.
 * (Nothing here runs client side.) Customizations that should apply to every
 * page can be made here, like setting a `lang="en"` attribute on the `<Html>`
 * tag. But most <head> tag stuff, like setting a page title, should be handled
 * in page components (not here) using the `Head` tag imported from "next/head"
 * so that values can change during client-side page transitions.
 *
 * See https://nextjs.org/docs/advanced-features/custom-document
 */
export default class OriginateDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          // Analyze CSS from styled components in the page to be rendered to
          // generate server-rendered stylesheet.
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
