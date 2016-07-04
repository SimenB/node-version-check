'use strict';

var semver = require('semver');

module.exports.gte = function nodeVersionCheck(version) {
  version = '' + version;

  return semver.gte(process.version, version);
};

module.exports.lt = function nodeVersionCheck(version) {
  version = '' + version;

  return semver.lt(process.version, version);
};
