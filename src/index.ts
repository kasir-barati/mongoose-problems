import { join } from 'path';
import dotenv from 'dotenv';

dotenv.config({
    path: join(__dirname, '..', '.env'),
});

import { connectToMongoDB } from './configs/mongodb.config';
import {
    UserModel,
    userDiscriminatorKey,
    UserDiscriminator,
    AdminModel,
    GuestModel,
} from './schemas/user.schema';

(async () => {
    await connectToMongoDB();

    console.log(
        'guest user \n\r\n\r',
        await GuestModel.create({
            name: 'Guest Kasir',
            email: 'guest@temp.com',
            profile: {
                avatar: 'guest',
                bio: 'unknown',
            },
            // [userDiscriminatorKey]: UserDiscriminator.guest,
            ip: '192.168.1.1',
            activity: {
                page: 'about-us',
                exitedDate: new Date('2000'),
                enteredDate: new Date('2020'),
            },
            meta: {
                genesisLoginDate: new Date('2010'),
                lastLoginDate: new Date('2009'),
                rateOfEngagement: 5,
            },
        }),
    );
    console.log(
        'admin user \n\r\n\r',
        await UserModel.create({
            name: 'Admin Kasir',
            email: 'admin@temp.com',
            profile: {
                avatar: 'admin',
                bio: 'unknown',
            },
            [userDiscriminatorKey]: UserDiscriminator.admin,
            password: 'hashed password',
            employeeInfo: {
                nationalId: '123456789',
                employeeId: '987654321',
            },
        }),
    );

    console.log(
        '\n\r\n\r',
        'update with "field-name.sub-field-name: value"',
        '\n\r\n\r',
    );

    await GuestModel.updateOne(
        { email: 'guest@temp.com' },
        {
            $set: {
                // [userDiscriminatorKey]: UserDiscriminator.guest,
                'profile.avatar': 'custom new avatar',
                'activity.page': 'index',
                'ip': '195.86.5.123',
            },
        },
    );
    console.log(await find('guest@temp.com'));

    // #FIXME: wrong usage
    await UserModel.updateOne(
        { email: 'admin@temp.com' },
        {
            $set: {
                [userDiscriminatorKey]: UserDiscriminator.admin,
                'name': 'kasir san',
                'profile.avatar': 'third new avatar',
                'password': 'new hashed pass',
                'employeeInfo.employeeId': 'another employee id set',
            },
        },
    );
    console.log(await find('admin@temp.com'));

    console.log(
        '\n\r\n\r',
        'update with "field-name: {sub-field-name: value}"',
        '\n\r\n\r',
    );

    const meta = {
        genesisLoginDate: new Date('2013'),
        lastLoginDate: new Date('2011'),
        rateOfEngagement: 15,
    };

    await GuestModel.updateOne(
        { email: 'guest@temp.com' },
        {
            $set: {
                name: 'kasir san name updated',
                // [userDiscriminatorKey]: UserDiscriminator.guest,
                profile: {
                    avatar: 'updated avatar',
                },
                activity: { page: 'index' },
                ip: '195.86.5.123',
                meta,
            },
        },
    );
    console.log(await find('guest@temp.com'));

    // #FIXME: wrong usage
    await UserModel.updateOne(
        { email: 'admin@temp.com' },
        {
            $set: {
                name: 'kasir san name updated',
                [userDiscriminatorKey]: UserDiscriminator.admin,
                profile: {
                    avatar: 'admin update his/her avatar',
                },
                employeeInfo: { nationalId: 'admin new national id' },
                password: '195.86.5.123 changes',
            },
        },
    );
    console.log(await find('admin@temp.com'));
})();

function find(email: string) {
    return UserModel.findOne({ email });
}
