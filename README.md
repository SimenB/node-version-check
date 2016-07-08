# node-version-check
> Check if the runtime Node version satisfies some version

[![NPM Version][npm-image]][npm-url]
[![Dependency Status][david-image]][david-url]

## Usage

This module is meant to help out with running things only if the runtime version of node is greater than or equal a
given version, such as 4.
 
Example usage is for example to not run `eslint>=3` on version of node less than 4.

```json
"scripts": {
  "lint": "node-version-gte-4 && eslint . || echo Node version too old to run linting"
}
```

A bin with `lt` is also included to avoid having to handle the OR case.

```json
"scripts": {
  "lint": "node-version-gte-4 && eslint . || node-version-lt-4"
}
```

### Custom versions

The module also exposes a binary called `node-version-check`, which takes a string to check against as an
argument.

```json
"scripts": {
  "lint": "node-version-check '>=4' && eslint . || node-version-check '<4'"
}
```

It uses [`node-semver`'s](https://github.com/npm/node-semver) `satisfies` under the hood, this allows you to check
against any arbitrary version, such as exact (`node-version-check '4.0.0'`) or minor (`node-version-check '^4.0.0'`)
etc..

[npm-url]: https://npmjs.org/package/node-version-check
[npm-image]: https://img.shields.io/npm/v/node-version-check.svg
[david-url]: https://david-dm.org/SimenB/node-version-check
[david-image]: https://img.shields.io/david/SimenB/node-version-check.svg
