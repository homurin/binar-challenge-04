import express from "express";
import morgan from "morgan";
import flash from "connect-flash";
import session from "express-session";
import carsRoutes from "./routes/carsRoutes.js";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/adminRoutes.js";
import { __dirname } from "./libs/absolutePath.js";

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
