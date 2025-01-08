---
title: Installing
group: Installing
---

# Installing

This library is not in NPM. As a result, you need to add it to your project and build it locally. 

## Adding library source to project

To do so, you have three options:

- Add the repository to the consuming repository as a Git submodule.
- Clone the repository locally.
- Copy the files locally, without maintaining a Git repository.

Regardless of which option you choose, the following steps all apply.

## Building the library

Enter the lib directory for the library and run the following commands:

    npm install
    npm run build

## Installing the Library to Project

In your project directory, run the following:

    npm i /path/to/package/d4h-typescript/lib

Using a relative path will also work without issue.