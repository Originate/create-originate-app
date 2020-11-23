import Document, { DocumentContext } from "next/document";
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
    static getInitialProps(ctx: DocumentContext): Promise<any>;
    render(): any;
}
//# sourceMappingURL=_document.d.ts.map