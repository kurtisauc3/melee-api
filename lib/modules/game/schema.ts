import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema(
    {
        format: Number,
        type: Number
    },
    {
        collection: 'games'
    }
);

export default mongoose.model('game', schema);
