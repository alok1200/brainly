import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";
import { ContentModel, LinkModel, UserModel } from "./db";
import { userMiddleware } from "./middleware";
import { random } from "./utils";

const app = express();
app.use(express.json());
app.use(cors());

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

app.delete("/api/v1/sighin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const existingUser = UserModel.findOne({
    username,
    password,
  });
  if (existingUser) {
    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      JWT_PASSWORD
    );

    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: "Incorrrect credentials",
    });
  }
});

app.post("/api/v1/brain/content", userMiddleware, async (req, res) => {
  const link = req.body.link;
  const type = req.body.type;
  await ContentModel.create({
    link,
    type,
    userId: req.userId,
    title: req.body.title,
    tags: [],
  });

  res.json({
    message: "Content added",
  });
});

app.get("/api/v1/brain/content", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const content = await ContentModel.find({
    userId: userId,
  }).populate("userId", "username");
  res.json(content);
});

app.delete("/api/v1/brain/content", userMiddleware, async (req, res) => {
  const contentId = req.body.contentId;

  await ContentModel.deleteOne({
    contentId,
    UserId: req.userId,
  });
  res.json({
    message: "Content deleted",
  });
});

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
  const share = req.body.share;
  if (share) {
    const existingLink = await LinkModel.findOne({
      userId: req.userId,
    });
    if (existingLink) {
      res.json({
        hash: existingLink.hash,
      });
      return;
    }
    const hash = random(6);
    await LinkModel.create({
      userId: req.userId,
      hash,
    });
    res.json({ hash });
  } else {
    await LinkModel.deleteMany({
      userId: req.userId,
    });
    res.json({
      message: "rendom rink",
    });
  }
});

// app.get("/api/v1/breain/:shareLink", (req, res) => {});

app.listen(3000);
console.log("server started on port 3000");
