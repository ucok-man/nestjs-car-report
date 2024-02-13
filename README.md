## Description

Rest NestJS api to report used car sales and get sales price estimates. This project was created using:

- [NestJS](https://github.com/nestjs/nest)
- [Typescript](https://www.typescriptlang.org/docs/)
- [Typeorm](https://typeorm.io/)

Environment:

- DB_NAME ( sqlite )
- COOKIE_KEY

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

```

## Endpoint

| METHOD PATH        | PAYLOAD                                          | DESCRIPTION                                |
| ------------------ | ------------------------------------------------ | ------------------------------------------ |
| POST /auth/signup  | {email, password}                                | register user                              |
| POST /auth/signin  | {email, password}                                | login user                                 |
| POST /auth/signout |                                                  | logout user                                |
| GET /users/whoami  |                                                  | get current login user                     |
| POST /reports      | {company, model, year, lng, lat, mileage, price} | reporting selling car                      |
| PATCH /reports     | {approved}                                       | approve incoming report selled car (admin) |
| GET /reports       | {company, model, year, lng, lat, mileage}        | get estimated price for car                |
