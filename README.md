# d4h-typescript
Typescript library for accessing D4H

## Documentation

Typedoc Generated Documentation available at:

<https://kc4x4sar.github.io/d4h-typescript>

## How to Consume
This library is not in NPM. As a result, you need to add it to your project locally. To do so, you have three options:
1. Add the repository to the consuming repository as a Git submodule.
2. Clone the repository locally.
3. Copy the files locally, without maintaining a Git repository.

Regardless of which option you choose, you can add the package by running:

`npm i /path/to/package/d4h-typescript/lib`

Using a relative path will also work without issue.

## Structure
The source code is broken into two main folders:
1. lib
2. test

The lib folder contains the actual package intended for consumption.

The test folder contains a simple test program that consumes the main package. This is not intended for unit tests, nor does it use any test framework. It is valuable as a validating and debugging tool as changes are made.

### lib

The only available command is to build:

`npm run build`

The output folder is the `built` directory.

### test

The available commands are:
* build: `npm run build`
* launch: `npm run launch`

Build simply builds the test project, while launch both builds and runs it. If you've made changes to lib, be sure to build there first.

Before launching, you should setup environment variables. `sample.env` shows you what variables are necessary. Copy the contents to a new file, `.env`, in the same folder and populate it appropriately.