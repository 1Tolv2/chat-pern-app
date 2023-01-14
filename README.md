<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/1Tolv2/chat-pern-app">
    <img src="packages/client/public/ghost-svgrepo-com-purple.svg" alt="ghost" width="80" height="80" >
  </a>

<h3 align="center">Chat application - Simple Discord copy</h3>

  <p align="center">
    Full stack application - Written in TypeScript and built with React, Express and PostgreSQL
    <br />
    <a href="https://github.com/1Tolv2/chat-pern-app"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/1Tolv2/chat-pern-app/issues">Propose Feature</a>
	  ·
    <a href="https://github.com/1Tolv2/chat-pern-app/issues">Report Bug</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

This is a simplified discord application with channels and servers, running sockets for updating of the chat feeds.
A channel is created for every user that registers and the user can add channels to that channel and invite other users.
<div align="center">
<img src="./public/demo.png" alt="Application screenshot" style="width: 100%;max-width: 1000px;"/>
</div>

The application can be run using docker compose or locally.

## Built with
* [<img alt="React.js" src="https://img.shields.io/static/v1?style=flat&logo=react&label=&message=React&color=black"/>](https://reactjs.org/)
* [<img alt="Express.js" src="https://img.shields.io/static/v1?style=flat&logo=express&label=&message=express.js&color=blue"/>](https://expressjs.com/)
* [<img alt="postgresql" src="https://img.shields.io/static/v1?style=flat&logo=postgresql&label=&message=PostgreSQL&color=grey"/>](https://www.postgresql.org/)

<!-- GETTING STARTED -->
## Getting Started

To setup a local copy follow the steps below

### Prerequisites

* NPM - https://nodejs.org/en/download/
* Docker - https://docs.docker.com/get-docker/

### Installation
 
1. First start cloning the repo by entering the below command in your terminal.
```sh
git clone https://github.com/1Tolv2/chat-pern-app-typescript.git
```
1. After cloning the repository, cd in to the new folder and install.
```sh
npm install
```

## Run the app
### Localhost
Start up the application by running the below command from the api folder aswell as from the client folder.
```sh
npm start
```

### Docker
Start up the application in docker containers by running the below command from the root folder.
```sh
docker compose up --build
```
After starting your app in the preferede way you can open <a href="http://http://localhost:3000/">http://http://localhost:3000/</a> in the browser.
The page reloads as you make changes and save your code.

## Workflow
The repo contains a GitHub workflow that upon making pushes and pull requests to the main branch in GitHub it will run a job with the workspaces respective tests and a job to check that the code is correctly formatted and are following the rules set with ESlint and prettier.

It also has a husky pre-commit script that runs the ESlint check in both workspaces.

To read more about the workspaces in the project go to their specific README file
* [API](https://github.com/1Tolv2/chat-app-typescript/blob/main/packages/api/README.md)
* [Client](https://github.com/1Tolv2/chat-app-typescript/blob/main/packages/client/README.md)
