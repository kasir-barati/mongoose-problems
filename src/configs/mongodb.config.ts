import { connect } from 'mongoose';

function connectToMongoDB() {
    connect('mongodb://user:123456789@0.0.0.0:27017/test', {
        useCreateIndex: true,
        useFindAndModify: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
    });
}

export { connectToMongoDB };
