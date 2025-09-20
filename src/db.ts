import mongoose, { model, Schema } from "mongoose";

mongoose.connect("mongodb+srv://alok:alok1234@cluster0.4ps2204.mongodb.net/");

const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
});

export const UserModel = model("User", UserSchema);

const ContentSchema = new Schema({
  title: String,
  link: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  type: String,
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

const LingSchema = new Schema({
  hash: String,
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

export const ContentModel = model("Content", ContentSchema);
export const LinkModel = model("Link", LingSchema);

//https://youtube.com/shorts/Mq5NEAZwTx4?si=En-473W9_dmzOIml
