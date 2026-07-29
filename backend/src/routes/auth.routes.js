const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

/* register user API */
router.post("/user/register", authController.registerUser);

/* Login user API */
router.post("/user/login", authController.loginUser);

/* Logout user API */
router.get("/user/logout", authController.logoutUser);

/* register foodPartner API */
router.post("/food-partner/register", authController.registerFoodPartner);

/* login foodPartner API */
router.post("/food-partner/login", authController.loginFoodPartner);

/* logout foodPartner API */
router.get("/food-partner/logout", authController.logoutFoodPartner);

module.exports = router;
