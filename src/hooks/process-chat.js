'use strict';

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (action) {
  return function (hook) {
    // The authenticated user
    const user = hook.params.user;
    // The actual message text
    const name = hook.data.name
    // Messages can't be longer than 400 characters
      .substring(0, 24)
      // Do some basic HTML escaping
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const createdAt = action === 'create' ? new Date().getTime() : hook.data.createdAt;
    const updatedAt = action === 'update' ? new Date().getTime() : hook.data.updatedAt;

    const userIds = hook.data.userIds || [];
    if (!userIds.includes(user._id)) {
      userIds.push(user._id);
    }
    // Override the original data
    hook.data = {
      name,
      // Set the user id
      userIds,
      createdAt,
      updatedAt
    };

    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    return Promise.resolve(hook);
  };
};
