const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    unique: true,
    required: true,
  },
  vehicleType: {
    type: String,
    enum: ["bike", "truck"],
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  activeOrdersCount: {
    type: Number,
    default: 0,
  },
});

const DeliveryVehicle = mongoose.model("DeliveryVehicle", vehicleSchema);

module.exports = DeliveryVehicle;
