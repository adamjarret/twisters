# Twisters Documentation

The Twisters website is generated with Jekyll and hosted on GitHub pages.
It uses the default theme (which is [Primer](https://github.com/pages-themes/primer)).

The API documentation is generated with [typedoc](https://typedoc.org).

DO NOT EDIT THE FOLLOWING FILES BY HAND:

- **docs/index.md** (edit **packages/twisters/README.md** instead)
- **docs/api/\*.md** (edit comment in related source file instead)

The `make docs` command will generate these files automatically.

REMEMBER TO EDIT THE FOLLOWING FILES BY HAND:

- the content of **packages/examples-js/bin/usage.js** must be manually kept in sync with **packages/twisters/README.md**
- any new configuration options should be added to the example in **packages/twisters/README.md**

## Development

### Requirements

- [ruby](https://www.ruby-lang.org/en/documentation/installation/)
- [bundler](https://bundler.io/)
- make (standard on mac/linux, [windows version](http://gnuwin32.sourceforge.net/packages/make.htm))

### Setup

    cd docs
    make install

### Generate API Documentation

    make docs

**Pro Tip:** typedoc does not provide a "watch" mode that rebuilds automatically when source files change, but the same effect can be achieved with [watchman](https://facebook.github.io/watchman/) (see [example below](#watchman)).

### Build

    make build

or

    make start

to build and serve locally.

### Terminalizer

To generate the animated gif files in the **assets** folder, see the **terminalizer** directory in the project root.

### Watchman

_Optional:_ To set up [watchman](https://facebook.github.io/watchman/)
to automatically regenerate the API documentation when source files change,
run the following commands.

1.  Navigate to the project root directory

        cd /path/to/twisters

2.  _Optional:_ For a potential performance boost, before creating the watch, create a **.watchmanconfig** file in **packages/twisters** and specify folders to be ignored

        echo '{ "ignore_dirs": ["node_modules", "lib"] }' > packages/twisters/.watchmanconfig

    Notes:

    - You will need to remove and re-create the watch after adding or changing the config file.
    - **.watchmanconfig** files are not tracked (ignored) by git.

3.  Create watch for twisters package

        watchman watch packages/twisters

4.  Create trigger for `docs-readme` (provide **absolute path to project root** as `--cwd` argument — NOT THE PACKAGE ROOT)

        watchman -- trigger packages/twisters docs-readme 'README.md' -- yarn --cwd /path/to/twisters docs-readme

5.  Create trigger for `docs-build` (provide **absolute path to project root** as `--cwd` argument — NOT THE PACKAGE ROOT)

        watchman -- trigger packages/twisters docs-build '**/src/**/*.ts' -- yarn --cwd /path/to/twisters docs-build

To remove the watch and any associated triggers:

    watchman watch-del packages/twisters

To remove the triggers without removing the watch:

    watchman trigger-del packages/twisters docs-build
    watchman trigger-del packages/twisters docs-readme
