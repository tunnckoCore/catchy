/**
 * catchy <https://github.com/tunnckoCore/catchy>
 *
 * Copyright (c) 2014 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

module.exports = function catchy(funcs, end) {
  var reject = function reject(err) {
    funcs = [];
    end.call(this, err instanceof Error ? err.message : err);
    return;
  };

  var next = function next() {
    if (funcs.length === 0) {
      end.call(this, null, [].slice.call(arguments))
      return;
    }
    if (funcs && Array.isArray(funcs)) {
      funcs.shift().apply(this, [].slice.call(arguments).concat([next, reject]))
    }
  };
  next();
}
