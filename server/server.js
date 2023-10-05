import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../app.js";
import process from "process";

dotenv.config();

const PORT = process.env.PORT || 3000;
const database = process.env.DATABASE_URI;

mongoose
  .connect(database, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.info(`database successfully connected`);
  })
  .catch((err) => console.info("database failed to connect"));

app.listen(PORT, () => {
  console.info(`sever listening at port ${PORT}`);
});
