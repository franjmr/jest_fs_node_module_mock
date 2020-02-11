# jest_fs_node_module_mock
Mocking fs node-module with Jest

## Mocking File System Node module
This project contains some examples of unit testing with [Jest](https://jestjs.io/) framework and Typescript that ensure the correct functionality of a class that uses the [fs node module](https://www.npmjs.com/package/file-system).

Mock specific module functions:
- readFile
- readFileSync
- writeFileSync

The purpose of these examples is to show:
- How we can falsify the writing and reading files.
- Avoid contamination of the test context.
- Avoid having physical files for tests.
- Be able to alter the content of the files programmatically.
- Spy on functionality.
- Mock functions.

### Install
npm install

### Execute Test
npm run tests
