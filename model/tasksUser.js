'use strict';

const { ormv } = require('./index.js');
require('./tasks.js');
require('./user.js');

const tasksUser = ormv.virtual('tasks innerJoin user', {
   id: "tasks",
   uid: "tasks",
   keywords: "tasks",
   list: "tasks",
   area: "tasks",
   state: "tasks",
   createdAt: "tasks",
   updatedAt: "tasks",
   name: "user",
   image: "user",
   phone: "user",
   email: "user",
   xxx: "user.age",
   ggr: "user.age",
}, { 'tasks.uid': 'user.id' });

module.exports = tasksUser;
