/**
 * catchy <https://github.com/tunnckoCore/catchy>
 *
 * Copyright (c) 2014 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var log = require('log-symbols')
var catchy = require('./index')
var first = 'DEFAULT_';


catchy([then1, then2, then3, then4, then5], end);

function end(err, res) {
  if (err) {
    console.error('', log.error, err)
    return;
  }
  console.log()
  console.log('Completed successfully!')
  console.log('Latest fn (then5) response with:')
  console.log(res)
}

function then1(resolve, reject) {
  if (typeof first == 'string') {
    console.log('', log.success, '[pass][1] $first is `string`')
    resolve(first+123)
    return;
  }
  reject(new TypeError('[fail][1] $first must be `string`'))
}

function then2(data, resolve, reject) {
  if (data == 'DEFAULT_123') {
    console.log('', log.success, '[pass][2] $data is `DEFAULT_123`')
    setTimeout(function() {
      resolve([data, 123, true])
    }, 500)
    return;
  }
  reject(new Error('[fail][2] $data must be `DEFAULT_123`'))
}

function then3(data, resolve, reject) {
  if (Array.isArray(data) && data.length == 3) {
    console.log('', log.success, '[pass][3] $data is `array`')
    console.log('', log.success, '[pass][3] $data is with length 3')
    resolve(data);
    return;
  }
  reject(new Error('[fail][3] $data must be array with length 3'))
}

function then4(data, resolve, reject) {
  if (data[1] !== 123) {
    reject(new Error('[fail][4] $data[1] should be `123` {Number}'))
    return;
  }
  setTimeout(function() {
    console.log('', log.success, '[pass][4] $data[1] is `123`, convert to `yes123`')
    data[1] = 'yes123'
    resolve(data, 'hello here')
  },200)
}

function then5(data, second, resolve, reject) {
  if (data[1] === 'yes123' && second === 'hello here') {
    console.log('', log.success, '[pass][5] $data[1] is `yes123`')
    console.log('', log.success, '[pass][5] $second is `hello here`')
    resolve(12, data, second)
    return;
  }
  reject('[fail][5] $data[1] should be `yes123` {String} and $second should be `hello here`')
}


