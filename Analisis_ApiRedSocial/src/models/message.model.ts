import { model, Schema, Document } from 'mongoose';

export interface IMessage extends Document{
    text: string;
    createdAt: string;
    emitter: Schema.Types.ObjectId;
    received: Schema.Types.ObjectId;
}

const messageSchema = new Schema({ 
    text: {
        type: 'String',
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    emitter: {
        type: Schema.Types.ObjectId,
        required: true
    },
    received: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

export default model<IMessage> ('Message', messageSchema);