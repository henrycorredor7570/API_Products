module.exports = {
    require: 'ts-node/register',
    reporter: 'spec',
    timeout: 5000,
    extension: ['ts'],
    spec: 'test/**/*.test.ts',
  };
  