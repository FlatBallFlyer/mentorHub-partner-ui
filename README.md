# mentorhub-partner-ui

This is repository contains a Vue SPA that uses [this](https://github.com/agile-learning-institute/mentorhub-partner-api) API.

[Here](https://github.com/orgs/agile-learning-institute/repositories?q=institute&type=all&sort=name) are all of the repositories in the [Institute](https://github.com/agile-learning-institute/institute/tree/main) system

## Prerequisites

- [mentorHub Developer Edition](https://github.com/agile-learning-institute/mentorHub/blob/main/mentorHub-developer-edition/README.md)
- [NodeJS and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) - if you want to build locally

## Running Locally

To run the full UI and backing services locally

```bash
mh up partner
```

## Install Dependencies

``` bash
npm install
```

## Live Serve the UI Locally

```bash
npm run serve
```

This will start API and backing service containers to support testing.

## Lints and fixes files

``` bash
npm run lint
```

## Build a production deployment package

``` bash
npm run build
```

## Build and test the UI container

``` bash
npm run container
```

This will build the UI container and launch the UI service. After launched you can the access Paths below

## Access Paths

After running the appropiate command, you can access the API following routes

- Admin Screen [http://localhost:8085/admin](http://localhost:8085/admin)
- Default [http://localhost:8085/](http://localhost:8085/) routes to List Partners

You can also access the List, Add and Edit views directly at

- List Partners [http://localhost:8085/partners](http://localhost:8085/partners)
- Add Partner [http://localhost:8085/partner](http://localhost:8085/partner)
- Edit Partner [http://localhost:8085/partner/aaaa00000000000000000021](http://localhost:8085/partner/aaaa00000000000000000021)

NOTE: After you add a partner you are automatically routed to the Edit Partner page for that partner. You can change the ID in the Edit Partner URI to edit other partners.

## Observability and configuration

The ```/admin``` route will return a list of configuration values.

The Dockerfile uses a 2-stage build, and supports multi-architecture builds. See the [Dockerfile](./Dockerfile) for details about building in the local architecture for testing.
