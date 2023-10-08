## Table of Contents

- [Database Diagram](#database-diagram)
- [Quick Start](#quick-start)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Fixing Error](#fixing-error)

## Database Diagram

![alt text](.assets/cars-diagram.png)

## Quick Start

## Installation

```sh
git clone "https://github.com/homurin/binar-challenge-04.git"
npm install
npm run dev
```

## Configuration

You got error when run

```sh
npm run dev
// or
npm run start
```

You need to configure environment on `.env` file.
Copy `.env.example` file and name it `.env` or run this simple command on your terminal.

```sh
cp .env.example .env
```

Finally fill necessary environment variables to configure server and database. Then you can run the application

```sh
# server configuration

PORT="your_port"

# mongodb configuration

DATABASE_URI="mongodb://hostname:mongodb_port/database_name"

# image kit configuration

IMAGEKIT_PUBLIC_KEY="your_publicKey_here"
IMAGEKIT_PRIVATE_KEY="your_privateKey_here"
IMAGEKIT_URL_ENDPOINT="your_urlEndPoint_here"
```

You can check your database uri from MongoDB Atlas or open terminal and enter to mongosh and type `db.getMongo()`.

## API Documentation

You can test this API using Postman, Thunder Client, Insomnia or other API development platform. Default value for hostname is `127.0.0.1` or `localhost`.

For get all cars data

```sh
// HTTP METHOD GET
http://hostname:port/api/v1/cars
```

For get one car data

```sh
// HTTP METHOD GET
http://hostname:port/api/v1/cars/:id
```

For post one car data

```sh
// HTTP METHOD POST
http://hostname:port/api/v1/cars
```

For update one car data

```sh
// HTTP METHOD PATCH
http://hostname:port/api/v1/cars/:id
```

For delete one car data

```sh
// HTTP METHOD DELETE
http://hostname:port/api/v1/cars/:id
```

## Fixing Error

If you using linux and got database failed to connect then you can check mongo daemon status.

```sh
systemctl status mongod
```

If the mongo daemon is inactive then start the service

```sh
sudo systemctl start mongod
```
