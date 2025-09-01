import mongoose, { model, Schema } from "mongoose";

// const MONGODB_URL = process.env.MONGODB_URL;

// if (!MONGODB_URL) {
//   throw new Error("MONGODB_URL is not found");
// }

mongoose.connect("mongodb+srv://alok:alok1234@cluster0.4ps2204.mongodb.net/");

const UserSchema = new Schema({
  Username: { type: String, unique: true },
  password: String,
});

export const UserModel = model("User", UserSchema);

//https://youtube.com/shorts/Mq5NEAZwTx4?si=En-473W9_dmzOIml
