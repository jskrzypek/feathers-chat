'use strict';

const { authenticate } = require('feathers-authentication').hooks;
const { populate } = require('feathers-hooks-common');
const processMessage = require('../../hooks/process-message');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [ processMessage('create') ],
    update: [ processMessage('update') ],
    patch: [ processMessage('update') ],
    remove: []
  },

  after: {
    all: [
      populate({
        schema: {
          include: [{
            service: 'users',
            nameAs: 'user',
            parentField: 'userId',
            childField: '_id'
          },
          {
            service: 'chats',
            nameAs: 'chat',
            parentField: 'chatId',
            childField: '_id'
          }]
        }
      })
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
