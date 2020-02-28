'use strict'

const test = require('jtf');
const typea = require('typea');
const { Ormv, model } = require('../db/');

const schema = typea({
   id: Number,
   keywords: Object,
})

const { tasks } = model;

test('findPk ', async t => {

   const result = await tasks
      .findPk(89)
      .schema("public")
      .select('id', 'keywords')
      .catch(error => {
         const { message } = error;
         return {
            code: 1000,
            message
         }
      })

   const { error, data } = schema.strictVerify(result)

   if (error) {
      throw TypeError(error);
   } else {
      t.ok(data);
   }

})