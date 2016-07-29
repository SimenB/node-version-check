#!/usr/bin/env node

'use strict';

var check = require('./index');

process.exit(check.gte(6) ? 0 : 1);
