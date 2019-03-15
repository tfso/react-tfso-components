# react-tfso-components

# Development

- Run `npm ci` and `npm start` to start developing
- To build, run `npm run build`
- Run linter before release `npm run lint`
- To make a new release, bump the version in package.json (both version and in publish script) and run `npm publish`. This will publish directly to github (as opposed to npm)
- Deploy examples to github pages by running `npm run deploy`

See examples live at: https://tfso.github.io/react-tfso-components/

Notes about build:
- The demo and npm start uses regular create-react-app with typescript.
- The build uses babel with the babel-preset-react-app. It will separately use tsc to generate typescript declarations.
  The build will NOT do type checking! Type checking must be done by running the demo.
- babel-preset-react-app includes other presets such as preset-typescript and preset-env.
  It will ensure that the build is similar to regular react-app, including use of the browserslist in package.json.
- The build is script is set to copy any files it doesn't recognize. E.g. css files are just copied over.
- Babel macros works (e.g. styled-components/macro) because it's included in babel-preset-react-app