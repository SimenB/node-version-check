import test from 'ava';
import sinon from 'sinon';

let originalVersion;

test.before(() => {
  originalVersion = process.version;
  Object.defineProperty(process, 'version', {
    value: 'v7.0.0',
  });
});

test.beforeEach(() => {
  sinon.stub(process, 'exit');
});

test.afterEach(() => {
  process.exit.restore();
  delete require.cache[require.resolve('../gte6')];
});

test.after.always(() => {
  Object.defineProperty(process, 'version', {
    value: originalVersion,
  });
});

test('greater version', t => {
  require('../gte6'); // eslint-disable-line global-require

  t.true(process.exit.calledOnce);
  t.true(process.exit.calledWithExactly(0));
});

test('lesser version', t => {
  Object.defineProperty(process, 'version', {
    value: 'v3.0.0',
  });

  require('../gte6'); // eslint-disable-line global-require

  t.true(process.exit.calledOnce);
  t.true(process.exit.calledWithExactly(1));
});
