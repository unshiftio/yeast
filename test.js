/* istanbul ignore next */
describe('yeast', () => {
  'use strict';

  const assume = require('assume'),
        yeast = require('./');

  function waitUntilNextMillisecond() {
    const now = +new Date();
    while (+new Date() === now) { /* do nothing */ }
  }

  it('is exported as an function', () => {
    assume(yeast).is.a('function');
  });

  it('exposes the helper functions', () => {
    assume(yeast.encode).is.a('function');
    assume(yeast.decode).is.a('function');
  });

  it('returns strings', () => {
    assume(yeast()).is.a('string');
  });

  it('prepends an iterated seed when previous id is the same', () => {
    waitUntilNextMillisecond();

    const ids = [yeast(), yeast(), yeast()];

    assume(ids[0]).does.not.include('.');
    assume(ids[1]).includes('.0');
    assume(ids[2]).includes('.1');
  });

  it('resets the seed', () => {
    waitUntilNextMillisecond();

    let ids = [yeast(), yeast(), yeast()];

    assume(ids[0]).does.not.include('.');
    assume(ids[1]).includes('.0');
    assume(ids[2]).includes('.1');

    waitUntilNextMillisecond();

    ids = [yeast(), yeast(), yeast()];

    assume(ids[0]).does.not.include('.');
    assume(ids[1]).includes('.0');
    assume(ids[2]).includes('.1');
  });

  it('does not collide', () => {
    let length = 30000,
        ids = new Array(length),
        i;

    for (i = 0; i < length; i++) ids[i] = yeast();

    ids.sort();

    for (i = 0; i < length - 1; i++) {
      if (ids[i] === ids[i + 1]) throw new Error('Found a duplicate entry');
    }
  });

  it('can convert the id to a timestamp', () => {
    waitUntilNextMillisecond();

    const now = +new Date(),
          id = yeast();

    assume(yeast.encode(now)).equals(id);
    assume(yeast.decode(id)).equals(now);
  });
});
