const Customer = require("../models/Customers");

// Save the user data to Database
const saveData = async (req, res) => {
  try {
    const newUser = new Customer({
      name: req.body.name,
      city: req.body.city,
    });
    await newUser.save();
    res.status(200).json({
      message: "Signup was successful!", user : newUser
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "An error occurred during signup.",
    });
  }
};

module.exports = {
  saveData,
};
