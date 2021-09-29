import { connect, set } from 'mongoose';

const connectionString = process.env.MONGODB_URI;

export function connectToMongoDB() {
    if (!connectionString) {
        throw new Error(`empty connectionString: ${connectionString}`);
    }
    set('debug', true);
    // do not resolve my problem
    // set('useFindAndModify', false);
    return connect(connectionString, {
        // @ts-ignore
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
}
