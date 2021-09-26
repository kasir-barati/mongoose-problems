import { model, Schema } from 'mongoose';

import { allMaterials } from '../constants/cabinet-materials.constant';
import { paintMaterials } from '../constants/paint-materials.constant';

const schemaOptions = {
    discriminatorKey: 'kind',
    timestamps: true,
};

const ContractorSchema = new Schema(
    {
        contractorCanWorkWithMaterials: [
            {
                type: String,
                enum: [
                    ...Object.values(allMaterials),
                    ...Object.values(paintMaterials),
                ],
            },
        ],
    },
    schemaOptions,
);

const ContractorModel = model('contractor', ContractorSchema);

ContractorModel.discriminator(
    'painter',
    new Schema(
        {
            painter: {
                typeOfPaint: { type: String, required: true },
            },
        },
        schemaOptions,
    ),
);

ContractorModel.discriminator(
    'carpenter',
    new Schema({
        carpenter: {
            typeOfCabinet: [{ type: String, required: true }],
        },
    }),
);

ContractorModel.discriminator(
    'roofer',
    new Schema({
        roofer: {
            typeOfRoof: { type: String, required: true },
        },
    }),
);

export { ContractorModel };
