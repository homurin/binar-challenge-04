import express from "express";
import upload from "../middlewares/multer.js";
import * as adminController from "../controllers/adminController.js";

const router = express.Router();

router.route("/").get(adminController.dashboardPage);

router.route("/create").get(adminController.createPage);

router.route("/edit/:id").get(adminController.editPage);

router.route("/action").post(upload.single("image"), adminController.createCar);

router
  .route("/action/:id")
  .post(upload.single("newImage"), adminController.editCar);

router.route("/delete/:id").get(adminController.deleteCar);

export default router;
