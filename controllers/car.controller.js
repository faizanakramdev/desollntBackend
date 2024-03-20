const { uploadToCloudinary, uploadTest } = require("../helpers/uploadFile");
const AddCar = require("../models/car.model");
const multer = require("multer");

exports.addCar = async (req, res) => {
  let imageUrls = [];

  try {
    uploadTest.array("selectedImages", 10)(req, res, async (err) => {
    //   console.log("body", req.body);
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: "Error uploading file" });
      } else if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
      }

      const files = req.files;

      if (!files || files.length === 0) {
        return res.status(400).json({ message: "Files are required" });
      }

      for (const file of files) {
        if (file.buffer === undefined) {
          return res.status(400).json({ message: "File buffer is required" });
        }
        try {
          const imageUrl = await uploadToCloudinary(file.buffer, "image");
          imageUrls.push(imageUrl);
        } catch (error) {
          console.log(error);
          return res
            .status(500)
            .json({ message: "Something went wrong on cloudinary server" });
        }
      }

      try {
        const result = await AddCar.create({
          carModel: req.body.carModel,
          price: parseInt(req.body.price),
          phoneNumber: req.body.phoneNumber,
          maxPictures: parseInt(req.body.maxPictures),
          city: req.body.city,
          selectedImages: imageUrls,
        });
        return res.status(201).json({
          status: "success",
          message: "Car added successfully",
          car: result,
        });
      } catch (error) {
        console.error("Error adding car:", error);
        if (error.name === "ValidationError") {
          const errors = Object.values(error.errors).map((err) => err.message);
          return res.status(400).json({ status: "error", message: errors });
        }
        return res
          .status(500)
          .json({ status: "error", message: "Internal server error" });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
