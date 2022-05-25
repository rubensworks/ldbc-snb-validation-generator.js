# LDBC SNB Validation Generator

[![Build status](https://github.com/rubensworks/ldbc-snb-validation-generator.js/workflows/CI/badge.svg)](https://github.com/rubensworks/ldbc-snb-validation-generator.js/actions?query=workflow%3ACI)
[![Coverage Status](https://coveralls.io/repos/github/rubensworks/ldbc-snb-validation-generator.js/badge.svg?branch=master)](https://coveralls.io/github/rubensworks/ldbc-snb-validation-generator.js?branch=master)
[![npm version](https://badge.fury.io/js/ldbc-snb-validation-generator.svg)](https://www.npmjs.com/package/ldbc-snb-validation-generator)

Generates SPARQL validation queries and results for the [LDBC SNB](https://github.com/ldbc/ldbc_snb_datagen_hadoop) social network dataset.

TODO

Default validation parameters can be downloaded from https://cloud.ilabt.imec.be/index.php/s/bBZZKb7cP95WgcD/download/validation_params.zip

## Installation

```bash
$ npm install -g ldbc-snb-validation-generator
```
or
```bash
$ yarn global add ldbc-snb-validation-generator
```

## Usage

### Invoke from the command line

This tool can be used on the command line as `ldbc-snb-validation-generator`,
which takes as single parameter the path to a config file:

```bash
$ ldbc-snb-validation-generator path/to/config.json
```

### Config file

The config file that should be passed to the command line tool has the following JSON structure:

```json
TODO

```

The important parts in this config file are:

* `"count"`: How many times each query template should be instantiated.

## Configure

TODO

## License

This software is written by [Ruben Taelman](https://rubensworks.net/).

This code is released under the [MIT license](http://opensource.org/licenses/MIT).
