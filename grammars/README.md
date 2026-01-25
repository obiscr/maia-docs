# Maia Docs Grammars

This directory contains additional grammars used by the Maia documentation site.

## Grammars

The following additional grammars are generated and available for use:

- [Markdoc](https://github.com/markdoc/language-server)

## Usage

To generate the grammars from their source files, run:

```sh
pnpm grammars
```

To include the grammars in the documentation site, update the `expressiveCode.shiki.langs` array in the `astro.config.mjs` file:

```diff
starlight({
  expressiveCode: {
    shiki: {
      langs: [
        JSON.parse(
          fs.readFileSync('./grammars/existing.tmLanguage.json', 'utf-8'),
+         fs.readFileSync('./grammars/new.tmLanguage.json', 'utf-8'),
        ),
      ],
    },
  },
});
```
