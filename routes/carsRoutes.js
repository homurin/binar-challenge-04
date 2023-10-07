import { Router } from "express";
import * as carsController from "../controllers/carsController.js";
import upload from "../middlewares/multer.js";

const router = Router();

router
  .route("/")
  .get(carsController.findCars)
  .post(upload.single("image"), carsController.createCar);

router
  .route("/:id")
  .get(carsController.findCarById)
  .patch(upload.single("image"), carsController.editCarById)
  .delete(carsController.deleteCarById);

export default router;
