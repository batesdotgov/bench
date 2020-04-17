# Bench

Bench item tracker (Vue, Node, Docker, MySql).

## Requirements

- Node.js, NPM/Yarn
- Docker Desktop
- VSCode (optional)

## Install Dependencies

Run `npm install` in both the root and `client/` folders.

## Create ENV File
In the root of the project, create a `.env` file with the following contents.

```
NODE_ENV=development
JWT_SECRET=localsecret
DB_USER=root
DB_PASS=password
DB_NAME=my_database
```

## Create Database Instance

Create a local MySql instance with Docker.

```
npm run db:up
```

This command will use the `docker-compose.local.yml` file in `data` folder to create a running database on `localhost:3306` and storing local data in `data/mysql-data`.

## Init Database (Local)

Create the database to use.

```
npm run db:init
```

This command will run the `data/init.js` file to create a new database with the name `my_database`.

## Migrate to Current Schema

Update the `my_database` schema according to the files in the `migrations/` folder.

```
npm run db:migrate
```

This command will create all database tables, columns, and constraints.

## Start Application (Dev)

In two separate terminals, run both commands below.

```
npm run server:dev
```

and,

```
npm run client:dev
```

You can now open the client on `localhost:8080` and the server on `localhost:5000`.

## Build and Run

Locally run the full stack with Express serving a Vue production build.

```
npm run start-local
```
