# jest_fs_node_module_mock
Mocking fs node-module with Jest

## Mocking File System Node module
This project contains some examples of unit tests in Typescript that ensure the correct functionality of a class that uses the fs node module.

For this prototype I used jest to falsify the following module functions.
- readFile
- readFileSync
- writeFileSync

What I want to show with these examples is how we can falsify the writing and reading of files so as not to contaminate the test environment and make it completely transparent for the functionality we want to test.

### Install
npm install

### Execute Test
npm run tests
