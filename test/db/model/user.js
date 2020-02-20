'use strict';

const { Ormv, ormv } = require('../connect.js');

const { string, integer } = Ormv.Type;

const model = ormv.model('user', {
   'id': {
      type: integer,
      primaryKey: true,
   },
   'name': {
      type: string,
      allowNull: false,
   },
   'age': {
      type: integer
   },
   'image': {
      type: string
   },
   'phone': {
      type: string
   },
   'password': {
      type: string
   },
   'email': {
      type: string
   }
});

// model.sync();

module.exports = model;