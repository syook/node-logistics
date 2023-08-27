const express = require('express');
const router = express.Router();
const {createVechile, getVechiles, updateVechile, deleteVechile} = require('../controllers/deliveryVechiles.controller')

// Create a delivery vehicle
router.post('/delivery-vehicles', createVechile );

// Get all delivery vehicles
router.get('/delivery-vehicles', getVechiles );

// Update a delivery vehicle
router.put('/delivery-vehicles/:vehicleId', updateVechile );

// Delete a delivery vehicle
router.delete('/delivery-vehicles/:vehicleId',deleteVechile);

module.exports = router;
 