<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Helmet
Helmet helps secure Express apps by setting HTTP response headers.
```bash
yarn add helmet
```
## Cookie-parser
```bash
yarn add cookie-parser @types/cookie-parser
```

## ValidationPipe
To begin using it, we first install the required dependency.
```bash
yarn add class-validator class-transformer
```
## Prisma
```bash
yarn add prisma --dev
yarn prisma
yarn prisma init

yarn prisma migrate dev --name init
yarn add @prisma/client
```

## Bcrypt
```bash
yarn add bcrypt @types/bcrypt
```

## Passport
```bash
yarn add @nestjs/passport passport passport-local @types/passport-local
```

## JWT
```bash
yarn add @nestjs/jwt passport-jwt @types/passport-jwt
```

## Config
```bash
yarn add @nestjs/config
```

## OAuth2(Google)
```bash
yarn add passport-google-oauth20 @types/passport-google-oauth20
yarn add passport-naver
```

## Throttler
무차별 대입 공격으로부터 애플리케이션을 보호하는 일반적인 기술은 속도 제한 입니다
```bash
yarn add @nestjs/throttler
```

## Winston
다중 전송을 지원하는 간단하고 보편적인 로깅 라이브러리
### winston-daily-rotate-file
회전 파일에 기록하는 Winston 용 전송입니다 . 날짜, 크기 제한을 기준으로 로그를 순환할 수 있으며, 개수 또는 경과 일수를 기준으로 오래된 로그를 제거할 수 있습니다
```bash
yarn add winston winston-daily-rotate-file
```

# 다이어그램
### AppModule
![img_2.png](img_2.png)
