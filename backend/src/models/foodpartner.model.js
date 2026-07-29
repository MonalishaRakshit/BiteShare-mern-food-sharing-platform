const mongoose = require("mongoose");

const foodPartnerSchema = new mongoose.Schema({
  ResturantName: {
    type: String,
    required: true,
  },

  OwnerName: {
    type: String,
    required: true,
  },

  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },

  PhoneNumber: {
    type: String,
    required: true,
  },

  ResturentAddress: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  confirmPassword: {
    type: String,
    required: true,
  },
});

const foodPartnerModel = mongoose.model("foodpartner", foodPartnerSchema);

module.exports = foodPartnerModel;
