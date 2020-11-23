import { NormalizedCacheObject } from "@apollo/client";
import React from "react";
/**
 * The App component implicitly wraps every page component. This code runs
 * client-side and server-side.
 *
 * See https://nextjs.org/docs/advanced-features/custom-app
 */
export default function App<Props extends {
    initialApolloState?: NormalizedCacheObject;
}>({ Component, pageProps, }: {
    Component: React.ComponentType<Props>;
    pageProps: Props;
}): any;
//# sourceMappingURL=_app.d.ts.map