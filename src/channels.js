module.exports = function() {
  const app = this;

  // When a user logs in, put their real-time connection
  // in the `general` channel
  app.on('login', (user, { connection }) => {
    // connection can be undefined
    // e.g. for REST which does not have real-time functionality
    if(connection) {
      app.channel('general').join(connection);
    }
  });
};
