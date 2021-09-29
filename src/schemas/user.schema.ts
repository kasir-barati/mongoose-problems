import { model, Schema, Document } from 'mongoose';

export const userDiscriminatorKey = 'userType';
export enum UserDiscriminator {
    admin = 'admin',
    guest = 'guest',
}
export interface UserDocument extends Document {
    name?: string;
    email: string;
    profile?: {
        bio?: string;
        avatar?: string;
    };
}
export interface GuestDocument extends Document {
    ip: string;
    activity: {
        page: string;
        exitedDate: Date;
        enteredDate: Date;
    };
}
export interface AdminDocument extends Document {
    password: string;
    employeeInfo: {
        nationalId: string;
        employeeId: string;
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
        discriminatorKey: userDiscriminatorKey,
    },
);
const adminSchema = new Schema<AdminDocument>({
    password: String,
    employeeInfo: {
        nationalId: String,
        employeeId: String,
    },
});
const guestSchema = new Schema<GuestDocument>({
    ip: String,
    activity: {
        page: String,
        exitedDate: Date,
        enteredDate: Date,
    },
});

export const UserModel = model<UserDocument>('user', userSchema);

UserModel.discriminator(UserDiscriminator.admin, adminSchema);
UserModel.discriminator(UserDiscriminator.guest, guestSchema);
