import Car from "../models/carsModel.js";

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
    const newData = await Car.create(req.body);
    res.status(201).json({
      status: "success",
      data: newData,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "internal server error",
      errorMessage: err.message,
    });
  }
};

export { createCar };
