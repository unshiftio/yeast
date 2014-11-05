describe('yeast', function () {
  'use strict';

  var assume = require('assume')
    , yeast = require('./');

  it('is exported as an function', function () {
    assume(yeast).is.a('function');
  });

  it('returns strings', function (next) {
    assume(yeast()).is.a('string');
    setTimeout(next);
  });

  it('prepends an iterated seed when previous id is the same', function (next) {
    var ids = [yeast(), yeast(), yeast()];

    assume(ids[0]).does.not.include(':');
    assume(ids[1]).includes(':0');
    assume(ids[2]).includes(':1');

    setTimeout(next);
  });

  it('resets the seed', function (next) {
    var ids = [yeast(), yeast(), yeast()];

    assume(ids[0]).does.not.include(':');
    assume(ids[1]).includes(':0');
    assume(ids[2]).includes(':1');

    setTimeout(function () {
      var id = [yeast(), yeast(), yeast()];

      assume(id[0]).does.not.include(':');
      assume(id[1]).includes(':0');
      assume(id[2]).includes(':1');

      setTimeout(next);
    });
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
});
