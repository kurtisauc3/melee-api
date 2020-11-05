import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema(
    {
        game_id: String,
        owner_id: String
    },
    {
        collection: 'lobbys'
    }
);

export default mongoose.model('lobby', schema);
