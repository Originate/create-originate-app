// This definition file is necessary to get TypeScript to accept the additional
// `jsx` and `global` props that styled-jsx adds to `style` tags.

import "react"

declare module "react" {
  interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
    jsx?: boolean
    global?: boolean
  }
}
