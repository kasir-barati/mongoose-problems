// @ts-check
const { Schema, Types, model, connect } = require("mongoose");

const roleCollectionName = "role";
const roleSchema = new Schema(
  {
    title: String,
  },
  {
    timestamps: true,
    collection: roleCollectionName,
  }
);
const Role = model(roleCollectionName, roleSchema, roleCollectionName);

const userCollectionName = "user";
const userSchema = new Schema(
  {
    name: String,
    roleId: {
      type: Types.ObjectId,
      required: true,
      ref: roleCollectionName,
    },
  },
  {
    timestamps: true,
    collection: userCollectionName,
  }
);
const User = model(userCollectionName, userSchema, userCollectionName);

connect(`mongodb://user:123456789@0.0.0.0:27018/testdb`, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(async (mongoose) => {
  await new Role({
    _id: "608fc2f55b248fef2f2914f1",
    title: "admin",
  }).save();
  await new User({
    name: "guest",
    roleId: "608fc2f55b248fef2f2914f1",
  }).save();
  await new User({
    name: "kasir",
    roleId: "608fad9ea3c93ccda22610fe",
  }).save();

  const users = await User.find().populate("roleId").exec();

  for (let user of users) {
    console.dir(user.roleId.title, { depth: 4 });
  }
});
