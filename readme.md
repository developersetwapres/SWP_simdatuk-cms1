# Simdatuk - CMS

This project based on Next JS, Redux, Redux Saga and Material UI.

# Features

- Thorough documentation: Written with the same care as Next Js docs.
- Guaranteed consistency: Opinionated linting for React and JavaScript/JSON integrated into Visual Studio Code and run against staged files on pre-commit.

## Table Of Contents

[[_TOC_]]

## Getting started

Make sure you have the following installed:

- Node (at least the lates LTS)
- ESLint (at least the lates)

```bash
# 1. Clone the repository.
git clone https://git.ekuator.id/project/setneg/simdatuk/cms

# 2. Enter your cloned directory.
cd cms

# 3. Install dependencies. Make sure npm installed: https://www.npmjs.com/get-npm
npm install

# 4. Run on your local.
# This command is a default to run development mode,
# and wil be listen http://localhost:3000
npm run dev
```

## Environment

For the first time you must create environment in root directory. This List Environment must be create in this project:

- `.env` or `.env.local`

All of examples `env` located in `/environment`.

## Available Scripts

In the project directory, you can run:

```bash
# 1. Run in development mode
npm run dev

# 2. Run in production server
npm run start

# 3. Build (note: make sure the environment is correct for build)
npm run build

# 34 Delete node_modules and re-install dependencies from package.json
npm run install:clean

# 5. Check Lint all files
npm run lint
```

## Architecture

```
    ├── components/ # Where most of the components in our app will live, including our global base components.
        ├── core/ # All of core component used in this project.
        ├── shared/ # All of shared component used in this project.
    ├── containers/ # Where most of the containers in our app will live.
    ├── hooks/ # Includes custom hooks used in this project.
    ├── pages/
    ├── public/
    ├── store/ # The redux store directory.
        ├── actions/ # All of redux action.
        ├── reducers/ # All of reducer to manage app's state.
        ├── sagas/ # All of sagas middleware.
        ├── constant.js # All of action type redux.
        └── index.js # Initialize Redux Store
    ├── styles/
    ├── utils/
        ├── index.js
        ├── interceptors.js # Axios Interceptors.
        └── logger.js # Logger All action axios.
├── environment/ # All of example environment used in this project.
    ├── development
    ├── production
    └── stage
├── .editorconfig # This file will help you development and make your code clean.
├── .eslintrc.json # All of Eslint setup and rules.
├── .gitignore
├── jsconfig.json
└── next.config.js

```

### pages

In Next.js, a page is a React Component exported from a `.js`, `.jsx`, `.ts`, or `.tsx` file in the `pages` directory. Each page is associated with a route based on its file name.

### public

Next.js can serve static files, like images, under a folder called `public` in the client directory. Files inside `public` can then be referenced by your code starting from the base URL (`/`).

See the section about [Static File Serving](https://nextjs.org/docs/basic-features/static-file-serving) for more information.

## State Management

This project used `redux` for state management and `redux-saga` for middleware.

Basic Example of Redux:

```javascript
import { createStore } from 'redux';

/**
 * This is a reducer - a function that takes a current state value and an
 * action object describing "what happened", and returns a new state value.
 * A reducer's function signature is: (state, action) => newState
 *
 * The Redux state should contain only plain JS objects, arrays, and primitives.
 * The root state value is usually an object.  It's important that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * You can use any conditional logic you want in a reducer. In this example,
 * we use a switch statement, but it's not required.
 */
function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case 'counter/incremented':
      return { value: state.value + 1 };
    case 'counter/decremented':
      return { value: state.value - 1 };
    default:
      return state;
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(counterReducer);

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// There may be additional use cases where it's helpful to subscribe as well.

store.subscribe(() => console.log(store.getState()));

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch({ type: 'counter/incremented' });
// {value: 1}
store.dispatch({ type: 'counter/incremented' });
// {value: 2}
store.dispatch({ type: 'counter/decremented' });
// {value: 1}
```

See the section about [Redux](https://redux.js.org/introduction/getting-started) for more information.

### About Redux-Saga

`redux-saga` is a library that aims to make application side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) easier to manage, more efficient to execute, easy to test, and better at handling failures.

See the section about [Usage Example](https://redux-saga.js.org/docs/introduction/GettingStarted#usage-example) for more information.

See the section about [Beginner Tutorial](https://redux-saga.js.org/docs/introduction/BeginnerTutorial) for more information.

## Linting & Formating

- [Languages](#languages)
- [Scripts](#scripts)
  - [Terminal](#terminal)
  - [Editor](#editor)
- [Configuration Eslint](#configuration-eslint)

This project uses ESLint to catch errors and avoid bikeshedding by enforcing a common code style.

### Languages

- **Javascript** is linted by ESLint.

### Scripts

There are a few different contexts in which the linters run.

### Terminal

```bash
# Lint all files
npm run lint

# Lint all files, fixing many violations automatically
npm run lint:fix
```

### Editor

In supported editors, all files will be linted and formatted on-save. See [Editor Integration](#editor-integration) for details.

### Configuration ESLint

This projects with opinionated defaults, but you can edit each tools configuration in the following config files:

- [ESLint](https://eslint.org/docs/user-guide/configuring/)
- `.eslintrc.json`
- `.eslintignore`

## Editor integration

- [Visual Studio Code](#visual-studio-code)
- [Configuration](#configuration-vscode)

### Visual Studio Code

This project is best developed in VS Code. With the [recommended extensions](https://code.visualstudio.com/docs/editor/extension-gallery#_workspace-recommended-extensions) and setting in your VS Code, you get:

- Syntax highlighting for all files
- Intellisense for all files
- Lint-on-save for all files
- In-editor results on save for unit tests

Recommended for this project:

- EditorConfig
- ESLint
- HTML Snippets
- Javascript (ES6) code snippets
- ES7 React/Redux/GraphQL/React-Native snippets

### Configuration VSCode

To Configure extendsions in your VS Code enter command:

For Windows and Linux.

```
CRTL + X
```

For Mac.

```
COMMAND + X
```

To Configure Lint-on-save.
In your local VS Code Create User Setting or edit in Json file and will be automatically generated setting.json. And enter this code.

```json
{
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "typescript": "typescriptreact"
  },
  "typescript.updateImportsOnFileMove.enabled": "always",
  "javascript.updateImportsOnFileMove.enabled": "always",
  "extensions.ignoreRecommendations": false,
  "eslint.validate": ["typscript", "javascript"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### Customize configuration

See [Next.js Documentation](https://nextjs.org/docs).
