function remove(id, callback)
{
    const bcrypt = require('bcrypt');
    const MongoClient = require('mongodb@3.1.4').MongoClient;
    const client = new MongoClient(`${configuration.mongoUrl}`);

    client.connect(function (err)
    {
        if (err) return callback(err);

        const db = client.db(`${configuration.dbname}`);
        const users = db.collection(`${configuration.colname}`);

        users.remove({ _id: id }, function (err)
        {
            client.close();
            if (err) return callback(err);
            callback(null);
        });
    });
}
