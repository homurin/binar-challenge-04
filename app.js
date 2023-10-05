import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import carsRoutes from "./routes/carsRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import morgan from "morgan";
import flash from "connect-flash";
import session from "express-session";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);

app.use(flash());
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: "true",
    saveUninitialized: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/cars", carsRoutes);
app.use("/dashboard", adminRoutes);

export default app;
