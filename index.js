#!/usr/bin/env node

const semver = require('semver');

if (semver.lt(process.version, '6.10.0')) {
  console.log('node version 6.10 and higher supported');
  return;
}

var main = require('./main');

main();
