function create(user, callback) {
    const bcrypt = require('bcrypt');
    const MongoClient = require('mongodb@3.1.4').MongoClient;
    const dbUrl = `<YOUR_MONGO_URL>`;
    const client = new MongoClient(dbUrl);

    client.connect(function (err) {
      if (err) return callback(err);

      const db = client.db(`<YOUR_DATABASE_NAME>`);
      const users = db.collection(`users`);

      users.findOne({ email: user.email }, function (err, withSameMail) {
        if (err || withSameMail) {
          client.close();
          return callback(err || new Error('the user already exists'));
        }

        bcrypt.hash(user.password, 10, function (err, hash) {
          if (err) {
            client.close();
            return callback(err);
          }

          user.password = hash;
          user.lobby_id = null;

          users.insert(user, function (err, inserted) {
            client.close();

            if (err) return callback(err);
            callback(null);
          });
        });
      });
    });
  }
