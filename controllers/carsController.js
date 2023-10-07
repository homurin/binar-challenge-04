import path from "path";
import Car from "../models/carsModel.js";
import { __dirname } from "../libs/absolutePath.js";
import imagekit from "../libs/imageKit.js";

const findCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json({
      status: "success",
      data: cars,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "internal server error",
      errorMessage: err.message,
    });
  }
};

const findCarById = async (req, res) => {
  const id = req.params.id;
  try {
    const cars = await Car.findById(id);
    res.status(200).json({
      status: "success",
      data: cars,
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({
        status: "failed",
        message: `Sorry car with id: ${req.params.id} not found`,
      });
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
      return res.status(400).json({
        status: "failed",
        message:
          "please enter valid category value like small, medium and large",
      });
    }

    const image = await imagekit.upload({
      file: file.buffer,
      fileName: `IMG-${Date.now()}.${extension}`,
    });

    const newCar = await Car.create({ ...reqBody, image: image.url });

    res.status(201).json({
      status: "success",
      data: newCar,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Bad request",
      errorMessage: err.message,
    });
  }
};

const editCarById = async (req, res) => {
  const id = req.params.id;
  const { body: reqBody, file } = req;
  const update = { ...reqBody };
  const alloweedCategories = ["small", "medium", "large"];
  const isCategoryAllowed = alloweedCategories.includes(reqBody.category);

  try {
    if (!isCategoryAllowed) {
      return res.status(400).json({
        status: "failed",
        message:
          "please enter valid category value like small, medium and large",
      });
    }
    if (file) {
      const fileName = file.originalname;
      const extension = path.extname(fileName);

      const image = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      });
      update.image = image.url;
    }
    const updatedCar = await Car.findByIdAndUpdate(id, update, { new: true });
    res.status(201).json({
      status: "success",
      data: updatedCar,
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({
        status: "failed",
        message: `Sorry car with id: ${req.params.id} not found`,
      });
    }
    res
      .status(500)
      .json({ status: "failed", message: "internal server error" });
  }
};

const deleteCarById = async (req, res) => {
  const id = req.params.id;
  try {
    const car = await Car.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      message: `Success delete car with id: ${id}`,
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({
        status: "failed",
        message: `Sorry car with id: ${req.params.id} not found`,
      });
    }
    res
      .status(500)
      .json({ status: "failed", message: "internal server error" });
  }
};

export { createCar, findCars, findCarById, editCarById, deleteCarById };
