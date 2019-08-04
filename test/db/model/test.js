'use strict';

const { Ormv, ormv } = require('../connect.js');

const { char, email, integer, array, boolean } = Ormv.Type;

const test = ormv.define('test', {
   'id': {
      type: integer,
      primaryKey: true,
   },
   'name': {
      type: char,
   },
   'address': {
      type: array,
      defaultValue: [],
   },
   'email': {
      type: email,
   },
})

// test.sync('increment');

// test.sync();

// test.sync('rebuild');

module.exports = test;