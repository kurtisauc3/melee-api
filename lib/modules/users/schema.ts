import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema(
    {
        tenant: String,
        client_id: String,
        connection: String,
        email: String,
        password: String,
        username: String,
        request_language: String,
        lobby_id: {
            type: String,
            default: null
        }
    },
    {
        collection: 'users'
    }
);

export default mongoose.model('user', schema);
