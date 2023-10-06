import fs from "fs/promises";
import path from "path";
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
    console.info(err);
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
    res
      .status(500)
      .json({ status: "failed", message: "internal server error" });
  }
};

const createCar = async (req, res) => {
  try {
    const imageUrl = `/uploads/${req.file.filename}`;
    const reqBody = req.body;
    await Car.create({ ...reqBody, image: imageUrl });
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
  try {
    const id = req.params.id;
    const reqBody = req.body;
    const update = { ...reqBody };
    if (req.file) {
      const oldImageUrl = path.join(publicDirectory, reqBody.image);
      const newImageUrl = `/uploads/${req.file.filename}`;

      update.image = newImageUrl;
      await fs.unlink(oldImageUrl);
    }
    await Car.findByIdAndUpdate(id, update);
    req.flash("status", "success");
    req.flash("message", "success edit car");
    res.status(301).redirect("/dashboard");
  } catch (err) {
    console.info(err);
    req.flash("status", "failed");
    req.flash("message", "failed to edit car");
    res.status(400).redirect("/dashboard");
  }
};
const deleteCar = async (req, res) => {
  try {
    const id = req.params.id;
    const car = await Car.findById(id);
    if (!car) {
      req.flash("status", "failed");
      req.flash("message", "failed delete car");
      res.status(301).redirect("/dashboard");
    }
    await fs.unlink(`${__dirname}/public${car.image}`);
    await Car.findByIdAndDelete(id);

    req.flash("status", "success");
    req.flash("message", "success delete car");
    res.status(301).redirect("/dashboard");
  } catch (err) {
    console.info(err);
    req.flash("status", "failed");
    req.flash("message", "failed to delete car");
    res.status(400).redirect("/dashboard");
  }
};

export { dashboardPage, createPage, createCar, editPage, editCar, deleteCar };
