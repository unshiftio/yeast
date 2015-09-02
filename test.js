/* istanbul ignore next */
describe('yeast', function () {
  'use strict';

  var assume = require('assume')
    , yeast = require('./');

  function waitUntilNextMillisecond() {
    var now = Date.now();
    while (Date.now() === now) { /* do nothing */ }
  }

  it('is exported as an function', function () {
    assume(yeast).is.a('function');
  });

  it('exposes the helper functions', function () {
    assume(yeast.encode).is.a('function');
    assume(yeast.decode).is.a('function');
  });

  it('returns strings', function () {
    assume(yeast()).is.a('string');
  });

  it('prepends an iterated seed when previous id is the same', function () {
    waitUntilNextMillisecond();

    var ids = [yeast(), yeast(), yeast()];

    assume(ids[0]).does.not.include('.');
    assume(ids[1]).includes('.0');
    assume(ids[2]).includes('.1');
  });

  it('resets the seed', function () {
    waitUntilNextMillisecond();

    var ids = [yeast(), yeast(), yeast()];

    assume(ids[0]).does.not.include('.');
    assume(ids[1]).includes('.0');
    assume(ids[2]).includes('.1');

    waitUntilNextMillisecond();

    ids = [yeast(), yeast(), yeast()];

    assume(ids[0]).does.not.include('.');
    assume(ids[1]).includes('.0');
    assume(ids[2]).includes('.1');
  });

  it('does not collide', function () {
    var ids = [];

    this.timeout(1200000);

    for (var i = 0; i < 100000; i++) {
      ids.push(yeast());
    }

    if (ids.some(function (id, index) {
      return ids.indexOf(id) !== index;
    })) throw new Error('Found a duplicate entry');
  });

  it('can convert the id to a timestamp', function () {
    waitUntilNextMillisecond();

    var now = Date.now()
      , id = yeast();

    assume(yeast.encode(now)).equals(id);
    assume(yeast.decode(id)).equals(now);
  });
});
