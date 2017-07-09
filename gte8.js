#!/usr/bin/env node

'use strict';

var check = require('./index');

process.exit(check.gte(8) ? 0 : 1);
