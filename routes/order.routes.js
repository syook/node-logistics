const express = require("express");
const router = express.Router();
const { createOrder, getOrdr, updateOrder, updateIsDeliver, deleteOrder} = require('../controllers/order.controller')
//Middleware 
// const getItemPrice = require('../middlewares/getItemDetails')

// Create a new order
router.post("/createorder", createOrder);

// Get all orders
router.get("/orders", getOrdr);

// update isDelivery 
router.put('/orders/:orderId/delivered', updateIsDeliver)

// Delete an order by ID
router.delete("/orders/:id", deleteOrder);

module.exports = router ;