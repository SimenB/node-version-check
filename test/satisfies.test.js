/* eslint-disable no-console */

import test from 'ava';
import sinon from 'sinon';

let originalArgv;
let originalVersion;

test.before(() => {
  originalArgv = process.argv;
  originalVersion = process.version;

  Object.defineProperty(process, 'argv', {
    value: ['node', 'ava', '>=5'],
  });
  Object.defineProperty(process, 'version', {
    value: 'v5.0.0',
  });
});

test.beforeEach(() => {
  sinon.stub(process, 'exit');
  sinon.stub(console, 'error');
});

test.afterEach(() => {
  process.exit.restore();
  console.error.restore();
  delete require.cache[require.resolve('../satisfies')];
});

test.after.always(() => {
  Object.defineProperty(process, 'argv', {
    value: originalArgv,
  });
  Object.defineProperty(process, 'version', {
    value: originalVersion,
  });
});

test('greater version', t => {
  require('../satisfies'); // eslint-disable-line global-require

  t.true(process.exit.calledOnce);
  t.true(process.exit.calledWithExactly(0));
  t.true(console.error.notCalled);
});

test('lesser version', t => {
  Object.defineProperty(process, 'argv', {
    value: ['node', 'ava', '<5'],
  });

  require('../satisfies'); // eslint-disable-line global-require

  t.true(process.exit.calledOnce);
  t.true(process.exit.calledWithExactly(1));
  t.true(console.error.notCalled);
});

test('extra args', t => {
  Object.defineProperty(process, 'argv', {
    value: ['node', 'ava', '<5', 'foobar'],
  });

  require('../satisfies'); // eslint-disable-line global-require

  t.true(process.exit.calledOnce);
  t.true(process.exit.calledWithExactly(1));
  t.true(console.error.calledOnce);
  t.true(console.error.calledWithExactly('You should only pass a single argument to "node-version-satisfies"'));
});

test('missing args', t => {
  Object.defineProperty(process, 'argv', {
    value: ['node', 'ava'],
  });

  require('../satisfies'); // eslint-disable-line global-require

  t.true(process.exit.calledOnce);
  t.true(process.exit.calledWithExactly(1));
  t.true(console.error.calledOnce);
  t.true(console.error.calledWithExactly('You should only pass a single argument to "node-version-satisfies"'));
});
