const DeliveryVehicle = require("../models/DeliveryVehicles"); // Import your DeliveryVehicle model

// Create a delivery vehicle
const createVechile = async (req, res) => {
  try {
    const { registrationNumber, vehicleType, city } = req.body;

    const newVehicle = new DeliveryVehicle({
      registrationNumber,
      vehicleType,
      city,
    });

    const savedVehicle = await newVehicle.save();

    res.status(201).json(savedVehicle);
  } catch (error) {
    res.status(500).json({ error: "Could not create delivery vehicle" });
  }
};

// Get all delivery vehicles
const getVechiles = async (req, res) => {
  try {
    const vehicles = await DeliveryVehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch delivery vehicles" });
  }
};

// Update a delivery vehicle
const updateVechile = async (req, res) => {
  try {
    const { vehicleType, city } = req.body;
    const vehicleId = req.params.vehicleId;

    const updatedVehicle = await DeliveryVehicle.findByIdAndUpdate(
      { _id: vehicleId },
      { vehicleType, city },
      { new: true }
    );
      console.log("Vechile was updated successfully ")
    res.json(updatedVehicle);
  } catch (error) {
    res.status(500).json({ error: "Could not update delivery vehicle" });
  }
};

// Delete a delivery vehicle
const deleteVechile = async (req, res) => {
  try {
    const vehicleId = req.params.vehicleId;

    await DeliveryVehicle.findByIdAndDelete(vehicleId);

    res.json({ message: "Delivery vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Could not delete delivery vehicle" });
  }
};

module.exports = {
  createVechile,
  getVechiles,
  updateVechile,
  deleteVechile,
};
