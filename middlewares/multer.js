import multer from "multer";
import path from "path";
import { __dirname } from "../libs/absolutePath.js";

const publicDirectory = path.join(__dirname, "public");
const uploadDirectory = path.join(publicDirectory, "uploads");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDirectory);
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = `${Date.now()}-${Math.random() * 1e9}`;
    callback(null, `image-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

export default multer({ storage });
