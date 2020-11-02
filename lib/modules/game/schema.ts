import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema(
    {
        name: String
    },
    {
        collection: 'games'
    }
);

export default mongoose.model('game', schema);
