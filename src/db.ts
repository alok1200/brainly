import mongoose, { model, Schema } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("MONGODB_URL is not set");
}

mongoose.connect(MONGODB_URL);

const UserSchema = new Schema({
  Username: { type: String, unique: true },
  password: String,
});

export const UserModel = model("User", UserSchema);

//https://youtube.com/shorts/Mq5NEAZwTx4?si=En-473W9_dmzOIml
