# yeast

[![Made by unshift](https://img.shields.io/badge/made%20by-unshift-00ffcc.svg?style=flat-square)](http://unshift.io)[![Version npm](http://img.shields.io/npm/v/yeast.svg?style=flat-square)](http://browsenpm.org/package/yeast)[![Build Status](http://img.shields.io/travis/unshiftio/yeast/master.svg?style=flat-square)](https://travis-ci.org/unshiftio/yeast)[![Dependencies](https://img.shields.io/david/unshiftio/yeast.svg?style=flat-square)](https://david-dm.org/unshiftio/yeast)[![Coverage Status](http://img.shields.io/coveralls/unshiftio/yeast/master.svg?style=flat-square)](https://coveralls.io/r/unshiftio/yeast?branch=master)[![IRC channel](http://img.shields.io/badge/IRC-irc.freenode.net%23unshift-00a8ff.svg?style=flat-square)](http://webchat.freenode.net/?channels=unshift)

Yeast is a unique id generator. It was primary designed to generate a unique id
which can be used for cache busting in requests. A common practise for this is
to use a time stamp. But there are couple of down sides when using timestamps.

1. The times tamp is already 13 chars long. This might not matter for 1 request
   but if you make hundreds of them this quickly adds up in bandwidth and
   processing time.
2. It's not unique enough. If you generate two stamps right after each other the
   time wouldn't have passed yet so they would be identical.

Yeast solves both of these issues by:

1. Compressing the generated time stamp to a string instead of a number using
   `toSting(36)`.
2. Seed the generated id when the previous generated id is the same as the one
   it just generated.

To keep the strings unique it will use the `:` char to separate the generated
stamp from the seed. As we're using `toString(36)` to encode the time stamp you
can still retrieve the actual time stamp by parsing it again using
`parseInt(yeastID, 36)`.

## Installation

The module is intended to be used in browsers as well as in Node.js and is
therefor released in the npm registry and can be installed using:

```
npm install --save yeast
```

## Usage

This module only exposes one single interface, so when you require yeast it will
return a function that generates the unique ids:

```js
'use strict';

var yeast = require('yeast');

console.log(yeast(), yeast(), yeast()); // outputs: i24hcpc4 i24hcpc4:0 i24hcpc4:1

setTimeout(function () {
  console.log(yeast()); // outputs: i24hd9hw
});
```

That's all folks. If you have ideas on how we can further compress the ids
please open an issue!

## License

MIT
