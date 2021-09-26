import { join } from 'path';
import dotenv from 'dotenv';

dotenv.config({
    path: join(__dirname, '..', '.env'),
});

import { connectToMongoDB } from './configs/mongodb.config';
import { UserModel } from './schemas/user.schema';

(async () => {
    await connectToMongoDB();

    for (let index = 1; index < 5; index++) {
        console.log(
            await UserModel.create({
                name: 'Kasir' + index,
                email: 'temp@temp.com' + index,
                profile: {
                    avatar: 'none',
                    bio: 'nodejs developer',
                },
            }),
        );
    }

    for (let index = 1; index < 5; index++) {
        await UserModel.updateOne(
            { email: 'temp@temp.com' + index },
            {
                $set: {
                    'profile.avatar': 'second new avatar',
                },
            },
        );
        console.log(await find('temp@temp.com' + index));

        await UserModel.updateOne(
            { email: 'temp@temp.com' + index },
            {
                $set: {
                    'name': 'kasir san',
                    'profile.avatar': 'third new avatar',
                },
            },
        );
        console.log(await find('temp@temp.com' + index));

        await UserModel.updateOne(
            { email: 'temp@temp.com' + index },
            {
                $set: {
                    name: 'kasir san',
                    profile: {
                        avatar: 'first new avatar',
                    },
                },
            },
        );
        console.log(await find('temp@temp.com' + index));
    }
})();

function find(email: string) {
    return UserModel.findOne({ email });
}
