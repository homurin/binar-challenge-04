import process from "process";
import path from "path";
import imagekit from "../libs/imageKit.js";
import Car from "../models/carsModel.js";
import { __dirname } from "../libs/absolutePath.js";

const publicDirectory = path.join(__dirname, `public/`);

const dashboardPage = async (req, res) => {
  try {
    const { protocol, hostname, originalUrl } = req;
    const PORT = process.env.PORT;
    const { name, category } = req.query;
    const fullUrl = `${protocol}://${hostname}:${PORT}${originalUrl}`;

    const condition = {};
    const searchQuery = name ? `&name=${name}` : "";
    const allCategory = name ? `?name=${name}` : "";

    if (name) condition.name = { $regex: ".*" + name + "*.", $options: "i" };
    if (category) condition.category = category;
    const cars = await Car.find().where(condition);
    const data = {
      status: req.flash("status"),
      message: req.flash("message"),
      cars: cars,
      PORT,
      allCategory,
      searchQuery,
      fullUrl,
    };
    res.render("index", data);
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
};

const createPage = (req, res) => {
  try {
    res.status(200).render("create");
  } catch (err) {
    res
      .status(500)
      .json({ status: "failed", message: "internal server error" });
  }
};

const editPage = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    const options = ["Small", "Medium", "Large"];
    const data = { car, options };
    res.status(200).render("edit", data);
  } catch (err) {
    if (err.name === "CastError") {
      req.flash("status", "failed");
      req.flash("message", `Sorry car with id ${req.params.id} not found`);
      return res.status(404).redirect("/dashboard");
    }
    res
      .status(500)
      .json({ status: "failed", message: "internal server error" });
  }
};

const createCar = async (req, res) => {
  const { body: reqBody, file } = req;
  const fileName = file.originalname;
  const extension = path.extname(fileName);
  const alloweedCategories = ["small", "medium", "large"];
  const isCategoryAllowed = alloweedCategories.includes(reqBody.category);

  try {
    if (!isCategoryAllowed) {
      req.flash("status", "failed");
      req.flash("message", "failed to create car");
      return res.status(400).redirect("/dashboard");
    }
    const image = await imagekit.upload({
      file: file.buffer,
      fileName: `IMG-${Date.now()}.${extension}`,
    });

    await Car.create({ ...reqBody, image: image.url });
    req.flash("status", "success");
    req.flash("message", "success create new car");
    res.status(301).redirect("/dashboard");
  } catch (err) {
    req.flash("status", "failed");
    req.flash("message", "failed to create car");
    res.status(400).redirect("/dashboard");
  }
};
const editCar = async (req, res) => {
  const id = req.params.id;
  const { body: reqBody, file } = req;
  const update = { ...reqBody };
  const alloweedCategories = ["small", "medium", "large"];
  const isCategoryAllowed = alloweedCategories.includes(reqBody.category);

  try {
    if (!isCategoryAllowed) {
      req.flash("status", "failed");
      req.flash("message", "failed to create car");
      return res.status(400).redirect("/dashboard");
    }
    if (req.file) {
      const fileName = file.originalname;
      const extension = path.extname(fileName);

      const image = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      });
      update.image = image.url;
    }
    await Car.findByIdAndUpdate(id, update);
    req.flash("status", "success");
    req.flash("message", "success edit car");
    res.status(301).redirect("/dashboard");
  } catch (err) {
    req.flash("status", "failed");
    req.flash("message", "failed to edit car");
    res.status(400).redirect("/dashboard");
  }
};
const deleteCar = async (req, res) => {
  const id = req.params.id;
  try {
    await Car.findByIdAndDelete(id);

    req.flash("status", "success");
    req.flash("message", "success delete car");
    res.status(301).redirect("/dashboard");
  } catch (err) {
    if (err.name === "CastError") {
      req.flash("status", "failed");
      req.flash("message", `Sorry car with id ${req.params.id} not found`);
      return res.status(404).redirect("/dashboard");
    }
    res
      .status(500)
      .json({ status: "failed", message: "internal server error" });
  }
};

export { dashboardPage, createPage, createCar, editPage, editCar, deleteCar };
