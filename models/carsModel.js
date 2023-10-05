import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "car name is required"],
    },
    price: {
      type: Number,
      required: [true, "car price is required"],
    },
    category: {
      type: String,
      required: [true, "car size is required"],
    },
    image: {
      type: String,
      required: [true, "car image is required"],
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);

export default Car;
