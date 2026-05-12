import Package from "../models/Package.js";

export const createPackage = async (req, res) => {
  try {
    const newPackage = await Package.create(req.body);

    res.status(201).json({
      message: "Package created successfully",
      newPackage,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getPackages = async (req, res) => {
  try {
    const packages = await Package.find();

    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getSinglePackage = async (req, res) => {
  try {
    const singlePackage = await Package.findById(req.params.id);

    res.status(200).json(singlePackage);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};