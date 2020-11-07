function changePassword(email, newPassword, callback) {
    const bcrypt = require('bcrypt');
    const MongoClient = require('mongodb@3.1.4').MongoClient;
    const dbUrl = `<YOUR_MONGO_URL>`;
    const client = new MongoClient(dbUrl);

    client.connect(function (err) {
      if (err) return callback(err);

      const db = client.db(`<YOUR_DATABASE_NAME>`);
      const users = db.collection('users');

      bcrypt.hash(newPassword, 10, function (err, hash) {
        if (err) {
          client.close();
          return callback(err);
        }

        users.update({ email: email }, { $set: { password: hash } }, function (err, count) {
          client.close();
          if (err) return callback(err);
          callback(null, count > 0);
        });
      });
    });
  }
