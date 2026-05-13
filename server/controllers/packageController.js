import Package from "../models/Package.js";
import redisClient from "../config/redis.js";

export const createPackage = async (req, res) => {
  try {
    const imageUrls = req.files.map((file) => file.path);

    const newPackage = await Package.create({
      ...req.body,
      images: imageUrls,
    });

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
    const cachedPackages = await redisClient.get("packages");

    if (cachedPackages) {
      console.log("Serving from Redis Cache");

      return res.status(200).json(JSON.parse(cachedPackages));
    }

    console.log("Serving from MongoDB");

    const pageSize = 5;

    const page = Number(req.query.page) || 1;

    const keyword = req.query.keyword
      ? {
          destination: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const category = req.query.category
      ? {
          category: req.query.category,
        }
      : {};

    const query = {
      ...keyword,
      ...category,
    };

    const count = await Package.countDocuments(query);

    const packages = await Package.find(query)
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });

    const responseData = {
      packages,
      page,
      pages: Math.ceil(count / pageSize),
      totalPackages: count,
    };

    await redisClient.setEx("packages", 60, JSON.stringify(responseData));

    res.status(200).json(responseData);
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

export const updatePackage = async (req, res) => {
  try {
    const travelPackage = await Package.findById(req.params.id);

    if (!travelPackage) {
      return res.status(404).json({
        message: "Package not found",
      });
    }

    Object.assign(travelPackage, req.body);

    const updatedPackage = await travelPackage.save();

    res.status(200).json({
      message: "Package updated successfully",
      updatedPackage,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deletePackage = async (req, res) => {
  try {
    const travelPackage = await Package.findById(req.params.id);

    if (!travelPackage) {
      return res.status(404).json({
        message: "Package not found",
      });
    }

    await travelPackage.deleteOne();

    res.status(200).json({
      message: "Package deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createPackageReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const travelPackage = await Package.findById(req.params.id);

    if (!travelPackage) {
      return res.status(404).json({
        message: "Package not found",
      });
    }

    const alreadyReviewed = travelPackage.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        message: "Package already reviewed",
      });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    travelPackage.reviews.push(review);

    travelPackage.numReviews = travelPackage.reviews.length;

    travelPackage.rating =
      travelPackage.reviews.reduce((acc, item) => item.rating + acc, 0) /
      travelPackage.reviews.length;

    await travelPackage.save();

    res.status(201).json({
      message: "Review added successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};