// @ts-check
const { model, Schema, connect } = require("mongoose");

connect("mongodb://user:123456789@0.0.0.0:27017/test", {
  useCreateIndex: true,
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
});

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      index: true,
    },
  },
  {
    strict: true,
    autoIndex: true,
  }
);

// userSchema.index({ email: 1 }, { unique: true });

const User = model("user", userSchema, "user");

new User({ email: "asd@asd" })
  .save()
  .then(() => new User({ email: "asd@asd" }).save())
  .then(() => new User({ email: "asd@asd" }).save())
  .catch(console.error);
