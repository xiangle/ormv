'use strict'

const test = require('jtf');
const { Ormv, model } = require('./db');

const { tasks } = model;

test('updateMerge JSON || 合并', async t => {

   const update = {
      "keywords": {
         "area": "5'68",
         "state": false
      }
   }

   const result = await tasks
      .updateMerge(update)
      .where({ id: 2 })
      .catch(error => {
         console.log(error)
         return {
            code: 1000,
            message: String(error)
         }
      })

   t.ok(result)

   console.log(result.rowCount);

})