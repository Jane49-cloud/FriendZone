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
app.use("/auth", authroutes)

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
} catch (error) {
  console.log(error, "connect to Mongoose failed...");
}
