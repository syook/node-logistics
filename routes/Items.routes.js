const express = require("express");
const router = express.Router();
const { findItem, createItem, updateItem, deleteItem } = require("../controllers/items.controller");
// Middleware
// const checkLogin = require('../middlewares/checkLogin')

// To find the items
router.get("/:id", findItem);

// To create Item
router.post("/", createItem);

// To update the Item
router.patch('/update/:id', updateItem);

// To delete item 
router.delete('/delete/:id', deleteItem);
  
// Exporting Routes
module.exports = router;
