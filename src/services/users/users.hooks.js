'use strict';

const { authenticate } = require('feathers-authentication').hooks;
const { hashPassword } = require('feathers-authentication-local').hooks;
const commonHooks = require('feathers-hooks-common');
const gravatar = require('../../hooks/gravatar');

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [hashPassword(), gravatar()],
    update: [ authenticate('jwt') ],
    patch: [ authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [
      commonHooks.when(hook => hook.params.provider, commonHooks.discard('password')),
      commonHooks.populate({
        schema: {
          include: [{
            service: 'messages',
            nameAs: 'messages',
            parentField: '_id',
            childField: 'userId'
          }, {
            service: 'chats',
            nameAs: 'chats',
            select: (hook, parentItem) => ({ userIds: { $in: [parentItem._id] } })
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
