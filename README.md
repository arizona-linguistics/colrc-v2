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
