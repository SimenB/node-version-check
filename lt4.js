#!/usr/bin/env node

'use strict';

var check = require('./index');

process.exit(check.lt('4.0.0') ? 0 : 1);
