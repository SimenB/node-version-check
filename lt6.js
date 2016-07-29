#!/usr/bin/env node

'use strict';

var check = require('./index');

process.exit(check.lt(6) ? 0 : 1);
