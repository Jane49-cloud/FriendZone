import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import { register } from "./controllers/auth.js";
import authroutes from "./routes/auth.js";
import userroutes from "./routes/user.js";
import postroutes from "./routes/posts.js";
import {createPost} from "./controllers/posts.js"
import{ verifyToken } from "./middleware/auth.js"
import User from "./models/user.js";
import Post from "./models/post.js";
import { users, posts } from "./data/index.js";
// configurations

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "35mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "35mb", extended: true }));
app.use(morgan("common"));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// File storage => when someone uploads pics
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// ROUTES WITH FILES

app.post("/auth/register", upload.single("picture"), register);
app.post("/post", verifyToken, upload.single("picture"), createPost)
app.use("/auth", authroutes)
app.use("/user", userroutes)
app.use("/post", postroutes)

const port = process.env.PORT || 8000;

//Mongoose set up

try {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(
      process.env.MONGO_DB,
      { useUnifiedTopology: true, useNewUrlParser: true },
      console.log(`connecting to db...`)      
    )
    .then(app.listen(port, console.log(`running on port ${port}...`)));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
} catch (error) {
  console.log(error, "connect to Mongoose failed...");
}

