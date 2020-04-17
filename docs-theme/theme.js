const { PageEvent } = require('typedoc/dist/lib/output/events');
const MarkdownTheme = require('typedoc-plugin-markdown/dist/theme').default;
const prettier = require('prettier');
const prettierConfig = { ...require('../.prettierrc'), parser: 'markdown' };

function formatWithPrettier(page) {
  page.contents = prettier.format(page.contents, prettierConfig);
}

class CustomMarkdownTheme extends MarkdownTheme {
  constructor(renderer, basePath) {
    super(renderer, basePath);

    // The priority value should be <=1024 so that this handler is invoked
    //  AFTER the default handler for this event.
    this.listenTo(renderer, PageEvent.END, formatWithPrettier, 1024);
  }
}

exports.default = CustomMarkdownTheme;
