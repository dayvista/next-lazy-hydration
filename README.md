# Lazy Hydration with Next.js

Lazy load JavaScript code chunks on demand.

## What is this?

This is an example of selective hydration for individual components inspired by a [blog post](https://scriptedalchemy.medium.com/next-js-and-lazy-hydration-keep-the-html-but-drop-the-javascript-846feb2da1f) by Zack Jackson.

[Here's another approach](https://next-no-js-git-main-shaneosbourne8.vercel.app/) (with [a repo](https://github.com/shakyShane/next-no-js)) from Shane Osbourne that opts out of JS completely until the page contains a component that opts into hydration.

I believe these 2 approaches (selective hydration + completely static pages by default) could be used together to create an approach to static site generation similar to [Astro](https://astro.build). This would expand upon the range of Next.js even further to allow the development of fully static sites with embedded JS functionality.

## Known Issues/Limitations

- Does not work on route changes because the HTML is not rendered on the server when using `next/dynamic`. Causes layout shift and instant hydration. See [this page](https://next-lazy-hydration.vercel.app/route-change) .
- Seems to partially disable HMR.
- Wraps every lazy-hydrated component in a \`div\` with \`display: contents\`.

### Credits

- Nearly all credit is due to Zack Jackson (aka `ScriptedAlchemy` on GitHub) and his [blog post](https://scriptedalchemy.medium.com/next-js-and-lazy-hydration-keep-the-html-but-drop-the-javascript-846feb2da1f) detailing this strategy and subsequent help on [this issue](https://github.com/hadeeb/react-lazy-hydration/issues/37).
- Hadeeb Farhan (aka `hadeeb`) for creating the [react-lazy-hydration](https://github.com/hadeeb/react-lazy-hydration) library and his help on the aforementioned GitHub issue.
- Shane Osbourne for his work on [this repo](https://github.com/shakyShane/next-no-js).
