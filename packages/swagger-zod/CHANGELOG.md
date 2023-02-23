# Changelog

## [0.49.1](https://github.com/stijnvanhulle/kubb/compare/@kubb/swagger-zod-v0.49.0...@kubb/swagger-zod-v0.49.1) (2023-02-23)


### Bug Fixes

* refactor zodBuilder and typeBuilder ([6e0ada6](https://github.com/stijnvanhulle/kubb/commit/6e0ada6af9fa71658c0812cc72db507aa15cea66))

## [0.49.0](https://github.com/stijnvanhulle/kubb/compare/@kubb/swagger-zod-v0.48.0...@kubb/swagger-zod-v0.49.0) (2023-02-23)


### Features

* sort for types and zodSchemas based on refs(first ones based on a ref and then the ones using the ref) ([0f9c424](https://github.com/stijnvanhulle/kubb/commit/0f9c4249f912867aea49d025e3983db72f09a5e5))

## [0.48.0](https://github.com/stijnvanhulle/kubb/compare/@kubb/swagger-zod-v0.47.1...@kubb/swagger-zod-v0.48.0) (2023-02-23)


### Features

* oasBuilder ([2001bb9](https://github.com/stijnvanhulle/kubb/commit/2001bb9f6b4b65a4d67e1e3b4f75517c109c2a44))

## [0.47.1](https://github.com/stijnvanhulle/kubb/compare/@kubb/swagger-zod-v0.47.0...@kubb/swagger-zod-v0.47.1) (2023-02-22)


### Bug Fixes

* refactor of operationgenerator + baseOperationGenerator for swagger package ([2f4739b](https://github.com/stijnvanhulle/kubb/commit/2f4739b25e3a456f44647ee46272cd341975152b))

## [0.47.0](https://github.com/stijnvanhulle/kubb/compare/@kubb/swagger-zod-v0.46.0...@kubb/swagger-zod-v0.47.0) (2023-02-22)


### Features

* format with js-beautify instead of Prettier(works also in the browser) ([ecc0952](https://github.com/stijnvanhulle/kubb/commit/ecc0952c929aa71bac8a3bb0cf400289c7dee142))

## [0.46.0](https://github.com/stijnvanhulle/kubb/compare/@kubb/swagger-zod-v0.45.1...@kubb/swagger-zod-v0.46.0) (2023-02-22)


### Miscellaneous Chores

* **@kubb/swagger-zod:** Synchronize undefined versions

## [0.45.1](https://github.com/stijnvanhulle/kubb/compare/@kubb/swagger-zod-v0.45.0...@kubb/swagger-zod-v0.45.1) (2023-02-22)


### Bug Fixes

* do not write indexes when output.write is false ([0c96139](https://github.com/stijnvanhulle/kubb/commit/0c961392dcb56fa6b7d0334317fc36181e45e561))

## [0.45.0](https://github.com/stijnvanhulle/kubb/compare/@kubb/swagger-zod-v0.44.2...@kubb/swagger-zod-v0.45.0) (2023-02-22)


### Features

* use of PathParams and QueryParams ([f60dd4f](https://github.com/stijnvanhulle/kubb/commit/f60dd4f6a389bfb4712671ed9c17ef838637c8a5))
* use of pathParams to create function arguments for ReactQuery GET hooks ([e6994fc](https://github.com/stijnvanhulle/kubb/commit/e6994fc9576122d1aaf2edabab65d871f43a6e8a))

## [0.44.2](https://github.com/stijnvanhulle/kubb/compare/@kubb/swagger-zod-v0.44.1...@kubb/swagger-zod-v0.44.2) (2023-02-22)


### Miscellaneous Chores

* **@kubb/swagger-zod:** Synchronize undefined versions

## [0.44.1](https://github.com/stijnvanhulle/kubb/compare/@kubb/swagger-zod-v0.44.0...@kubb/swagger-zod-v0.44.1) (2023-02-22)


### Miscellaneous Chores

* **@kubb/swagger-zod:** Synchronize undefined versions

## [0.44.0](https://github.com/stijnvanhulle/kubb/compare/@kubb/swagger-zod-v0.43.3...@kubb/swagger-zod-v0.44.0) (2023-02-22)


### Features

* add put and delete operations + params for URL type ([21ab4cf](https://github.com/stijnvanhulle/kubb/commit/21ab4cff7ceab496718119e6abc145e96125b364))
* zod enum ([ee17710](https://github.com/stijnvanhulle/kubb/commit/ee1771074848a425e50ea9dbb0a9f898c7d617ae))
* zod package with zod.any and zod.object({}) ([d19b6a3](https://github.com/stijnvanhulle/kubb/commit/d19b6a3f81d3c21ddd68d67cb5d4b7839f26fd77))
* zod.object with parameters, zod.array and zod ref with correc import ([e0d111c](https://github.com/stijnvanhulle/kubb/commit/e0d111c53a98e55ec58498c2a9d048724289c64e))


### Bug Fixes

* filter out if schema.map is not a function ([57250ed](https://github.com/stijnvanhulle/kubb/commit/57250edded807b9641a61ffeefee2f96a1349f80))
* use of camelCase for zod schemas ([3406eeb](https://github.com/stijnvanhulle/kubb/commit/3406eeb9bd380000a35eaabb942c19a137e3b2a8))
* use of isTypeOnly instead of type for FileManager ([d921543](https://github.com/stijnvanhulle/kubb/commit/d921543daff94838da38629e6341d2dd1dba77ec))
* when post/get does not exist, do not generate type/hook/schema ([16b5648](https://github.com/stijnvanhulle/kubb/commit/16b5648b613a66811d1b24be0d6065bb84b3143a))

## [0.43.3](https://github.com/stijnvanhulle/kubb/compare/@kubb/cli-v0.43.2...@kubb/cli-v0.43.3) (2023-02-21)


### Miscellaneous Chores

* **@kubb/cli:** Synchronize undefined versions

## [0.43.2](https://github.com/stijnvanhulle/kubb/compare/@kubb/cli-v0.43.1...@kubb/cli-v0.43.2) (2023-02-21)


### Miscellaneous Chores

* **@kubb/cli:** Synchronize undefined versions

## [0.43.1](https://github.com/stijnvanhulle/kubb/compare/@kubb/swagger-zod-v0.43.0...@kubb/swagger-zod-v0.43.1) (2023-02-21)


### Bug Fixes

* filter out if schema.map is not a function ([57250ed](https://github.com/stijnvanhulle/kubb/commit/57250edded807b9641a61ffeefee2f96a1349f80))

## [0.43.0](https://github.com/stijnvanhulle/kubb/compare/@kubb/swagger-zod-v0.42.1...@kubb/swagger-zod-v0.43.0) (2023-02-21)


### Features

* add put and delete operations + params for URL type ([21ab4cf](https://github.com/stijnvanhulle/kubb/commit/21ab4cff7ceab496718119e6abc145e96125b364))
* zod enum ([ee17710](https://github.com/stijnvanhulle/kubb/commit/ee1771074848a425e50ea9dbb0a9f898c7d617ae))
* zod package with zod.any and zod.object({}) ([d19b6a3](https://github.com/stijnvanhulle/kubb/commit/d19b6a3f81d3c21ddd68d67cb5d4b7839f26fd77))
* zod.object with parameters, zod.array and zod ref with correc import ([e0d111c](https://github.com/stijnvanhulle/kubb/commit/e0d111c53a98e55ec58498c2a9d048724289c64e))


### Bug Fixes

* use of camelCase for zod schemas ([3406eeb](https://github.com/stijnvanhulle/kubb/commit/3406eeb9bd380000a35eaabb942c19a137e3b2a8))
* use of isTypeOnly instead of type for FileManager ([d921543](https://github.com/stijnvanhulle/kubb/commit/d921543daff94838da38629e6341d2dd1dba77ec))
* when post/get does not exist, do not generate type/hook/schema ([16b5648](https://github.com/stijnvanhulle/kubb/commit/16b5648b613a66811d1b24be0d6065bb84b3143a))