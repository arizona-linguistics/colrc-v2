[![Build Status](https://travis-ci.org/arizona-linguistics/colrc-v2.svg?branch=master)](https://travis-ci.org/arizona-linguistics/colrc-v2)

# colrc-v2
COLRC version 2.0


## Getting started

Our recommended development environment can be easily launched using [`docker-compose`](https://docs.docker.com/compose/install/).

### Requirements

- [`docker`](https://docs.docker.com/install/)
- [`docker-compose`](https://docs.docker.com/compose/install/)

### Build

```
docker-compose build
```

### Run

```
docker-compose up
```
#### [Frontend](./frontend)

The frontend is built using [`react`](https://reactjs.org/).  If you've launched the development environment using `docker-compose`, the app will launch on http://localhost:3000.  Changes you make to the frontend source will update in realtime.


#### [Backend](./backend)

The backend is a [`Node`](https://nodejs.org/en/) app that currently relies on [`Express`](https://expressjs.com/), [`sequelize`](https://github.com/sequelize/sequelize), [`Prisma`](https://www.prisma.io/), and [`MySQL`](https://www.mysql.com/).  If you've launched the development environment using `docker-compose`, any changes you make to the [backend source](./backend) are monitored with [`nodemon`](https://www.npmjs.com/package/nodemon), and will trigger a rebuild whenever detected.

You can access the following services:

- [`Prisma` GraphQL Playground](https://github.com/prisma/graphql-playground#how-is-this-different-from-graphiql): http://localhost:4466

#### Postgres

```
docker exec -it "colrc-v2-postgres-db" psql -d colrc -U root -W
```
See [`.env`](./.env) for the credentials used to launch the development version of the service.

Place `.sql` files in [`misc/sql`](./misc/sql) to have them loaded when Postgres (v12) first launches.

### Test

We suggest testing using the environment launched by `docker-compose`.

#### Frontend tests
Frontend tests are written using [`jest`](https://jestjs.io/).

```
docker exec -it "colrc-v2-frontend" npm run test
```

#### Backend tests
Backend tests tests are written using [`jest`](https://jestjs.io/).

```
docker exec -it "colrc-v2-backend" npm run test
```

### Cleanup

To easily remove old volumes and containers, you can run the following script:
```
./cleanup.sh
```

### GitHunb workflows

.github/workflows
ci.yml
on:
    push:
        branches: [main]
    pull_requests:
        branches: [main]

jobs:
    setup:
        name: setup
        runs-on: ubuntu-latest
        outputs:
            sha_short: 
        steps:
        -   name: Checkout code
            uses: actions/checkout@v2
        -   name: generate short commit hash
            id: sha
            run: echo "::set-output name=sha_short::$