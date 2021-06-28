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

So...
cd <source directory> 
git clone repo (if necessary, first time)

git checkout main
git pull (to get up to date)
git branch issue<num>
git checkout issue<num>
... do work ...
git add <whatever files need to be added>
git rm <whatever files need to be removed>
git commit -m "Meaningful message"
git push -u origin issue<num> (do this the first time in order to create the branch in the repo)
... do more work ...
git add <whatever files need to be added>
git rm <whatever files need to be removed>
git commit -m "Meaningful message"
git push (no need to create the branch here)
... I am done with my work
git checkout main
git pull (if code got changed, then other people have modified main branch)
    .. merge locally
    git checkout issue<num>
    git merge main
... all done, now go to repo web site and submit a PR (pull request)
... we meet about it
... admins do a merge on the issue<num> branch

...And another feature begins...
Some people suggest forking
Some people suggest rebasing
Some people suggest using -no-ff
I am ignoring this stuff.