'use strict';

var semver = require('semver');

function nodeVersionSatisfiesCheck(version) {
  return semver.satisfies(process.version, version);
}

module.exports.satisfies = nodeVersionSatisfiesCheck;

module.exports.gte = function nodeVersionGteCheck(version) {
  return nodeVersionSatisfiesCheck('>=' + version);
};

module.exports.lt = function nodeVersionLtCheck(version) {
  return nodeVersionSatisfiesCheck('<' + version);
};
