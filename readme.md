# catchy [![NPM version][npmjs-shields]][npmjs-url] [![Build Status][travis-img]][travis-url] [![Dependency Status][depstat-img]][depstat-url]
> Promise-like async control flow library, without so much abstraction.

## Install [![Nodei.co stats][npmjs-install]][npmjs-url]
> Install with [npm](https://npmjs.org)

```
$ npm install catchy
```

## API

#### catchy(fns(value[, [resolve[, reject]]), end(err, res))
- `fns` **{Array}** with async/sync functions
  + `value` **{Anything}** that are from previous function's `.resolve`
  + `resolve` **{Function}** that send some value to next function `.resolve('value for next fn')`
  + `reject` **{Function}** that throw some error to end `.reject(new Error('some err'))`
- `end` **{Function}** function that will be called when `error` (rejected), or complete successful
  + `err` can be intanceof Error or message provided from `.reject`

## Usage
> Some example, also see [example.js](./example.js). Try to fail it to see behaving. :)

```js
var catchy = require('catchy')
var first = 'str';
catchy([
  function then1(resolve, reject) {
    if (typeof first == 'string') {
      console.log('1 [pass] $first is `string`')
      resolve(first+123)
      return;
    }
    reject(new TypeError('1 [fail] $first must be `string`'))
  },
  function then2(data, resolve, reject) {
    if (data == 'str123') {
      console.log('2 [pass] $data is `str123`')
      setTimeout(function() {
        resolve([data, 123, true])
      }, 500)
      return;
    }
    reject(new Error('2 [fail] $data must be `str123`'))
  },
  function then3(data, resolve, reject) {
    if (Array.isArray(data) && data.length == 3) {
      console.log('3 [pass] $data is `array`')
      console.log('3 [pass] $data is with length 3')
      resolve(data);
      return;
    }
    reject(new Error('3 [fail] $data must be array with length 3'))
  },
  function then4(data, resolve, reject) {
    if (data[1] !== 123) {
      reject(new Error('4 [fail] $data[1] should be `123` {Number}'))
      return;
    }
    setTimeout(function() {
      console.log('4 [pass] $data[1] is `123`, convert to `yes123`')
      data[1] = 'yes123'
      resolve(data, 'hello here')
    },200)
  },
  function then5(data, second, resolve, reject) {
    if (data[1] === 'yes123' && second === 'hello here') {
      console.log('5 [pass] $data[1] is `yes123`')
      console.log('5 [pass] $second is `hello here`')
      resolve(12, data, second)
      return;
    }
    reject(new Error('5 [fail] $data[1] should be `yes123` {String} and $second should be `hello here`'))
  }],
function done(err, res) {
  if (err) {
    console.error(err)
    return;
  }
  console.log('Completed successfully!');
  console.log(res)
})

```

## Tests
> As usual - `npm test` **or** if you have [mocha][mocha-url] globally - `mocha`.

```
$ npm test
```


## Authors & Contributors [![author tips][author-gittip-img]][author-gittip]

**Charlike Mike Reagent**
+ [gittip/tunnckoCore][author-gittip]
+ [github/tunnckoCore][author-github]
+ [twitter/tunnckoCore][author-twitter]
+ [npmjs/tunnckoCore][author-npmjs]


## License [![MIT license][license-img]][license-url]
Copyright (c) 2014 [Charlike Mike Reagent][author-website], [contributors](https://github.com/tunnckoCore/catchy/graphs/contributors).  
Released under the [`MIT`][license-url] license.



[npmjs-url]: http://npm.im/catchy
[npmjs-shields]: http://img.shields.io/npm/v/catchy.svg
[npmjs-install]: https://nodei.co/npm/catchy.svg?mini=true

[coveralls-url]: https://coveralls.io/r/tunnckoCore/catchy?branch=master
[coveralls-shields]: https://img.shields.io/coveralls/tunnckoCore/catchy.svg

[license-url]: https://github.com/tunnckoCore/catchy/blob/master/license.md
[license-img]: http://img.shields.io/badge/license-MIT-blue.svg

[travis-url]: https://travis-ci.org/tunnckoCore/catchy
[travis-img]: https://travis-ci.org/tunnckoCore/catchy.svg?branch=master

[depstat-url]: https://david-dm.org/tunnckoCore/catchy
[depstat-img]: https://david-dm.org/tunnckoCore/catchy.svg

[author-gittip-img]: http://img.shields.io/gittip/tunnckoCore.svg
[author-gittip]: https://www.gittip.com/tunnckoCore
[author-github]: https://github.com/tunnckoCore
[author-twitter]: https://twitter.com/tunnckoCore

[author-website]: http://www.whistle-bg.tk
[author-npmjs]: https://npmjs.org/~tunnckocore

[cobody-url]: https://github.com/tj/co-body
[mocha-url]: https://github.com/tj/mocha
[rawbody-url]: https://github.com/stream-utils/raw-body
[multer-url]: https://github.com/expressjs/multer
[express-url]: https://github.com/strongloop/express
[formidable-url]: https://github.com/felixge/node-formidable
[co-url]: https://github.com/tj/co
[extend-url]: https://github.com/justmoon/node-extend
[csp-report]: https://mathiasbynens.be/notes/csp-reports
