import test from 'ava';

import { satisfies, gte, lt } from '../index';

let originalVersion;

test.before(() => {
  originalVersion = process.version;
  Object.defineProperty(process, 'version', {
    value: 'v5.0.0',
  });
});

test.after.always(() => {
  Object.defineProperty(process, 'version', {
    value: originalVersion,
  });
});

test('satisfies', t => {
  t.true(satisfies('<6'));
  t.true(!satisfies('<5'));
  t.true(!satisfies('>5'));
  t.true(satisfies('=5'));
});

test('gte', t => {
  t.true(!gte(6));
  t.true(gte(5));
});

test('lt', t => {
  t.true(lt(6));
  t.true(!lt(5));
});
