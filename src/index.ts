import { MongoError } from 'mongodb';
import { connectToMongoDB } from './configs/mongodb.config';
import { ContractorModel } from './schemas/contractor.schema';

connectToMongoDB();

new ContractorModel({
    contractorCanWorkWithMaterials: ['multi'],
})
    .save()
    .then(() => process.exit(0))
    .catch((error: MongoError) => {
        console.error(error);
        process.exit(-1);
    });
