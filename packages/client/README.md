<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/1Tolv2/chat-app-typescript">
    <img src="../../packages/client/public/ghost-svgrepo-com-purple.svg" alt="ghost" width="80" height="80" >
  </a>

<h3 align="center">Chat application API</h3>

  <p align="center">
    React.js, Socket.io, Styled Components
    <br />
    <a href="https://github.com/1Tolv2/chat-app-typescript"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/1Tolv2/chat-app-typescript/issues">Propose Feature</a>
	  ·
    <a href="https://github.com/1Tolv2/chat-app-typescript/issues">Report Bug</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

This is the frontend of a chat application built in React.js and styled with styled components. 
It contains jest tests for bigger components.

<!-- GETTING STARTED -->
## Getting Started

To setup a local copy follow the steps below

## Scripts
### `npm start`
Starts up the application and it becomes reachable on http://localhost:3000
```sh
# If you are standing in the client folder
npm start

# If you are standing in the root folder
npm start -w packages/client
```

### `npm eslint`
Runs eslint checks on all files in the src folder.
```sh
# If you are standing in the client folder
npm start

# If you are standing in the root folder
npm start -w packages/client
```

### `npm eslint-fix`
Runs eslint --fix which attempts to fix all rule violations it detects in the src folder, it then prints out the violations it couldn't fix.
```sh
# If you are standing in the client folder
npm start

# If you are standing in the root folder
npm start -w packages/client
```

### `npm test`
Launches the test runner in the interactive watch mode and runs the component tests available.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

# Documentation
The axios default url is http://localhost:8800 to change this you can add a .env file with the below field
```
REACT_APP_API_URL=your url here
```
