[![Build Status](https://travis-ci.org/arizona-linguistics/colrc-v2.svg?branch=master)](https://travis-ci.org/arizona-linguistics/colrc-v2)

# colrc-v2
COLRC version 2.0


## Getting started

Our recommended development environment can be easily launched using [`docker-compose`](https://docs.docker.com/compose/install/).  

Here are the steps we recommend to start (as of 7/14/2021):

- ensure your local system meets the requirements listed below. 
  - note that when we refer to 'the command line' we mean the *debian/linux/mac command line* (not Windows Powershell, not the Windows-native terminal app)
- create a directory where you want our application to live.  
- from the command line in that directory, clone or pull this repo:
  - on a first install, run `git clone https://github.com/arizona-linguistics/colrc-v2.git`
  - afterward, run `git pull`.  Note that the default branch, main, is the branch you should clone or pull.
  
If this is your first install:

- at the command line, cd into colrc-v2 and `docker-compose build`.  The initial build may take a while, but subsequent builds will go faster.

If this is NOT your first install && there have been changes to the database or static file structures, with the project dockered down, you'll need to:

-at the command line, in colrc-v2/misc
  -remove existing db_data if it exists: `sudo rm -rf db_data`
  -remove existing file_data if it exists `sudo rm -rf file_data`
  
If this IS your first install OR there have been changes to the database or static file structure, you'll need to:

- go to the command line in colrc-v2 and run `docker-compose up`
- once the project is up, in your command line, cd into colrc-v2/misc/file_data and run the following commands in order.  Note that the first command will take a long time to finish.  Don't move on to 2 until 1 is complete:
  1. `sudo curl -Lo audio.zip https://www.dropbox.com/sh/jtd0hw3r97rj48q/AADPJFTY0KvJnz83zK97vZh0a?dl=0`
  2. `sudo unzip audio.zip -x /`
  3. `sudo rm -f audio.zip`
  4. `sudo chmod -R a+x *`

then test to see if it was successful by pointing your web browser to http://localhost:3000.  You should see a COLRC Welcome page!



### Requirements

- [`docker`](https://docs.docker.com/install/)
- [`docker-compose`](https://docs.docker.com/compose/install/)
- If you are running Windows, you'll need to use [`WSL`](https://docs.microsoft.com/en-us/windows/wsl/install-win10) with [`Debian`](https://wiki.debian.org/InstallingDebianOn/Microsoft/Windows/SubsystemForLinux) 
- You will need sudo/root access on your system at the command line.
- we recommend using [`VSCode`](https://code.visualstudio.com/) as your code editor for this project.

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

The backend is a [`Node`](https://nodejs.org/en/) app that currently relies on [`Express`](https://expressjs.com/), [`sequelize`](https://github.com/sequelize/sequelize), [`Hasura GraphQL`](https://hasura.io/), and [`Postgres`](https://www.postgresql.org/).  If you've launched the development environment using `docker-compose`, any changes you make to the [backend source](./backend) are monitored with [`nodemon`](https://www.npmjs.com/package/nodemon), and will trigger a rebuild whenever detected.

You can access the following services:

- [`Hasura` GraphQL Console](https://hasura.io/blog/tagged/console/): http://localhost:8080

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
