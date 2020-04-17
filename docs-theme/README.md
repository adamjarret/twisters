# docs-theme

This is a [typedoc theme](https://typedoc.org/guides/themes/) that extends the
[Markdown theme from typedoc-plugin-markdown](https://github.com/tom-grey/typedoc-plugin-markdown/blob/master/THEMES.md).

The purpose of this theme is to output markdown formatted with prettier (so the files are consistent with the rest of the project).

The **partials/header.hbs** file overrides the default partial to prevent the output from beginning with a newline when the breadcrumbs are disabled.
