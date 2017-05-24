# schemas-library

## Overview

Serving our data's schemas.

## Getting Started

Clone the repo:

```
git clone git@github.com:Malgorne/schemas-library.git
cd schemas-library
```

Install yarn:

```
npm install -g yarn
```

To learn to use yarn, see [this page](https://yarnpkg.com/lang/en/docs/usage/).

## Build ES5

° Translate the projet to ES5 syntaxe;

° Generate the doc.

```
yarn
```

## OS

Unfortunately, this module is developed with windows... If you use a Mac or linux, you have to edit the package.json like this:

```
"scripts": {
  "build": "gulp",
  "lint": "gulp lint",
  "test": "NODE_ENV=test gulp test",
  "prepush": "gulp lint; NODE_ENV=test gulp test",
  "prepublish": "gulp build; gulp lint; NODE_ENV=test gulp test"
}
```

## Tests

° Test ES6 code quality:

```
yarn lint
```

° Set environment to "test";

° Run tests written in ES6 along with istanbul code coverage:

```
yarn test
```

## Prepush

Husky handles the prepush git hook. It launches yarn lint & yarn test. And block the push if you have linter's errors or if a test fail.

## Prepublish

Husky handles the prepublish git hook. It:

° Creates the ES5 files for you before the publish;
° Generates the doc;
° Checks ES6 syntaxe;
° Launches the tests;
° Stops publishing if you have linter's errors or if a test fail.
