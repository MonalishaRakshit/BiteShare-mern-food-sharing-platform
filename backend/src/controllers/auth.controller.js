/*in this file we write the logic for the routes APIs */
const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* register user API's controller */
async function registerUser(req, res) {
  const { fullName, emailAddress, PhoneNumber, password, confirmPassword } =
    req.body;

  const isUserAlreadyExists = await userModel.findOne({
    emailAddress,
  });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "Passwords do not match",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName,
    emailAddress,
    PhoneNumber,
    password: hashedPassword,
    confirmPassword: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "6h",
    },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      _id: user._id,
      email: user.emailAddress,
      fullName: user.fullName,
      PhoneNumber: user.PhoneNumber,
    },
  });
}

/* login user API's Controller */
async function loginUser(req, res) {
  const { emailAddress, password } = req.body;

  const user = await userModel.findOne({
    emailAddress,
  });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or Password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "6h",
    },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      _id: user._id,
      email: user.emailAddress,
      fullName: user.fullName,
    },
  });
}

/* logout user API's Controller */
function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out Successfully",
  });
}

/* register user for FoodPartner API's Controller */
async function registerFoodPartner(req, res) {
  const {
    ResturantName,
    OwnerName,
    emailAddress,
    PhoneNumber,
    ResturentAddress,
    password,
    confirmPassword,
  } = req.body;

  const isAccountAlreadyExists = await foodPartnerModel.findOne({
    emailAddress,
  });

  if (isAccountAlreadyExists) {
    return res.status(400).json({
      message: "Food partner account already exists",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "Passwords do not match",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const foodPartner = await foodPartnerModel.create({
    ResturantName,
    OwnerName,
    emailAddress,
    PhoneNumber,
    ResturentAddress,
    password: hashedPassword,
    confirmPassword: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: foodPartner._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "Food partner registered successfully",
    foodPartner: {
      _id: foodPartner._id,
      email: foodPartner.emailAddress,
      ResturantName: foodPartner.ResturantName,
      OwnerName: foodPartner.OwnerName,
      PhoneNumber: foodPartner.PhoneNumber,
      ResturentAddress: foodPartner.ResturentAddress,
    },
  });
}

/* login user for FoodPartner API's Controller */
async function loginFoodPartner(req, res) {
  const { emailAddress, password } = req.body;

  const foodPartner = await foodPartnerModel.findOne({
    emailAddress,
  });

  if (!foodPartner) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or Password",
    });
  }

  const token = jwt.sign(
    {
      id: foodPartner._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "6h",
    },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "Food Partner logged in successfully",
    user: {
      _id: foodPartner._id,
      email: foodPartner.emailAddress,
      ResturantName: foodPartner.ResturantName,
    },
  });
}

/* logout foodPartner API's Controller */
function logoutFoodPartner(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "Food partner logged out Successfully",
  });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};
