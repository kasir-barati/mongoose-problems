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
    meta?: {
        lastLoginDate: Date;
        rateOfEngagement: number;
        genesisLoginDate: Date;
    };
}
export interface GuestDocument extends UserDocument {
    ip: string;
    activity?: {
        page?: string;
        exitedDate?: Date;
        enteredDate?: Date;
    };
}
export interface AdminDocument extends UserDocument {
    password: string;
    employeeInfo?: {
        nationalId?: string;
        employeeId?: string;
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
        meta: {
            lastLoginDate: { type: Date, required: false },
            rateOfEngagement: { type: Number, required: false },
            genesisLoginDate: { type: Date, required: false },
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
export const AdminModel = UserModel.discriminator(
    UserDiscriminator.admin,
    adminSchema,
);
export const GuestModel = UserModel.discriminator(
    UserDiscriminator.guest,
    guestSchema,
);
