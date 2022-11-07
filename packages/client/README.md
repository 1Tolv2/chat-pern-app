<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/1Tolv2/chat-app-typescript">
    <img src="../../packages/client/public/ghost-svgrepo-com-purple.svg" alt="ghost" width="80" height="80" >
  </a>

<h3 align="center">Chat application API</h3>

  <p align="center">
    Socket.io, Express, Slonik & PostgreSQL
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

This is a RESTful API built with Express and Slonik to query the PostgreSQL database.
It contains jest tests for the controllers.

<!-- GETTING STARTED -->
## Getting Started

To setup a local copy follow the steps below

### Prerequisites

- You'll need to start up a postgreSQL container. To create a new container run the below code in your terminal.
```sh
docker run --name my_postgres_db -e POSTGRES_PASSWORD=my_password -p 5432:5432 -d postgres
```

- Create an `.env` file at `./packages/api/.env`, and put the below variables in it and fill in your information.
```sh
PORT= # The docker compose is set to run the backend on 8800
POSTGRES_DEV_URL=postgres://<PG_USERNAME>:<PG_PASSWORD>@localhost:5432/<PG_DATABASE>
POSTGRES_TEST_URL= # Same as above but use another database
JWT_SECRET= # Enter a random secret
CORS_ORIGINS=http://localhost:3000 # Allowed origins to connect to the API, enter the localhost your client is running on
```

## Scripts
### `npm start`
Starts up the application and it becomes reachable on http://localhost:3000
```sh
# If you are standing in the api folder
npm start

# If you are standing in the root folder
npm start -w packages/api
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
