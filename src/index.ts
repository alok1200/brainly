import express from "express";
// import jwt from "jsonwebtoken";
import { UserModel } from "./db";
const app = express();

app.post("/api/v1/signup", async (req, res) => {
  // TODO: zod validation , hash the password
  const username = req.body.username;
  const password = req.body.password;

  try {
    await UserModel.create({
      username: username,
      password: password,
    });

    res.json({
      message: "User signed up",
    });
  } catch (e) {
    res.status(411).json({
      message: "User already exists",
    });
  }
});

// app.delete("/api/v1/content", (req, res) => {});

// app.post("/api/v1/brain/share", (req, res) => {});

// app.get("/api/v1/breain/:shareLink", (req, res) => {});

app.listen(3000);
console.log("server started on port 3000");
