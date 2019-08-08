'use strict';

const test = require('jtf');
const typea = require('typea');
const { Ormv, model } = require('../db/');

const { $in, $as } = Ormv.Op;
const { tasksUser } = model;

test('find', async t => {

   const result = await tasksUser
      .find()
      .where({
         'id': $in(50, 51),
         'keywords': {}
      })
      .limit(1)
      .then(data => {
         return data
      })
      .catch(error => {
         console.log(error)
      })

   // console.log(result);

   const { error, data } = typea(result, [{
      id: Number,
      keywords: Object,
      xx: String,
   }])

   if (error) {
      throw TypeError(error);
   } else {
      t.ok(data)
   }

})


test('select', async t => {

   const result = await tasksUser
      .find()
      .select(
         'id',
         'uid',
         'keywords',
         'image',
         'phone',
         $as("email", "xx"),
         'createdAt',
         'updatedAt'
      )
      .where({
         'id': $in(50, 51),
         keywords: {}
      })
      .order({
         "id": "desc",
         "keywords": "desc"
      })
      .offset(0)
      .limit(3)
      .then(data => {
         return data
      })
      .catch(error => {
         console.log(error)
      })

   console.log(result);

   const { error, data } = typea(result, [{
      id: Number,
      keywords: Object,
      xx: String,
   }])

   if (error) {
      throw TypeError(error);
   } else {
      t.ok(data)
   }

})


test('order offset limit', async t => {

   const result = await tasksUser
      .find()
      .order({
         "id": "desc",
         "keywords": "desc"
      })
      .offset(0)
      .limit(3)
      .then(data => {
         return data
      })
      .catch(error => {
         console.log(error)
      })

   const { error, data } = typea(result, [{
      id: Number,
      keywords: Object,
      xx: String,
   }])

   if (error) {
      throw TypeError(error);
   } else {
      t.ok(data)
   }

})

test('no select', async t => {

   const result = await tasksUser
      .find()
      .where({
         "email": "adb@qq.com"
      })
      .order({
         "id": "desc",
         "keywords": "desc"
      })
      .catch(error => {
         console.log(error)
      })

   const { error, data } = typea(result, [{
      "email": "adb@qq.com"
   }]);

   if (error) {
      throw TypeError(error);
   } else {
      t.ok(data)
   }

})