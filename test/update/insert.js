'use strict';

const test = require('jtf');
const { Ormv, model } = require('../db/');

const { $insert } = Ormv.Op;
const { tasks } = model;

test('update $insert', async t => {

   const result = await tasks
      .update({
         list: $insert('list', "{0}", {
            "state": true
         })
      })
      .where({ id: 4 })
      .catch(error => {
         return {
            code: 1000,
            message: String(error)
         }
      })

   t.ok(result)

   console.log(result);

})