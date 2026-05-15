import LiveLocation from "../models/LiveLocation.js";

export const updateLocation = async (req, res) => {
  try {
    const { groupTrip, latitude, longitude, speed } = req.body;

    let location = await LiveLocation.findOne({
      user: req.user._id,
      groupTrip,
    });

    if (location) {
      location.latitude = latitude;

      location.longitude = longitude;

      location.speed = speed;

      await location.save();
    } else {
      location = await LiveLocation.create({
        user: req.user._id,
        groupTrip,
        latitude,
        longitude,
        speed,
      });
    }

    const populatedLocation = await LiveLocation.findById(
      location._id,
    ).populate("user", "name");

    req.io.to(groupTrip).emit("liveLocationUpdated", populatedLocation);

    res.status(200).json({
      message: "Location updated",
      location: populatedLocation,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getTripLocations = async (req, res) => {
  try {
    const locations = await LiveLocation.find({
      groupTrip: req.params.id,
    }).populate("user", "name");

    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
