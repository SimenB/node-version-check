'use strict';

var semver = require('semver');

function makeSemverString(version) {
  if (typeof version === 'number') return version + '.0.0';

  return version;
}

module.exports.gte = function nodeVersionCheck(version) {
  return semver.gte(process.version, makeSemverString(version));
};

module.exports.lt = function nodeVersionCheck(version) {
  return semver.lt(process.version, makeSemverString(version));
};
