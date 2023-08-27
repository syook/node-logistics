const express = require("express");

const router = express.Router();

// controller
const { saveData } = require("../controllers/customer.controller");
// Signup Route
router.post("/signup", saveData);

module.exports = router;
