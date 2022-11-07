<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/1Tolv2/chat-app-typescript">
    <img src="../../packages/client/public/ghost-svgrepo-com.svg" alt="ghost" width="80" height="80" style="background-color: #5865F2; padding:15px; border-radius: 30%;" >
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
### Start
Start up the application by running the below command
```sh
# If you are standing in the api folder
npm start

# If you are standing in the root folder
npm start -w packages/api
```

The API is now reachable from http://localhost:8800

# Documentation

## Endpoints

`http://localhost:8800/`

All endpoints except for some in the /users route needs you to be logged in to access the endpoint. Authentication is handled through jwt sent out in a cookie.
### User(s)
| Method | Endpoint | Description | auth |
| :--- | :--- | :--- | :---: |
| GET | /users | Get all users | x |
| POST | /users | Create a new user |  |
| POST | /users/auth | Log in user |  |
| GET | /users/me | Get logged in user | x | 

#### **Example responses**

<details>
<summary> GET /users </summary>
Status: 200

```javascript
[
    {
        id: "86bf3d2e-f3c1-483f-840a-1018a8e56125",
        username: "tolv",
        email: "test@test.com",
        created_at: 1667741246049,
        updated_at: null,
        servers: [
            {
                id: "b5cbab33-ccd2-4edf-af36-2de11ff05f36",
                name: "tolv's server",
                description: "Hello World",
                role: "admin"
            }, 
            { ... }
        ]
    }
]
```

</details>

<details>
<summary> POST /users </summary>
Does not allow users with the same username or email

Status: 201

```javascript
Created
```

</details>

<details>
<summary> POST /users/auth </summary>
Status: 200

Sets jwt cookie

```javascript
{
    id: "86bf3d2e-f3c1-483f-840a-1018a8e56125",
    username: "tolv"
}
```

</details>

<details>
<summary> GET /users/me </summary>
Status: 200

```javascript
{
    id: "86bf3d2e-f3c1-483f-840a-1018a8e56125",
    username: "tolv",
    email: "test@test.com",
    created_at: 1667741246049,
    updated_at: null,
    servers: [
        {
            id: "b5cbab33-ccd2-4edf-af36-2de11ff05f36",
            name: "tolv's server",
            description: "Hello World",
            role: "admin"
        },
        { ... }
    ]
}
```

</details>

### Servers(s)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | /servers | Get all servers |
| POST | /servers | Create a new server |
| GET | /servers/:id | Get server by id |
| POST | /servers/:id/member | Add member to a server | 

#### **Example responses**

<details>
<summary> GET /servers </summary>
Status: 200

```javascript
[
    {
        id: "b5cbab33-ccd2-4edf-af36-2de11ff05f36",
        name: "tolv's server",
        description: "Hello World",
        created_at: 1667741246063,
        updated_at: null,
        admin_id: "86bf3d2e-f3c1-483f-840a-1018a8e56125"
    },
    { ... },
]
```
</details>


<details>
<summary> POST /servers </summary>
Does not allow servers with the same name

Status: 201

```javascript
{
    server: {
        id: "bd986a51-41dc-470c-ab4a-e073c55ae8a4",
        name: "Tolvs server",
        description: "Hello World!",
        admin_id: "86bf3d2e-f3c1-483f-840a-1018a8e56125",
        channels: [],
        members: [],
        created_at: "2022-11-07T14:04:19.054Z",
        updated_at: null
    },
    message: "New server created"
}
```

</details>

<details>
<summary> GET /servers/:id </summary>
Status: 200

```javascript
{
    id: "bd986a51-41dc-470c-ab4a-e073c55ae8a4",
    name: "Tolvs server",
    description: "Hello World!",
    created_at: 1667829859039,
    updated_at: null,
    channels: [
        {
            id: "2818e610-a2e0-46fc-9d1f-58a22599b34b",
            name: "general",
            description: "General chat",
            created_at: 1667829859052,
            updated_at: null
        }
    ],
    members: [
        {
            id: "86bf3d2e-f3c1-483f-840a-1018a8e56125",
            role: "admin"
        }
    ],
    admin_id: "86bf3d2e-f3c1-483f-840a-1018a8e56125"
}
```
</details>

<details>
<summary> POST /servers/:id/member </summary>
Status: 200

```javascript
{
  message: "Member added to server"
}
```
</details>


### Channel(s)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | /channels | Get all channels |
| POST | /channels | Create a new server |
| GET | /channels/:id | Get channel by id |

#### **Example responses**
<details>
<summary> GET /channels </summary>
Status: 200

```javascript
[
    {
        id: "a6d64253-3335-45db-b219-1c4f1eb2b87c",
        name: "general",
        description: "General chat",
        server_id: "b5cbab33-ccd2-4edf-af36-2de11ff05f36",
        created_at: 1667741246073,
        updated_at: null
    },
    { ... }
]
```
</details>

<details>
<summary> POST /channels </summary>
Status: 201

```javascript
{
    channel: {
        id: "002919fb-be1e-4b1a-8f3b-a5cd58b598a9",
        name: "second-channel",
        description: "Memes go here",
        server_id: "b5cbab33-ccd2-4edf-af36-2de11ff05f36",
        posts: [],
        created_at: "2022-11-07T14:24:09.404Z",
        updated_at: null
    },
    message: "New channel created"
}
```
</details>

<details>
<summary> GET /channels/:id/ </summary>
Status: 200

```javascript
{
    id: "002919fb-be1e-4b1a-8f3b-a5cd58b598a9",
    name: "second-channel",
    description: "",
    server_id: "b5cbab33-ccd2-4edf-af36-2de11ff05f36",
    created_at: 1667831049391,
    updated_at: null,
    posts: [
        {
            id: "fe9d17e3-431f-4489-9679-8c76b80ce9c8",
            text: "Hello World!",
            username: "tolv",
            user_id: "86bf3d2e-f3c1-483f-840a-1018a8e56125",
            created_at: 1667754299557,
            updated_at: null
        },
        { ... }
    ]
}
```
</details>

### Post(s)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | /posts | Get all posts |
| POST | /posts | Create a new post |
| GET | /posts/:id | Get post by id |

#### **Example responses**

<details>
<summary> GET /posts </summary>
Status: 200

```javascript
[
    {
        id: "7b42675a-a43e-4969-b277-02a98da7fb6c",
        text: "Hello World!",
        user: "tolv",
        user_id: "86bf3d2e-f3c1-483f-840a-1018a8e56125",
        channel_name: "general",
        channel_id: "a6d64253-3335-45db-b219-1c4f1eb2b87c",
        created_at: 1667831232743,
        updated_at: null
    },
    { ... }
]
```
</details>

<details>
<summary> POST /posts </summary>
Status: 201

```javascript
{
    post: {
        id: "7b42675a-a43e-4969-b277-02a98da7fb6c",
        text: "Hello World!",
        username: "tolv",
        user_id: "86bf3d2e-f3c1-483f-840a-1018a8e56125",
        channel_id: "a6d64253-3335-45db-b219-1c4f1eb2b87c",
        created_at: 1667831232743,
        updated_at: null
    },
    message: "New post created"
}
```
</details>

<details>
<summary> GET /posts/:id </summary>
Status: 200

```javascript
{
    id: "7b42675a-a43e-4969-b277-02a98da7fb6c",
    text: "Hello World!",
    user: "tolv",
    user_id: "86bf3d2e-f3c1-483f-840a-1018a8e56125",
    channel_name: "general",
    channel_id: "a6d64253-3335-45db-b219-1c4f1eb2b87c",
    created_at: 1667831232743,
    updated_at: null
}
```
</details>


