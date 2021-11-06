import mongoose, { model, Schema, Document } from'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export interface IFriends extends Document{
    user: mongoose.Types.ObjectId;
    friends: mongoose.Types.ObjectId;
}

const friendSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    friends: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{
    timestamps: true,
    versionKey: false,
});

friendSchema.plugin(mongoosePaginate);

export default model<IFriends> ('Friends', friendSchema)