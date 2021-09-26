import { model, Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
    name?: string;
    email: string;
    profile?: {
        bio?: string;
        avatar?: string;
    };
}

const userSchema = new Schema<UserDocument>(
    {
        name: String,
        email: String,
        profile: {
            bio: String,
            avatar: String,
        },
    },
    {
        timestamps: true,
    },
);

export const UserModel = model<UserDocument>('user', userSchema);
