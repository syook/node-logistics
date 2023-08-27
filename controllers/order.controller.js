const mongoose = require("mongoose");
const Order = require("../models/Orders");
const Item = require("../models/Item");
const createOrder = async (req, res) => {
  try {
    const { itemId, customerId, deliveryVehicleId } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(itemId) ||
      !mongoose.Types.ObjectId.isValid(customerId) ||
      !mongoose.Types.ObjectId.isValid(deliveryVehicleId)
    ) {
      return res.status(400).json({ message: "Invalid ObjectId values" });
    }

    const itemPrice = await Item.findById(itemId);

    if (!itemPrice || !itemPrice.price) {
      return res.status(400).json({ message: "Item price not found" });
    }

    const orderDetails = {
      itemId,
      price: itemPrice.price,
      customerId,
      deliveryVehicleId,
    };
    const newOrder = await Order.create(orderDetails);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "An error occurred" });
  }
};

// Get all orders
const getOrdr = async (req, res) => {
  try {
    const orders = await Order.findById({_id : req.params.id});
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//Api for update the isDeleiverd true if item was deliverd 
const updateIsDeliver = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    // Find the order by its ID and update isDelivered to true
    const order = await Order.findByIdAndUpdate(
      orderId,
      { $set: { isDelivered: true } },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Find the associated delivery vehicle
    const deliveryVehicle = await DeliveryVehicle.findById(order.deliveryVehicleId);

    if (!deliveryVehicle) {
      return res.status(404).json({ message: 'Delivery vehicle not found' });
    }

    if (deliveryVehicle.activeOrdersCount > 0) {
      deliveryVehicle.activeOrdersCount--;
      await deliveryVehicle.save();
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};


// Delete an order by ID
const deleteOrder = async (req, res) => {
  try {
    const deleteOrder = await Order.deleteOne({ _id: req.params.id });
    if (!deleteOrder) {
      return res.status(404).json({
        error: "Todo not found",
      });
    }
    res.status(200).json({
      message: "Order deleted successfully!",
      deletedOrder: deleteOrder,
    });
  } catch (error) {
    res.status(500).json({
      error: "There was a server-side error",
    });
  }
};

module.exports = {
  createOrder,
  getOrdr,
  deleteOrder,
  updateIsDeliver
};
