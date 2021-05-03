// @ts-check
const { ObjectId } = require("mongodb");
const { Schema, Types, model, connect } = require("mongoose");

const pointSchema = new Schema({
  type: {
    type: String,
    enum: ["Point"],
    default: "Point",
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const pointTypeCollectionName = "point-type";
const projectPointTypeSchema = new Schema(
  {
    type: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: pointTypeCollectionName,
  }
);
const PointTypeModel = model(
  pointTypeCollectionName,
  projectPointTypeSchema,
  pointTypeCollectionName
);

const contractorCollectionName = "contractor";
const contractorSchema = new Schema(
  {
    location: {
      homeLocation: {
        type: pointSchema,
        index: "2dsphere",
      },
      showRoomLocation: {
        type: pointSchema,
        index: "2dsphere",
      },
      studioLocation: {
        type: pointSchema,
        index: "2dsphere",
      },
      officeLocation: {
        type: pointSchema,
        index: "2dsphere",
      },
    },
  },
  {
    timestamps: true,
    collection: contractorCollectionName,
  }
);
const ContractorModel = model(
  contractorCollectionName,
  contractorSchema,
  contractorCollectionName
);

const pointCollectionName = "point";
const projectPointSchema = new Schema(
  {
    typeId: {
      type: Types.ObjectId,
      required: true,
      ref: pointTypeCollectionName,
    },
    contractor: {
      type: Types.ObjectId,
      ref: contractorCollectionName,
      required: true,
    },
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
    collection: pointCollectionName,
  }
);
const PointsModel = model(
  pointCollectionName,
  projectPointSchema,
  pointCollectionName
);

connect(`mongodb://user:123456789@0.0.0.0:27018/testdb`, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(async (mongoose) => {
  await require("./test2-dummy-data").insertDummy();

  const contractors = await ContractorModel.find().exec();

  for (let contractor of contractors) {
    const badStatusSetOutPoints = await PointsModel.aggregate([
      {
        $match: {
          contractor: new ObjectId(contractor.id),
        },
      },
      {
        $lookup: {
          from: pointTypeCollectionName,
          localField: "typeId",
          foreignField: "_id",
          as: "pointType",
        },
      },
      {
        $unwind: {
          path: "$pointType",
        },
      },
      {
        $match: {
          $expr: {
            $eq: ["$pointType.type", "bad-status-set-out"],
          },
        },
      },
    ]);

    console.log("\n\r===============\n\r");
    console.log(
      contractor.id,
      badStatusSetOutPoints.reduce(
        (accumulator, current) => (accumulator += current.amount),
        0
      )
    );
    console.log("\n\r===============\n\r");
  }
});

module.exports = {
  PointsModel,
  PointTypeModel,
  ContractorModel,
};
