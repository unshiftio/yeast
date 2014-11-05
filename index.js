'use strict';

var seed = 0
  , prev;

/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
module.exports = function yeast() {
  var now = (+new Date()).toString(36);

  if (now !== prev) return seed = 0, prev = now;
  return now+':'+ (seed++).toString(36);
};
