import express from "express";
// import jwt from "jsonwebtoken";
import { UserModel } from "./db";
const app = express();

app.get("/api/v1/content", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  await UserModel.create({
    username: username,
    password: password,
  });

  res.json({
    messaage: "Usser created Successfully",
  });
});

// app.delete("/api/v1/content", (req, res) => {});

// app.post("/api/v1/brain/share", (req, res) => {});

// app.get("/api/v1/breain/:shareLink", (req, res) => {});

app.listen(3000);
console.log("server started on port 3000");
