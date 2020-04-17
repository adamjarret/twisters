# Twisters

Display multiple simultaneous animated spinners in node terminal applications

## Packages

- ### [Twisters](https://github.com/adamjarret/twisters/tree/master/packages/twisters)

- ### [JavaScript Examples](https://github.com/adamjarret/twisters/tree/master/packages/examples-js)

- ### [TypeScript Examples](https://github.com/adamjarret/twisters/tree/master/packages/examples-ts)

## Development

### Requirements

- [git](https://www.git-scm.com)
- [node](https://nodejs.org/) 10+
- [yarn](https://yarnpkg.com) (this project uses yarn workspaces)

### Setup

    git clone https://github.com/adamjarret/twisters.git
    cd twisters
    yarn

If you use [VS Code](https://code.visualstudio.com), see the **.vscode** directory for sample config files that define recommended settings to use with this project.

### Build

    yarn build

or

    yarn build -w

to build and automatically rebuild when changes are saved.

### Run Examples

      node packages/examples-js/bin/demo.js

After building, JavaScript files in the following directories may be executed as node scripts:

- **packages/examples-js/bin**
- **packages/examples-ts/bin** (excluding **utils**)

## Yarn Scripts

### `yarn build`

Runs `tsc` to compile TypeScript files.

The **twisters** package outputs a commonjs module (with types) to the **lib/** directory.

The **examples-ts** package outputs node scripts (with types) to the **bin/** directory.

Use `-w` flag to watch for changes and rebuild when they occur.

See **tsconfig.json** for configuration.

### `yarn clean`

Deletes all package **lib** directories and TypeScript build cache.

### `yarn docs`

Runs `typedoc` to generate documentation in the **docs/api** directory.

See **typedoc.json** for configuration.

### `yarn lint`

Runs `eslint` on all JavaScript and TypeScript files not ignored in the **.eslintignore** file.

See **.eslintrc.js** for configuration.

### `yarn pretty`

Runs `prettier` (see [prettier](https://prettier.io)) to check source code file format. All compatible files not ignored in the **.eslintignore** file are processed.

See **.prettierrc.js** for configuration.

### `yarn spell`

Runs `cspell` (see [cspell](https://www.npmjs.com/package/cspell)) to spell-check source code files.

See **.vscode/cSpell.json** for configuration.

Note: This configuration path is used so the settings can also be honored by the [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) plugin for VS Code.

### `yarn ncu`

Runs `ncu` on each workspace package to check for dependency updates.

Use `-u` flag to update version numbers in all **package.json** files.

Any additional arguments will be passed to the `ncu` command for each package. See [npm-check-updates](https://github.com/tjunnone/npm-check-updates) for available options.

Note: `yarn ncu` does not check for updates to dependencies of the workspace itself. To check for these as well, use `npx` to run `ncu`:

    # Check dependencies in all package.json files
    npx ncu && yarn ncu

    # Update versions in all package.json files
    npx ncu -u && yarn ncu -u

### `yarn pak`

Runs `npm pack` on **twisters** package to bundle the built module as a .tgz archive.
