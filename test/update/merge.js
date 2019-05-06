'use strict';

const test = require('jtf');
const { Ormv, model } = require('../db/');

const { $merge, } = Ormv.Op;
const { tasks } = model;

test('update $merge', async t => {

   const update = {
      "keywords": $merge({
         "area": "5'68",
         "state": false
      })
   }

   const result = await tasks
      .update(update)
      .where({ id: 2 })
      .catch(error => {
         console.log(error)
         return {
            code: 1000,
            message: String(error)
         }
      })

   t.ok(result);

   console.log(result.rowCount);

})