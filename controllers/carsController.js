import fs from "fs/promises";
import path from "path";
import Car from "../models/carsModel.js";
import { __dirname } from "../libs/absolutePath.js";
const publicDirectory = path.join(__dirname, `public/`);

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
    res.status(404).json({
      status: "failed",
      errorMessage: `Car with id: ${id} not found`,
    });
  }
};

const createCar = async (req, res) => {
  try {
    const category = req.body.category;
    if (category !== "small" && category !== "medium" && category !== "large") {
      return res.status(400).json({
        status: "failed",
        message:
          "please enter valid category value like small, medium and large",
      });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    const reqBody = req.body;
    const newCar = await Car.create({ ...reqBody, image: imageUrl });

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

const deleteCarById = async (req, res) => {
  const id = req.params.id;
  try {
    const cars = await Car.findByIdAndDelete(id);
    res.status(201).json({
      status: "success",
      data: cars,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      errorMessage: `Car with id: ${id} not found`,
    });
  }
};

export { createCar, findCars, findCarById };
