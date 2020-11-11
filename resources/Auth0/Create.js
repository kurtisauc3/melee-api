function create(user, callback)
{
    const bcrypt = require('bcrypt');
    const MongoClient = require('mongodb@3.1.4').MongoClient;
    const client = new MongoClient(`${configuration.mongoUrl}`);

    client.connect(function (err)
    {
        if (err) return callback(err);

        const db = client.db(`${configuration.dbname}`);
        const users = db.collection(`${configuration.colname}`);

        users.findOne({ email: user.email }, function (err, withSameEmail)
        {
            if (err || withSameEmail)
            {
                client.close();
                return callback(err || new Error('the email already exists'));
            }
            bcrypt.hash(user.password, 10, function (err, hash)
            {
                if (err)
                {
                    client.close();
                    return callback(err);
                }
                user.password = hash;
                user.lobby_id = null;

                users.insert(user, function (err, inserted)
                {
                    client.close();
                    if (err) return callback(err);
                    callback(null);
                });
            });
        });
    });
}
