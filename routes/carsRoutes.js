import express from "express";
import * as carsController from "../controllers/carsController.js";

const router = express.Router();
router.route("/action").post(carsController.createCar);

export default router;
