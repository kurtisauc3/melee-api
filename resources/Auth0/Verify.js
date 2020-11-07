function verify (email, callback) {
    const bcrypt = require('bcrypt');
    const MongoClient = require('mongodb@3.1.4').MongoClient;
    const dbUrl = `<YOUR_DATABASE_URL>`;
    const client = new MongoClient(dbUrl);

    client.connect(function (err) {
      if (err) return callback(err);

      const db = client.db(`<YOUR_DATABASE_NAME>`);
      const users = db.collection(`users`);
      const query = { email: email, email_verified: false };

      users.update(query, { $set: { email_verified: true } }, function (err, count) {
        client.close();

        if (err) return callback(err);
        callback(null, count > 0);
      });
    });
  }
