module.exports = {
  // We list "tsx" and not "ts" so that Next.js will not consider `.ts` files
  // under the `pages/` directory to be page modules. This is a workaround to
  // get Next.js to ignore files in `__generated__` directories. This means that
  // if you want to write api functions in `pages/api/` you must use the `.tsx`
  // extension even if the module does not use jsx.
  pageExtensions: ["tsx"],
  reactStrictMode: true,
}
