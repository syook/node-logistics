const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  deliveryVehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeliveryVehicle",
    required: true,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
});
// Mongoose pre hooks
orderSchema.pre("save", async function (next) {
  const lastOrder = await Order.findOne({}, {}, { sort: { orderNumber: -1 } });
  const lastOrderNumber = lastOrder ? parseInt(lastOrder.orderNumber) : 0;
  this.orderNumber = (lastOrderNumber + 1).toString().padStart(4, "0");
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
