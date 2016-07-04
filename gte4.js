#!/usr/bin/env node

'use strict';

var check = require('./index');

process.exit(check.gte(4) ? 0 : 1);
