# Programmer Quiz

Unserious personality quiz about what kind of programmer stereotype you are.
Final project of the Software Development Tools class at Emmanuel College, Fall 2024.

## Developer Instructions

### Setup

```bash
npm install
```

## Running the Server

```bash
node index.js
```

or

```bash
npm run start
```

### Linting and Formatting

There are two code quality tools set up. You can run them by hand on the command line. **They will also run automatically as a GitHub Action when you make a pull request to `main`.**

You can run them both with 
```bash
npm test
```

`eslint` checks for errors. `prettier` formats code. `npx` runs the tool using the versions installed for this specific project (out of the `node_modules` folder).

```bash
npx eslint
```

```bash
npx prettier . --write
```

The `--write` flag for `prettier` tells it to fix your files in-place. You can swap it out with a `-c` flag to see _which_ files need formatting.

Both have many other flags and options. Run `npx eslint --help` or `npx prettier --help` to see more.

## Credits

[Emmanuel College](https://www.emmanuel.edu/) _Software Development Tools_ course Fall 2024

Instructor: Mark Sherman (@marksherman)

Students (in alphabetical order):

- Elijah Baron (@Ebaron96)
- Jocelyn Francisco (@FranciscoJ26)
- Isabella Franzese (@isazfranz)
- AJ Godios (@godios14)
- Molly Hans (@hansm1)
