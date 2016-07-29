import test from 'ava';
import sinon from 'sinon';

let originalVersion;

test.before(() => {
  originalVersion = process.version;
  Object.defineProperty(process, 'version', {
    value: 'v5.0.0',
  });
});

test.beforeEach(() => {
  sinon.stub(process, 'exit');
});

test.afterEach(() => {
  process.exit.restore();
  delete require.cache[require.resolve('../lt4')];
});

test.after.always(() => {
  Object.defineProperty(process, 'version', {
    value: originalVersion,
  });
});

test('greater version', t => {
  require('../lt4'); // eslint-disable-line global-require

  t.true(process.exit.calledOnce);
  t.true(process.exit.calledWithExactly(1));
});

test('lesser version', t => {
  Object.defineProperty(process, 'version', {
    value: 'v3.0.0',
  });

  require('../lt4'); // eslint-disable-line global-require

  t.true(process.exit.calledOnce);
  t.true(process.exit.calledWithExactly(0));
});
