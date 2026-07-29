const foodModel = require("../models/food.model");
const likeModel = require("../models/likes.model");
const saveModel = require("../models/save.model");
const commentModel = require("../models/comment.model");
const storageService = require("../services/storage.service");
const { v7: uuid } = require("uuid");

/* controller for create fooditems */
async function createFood(req, res) {
  //console.log(req.foodPartner);

  //console.log(req.body);
  //console.log(req.file);

  const fileUploadResult = await storageService.uploadFile(
    req.file.buffer,
    uuid(),
  );

  const foodItem = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id,
  });

  console.log(fileUploadResult);

  return res.status(201).json({
    message: "food created successfully",
    food: foodItem,
  });

  // res.send("food item created");
}

/* controller for get fooditems */
async function getFoodItems(req, res) {
  const fooditems = await foodModel.find({});
  res.status(200).json({
    message: "Food items fetched successfully",
    fooditems,
  });
}

/* controller for like food items */
async function likeFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadyLiked = await likeModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isAlreadyLiked) {
    await likeModel.deleteOne({
      user: user._id,
      food: foodId,
    });

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { likeCount: -1 },
    });

    return res.status(200).json({
      message: "Food unliked Successfully",
    });
  }

  const like = await likeModel.create({
    user: user._id,
    food: foodId,
  });

  await foodModel.findByIdAndUpdate(foodId, {
    $inc: { likeCount: 1 },
  });

  res.status(201).json({
    message: "Food liked successfully",
    like,
  });
}

/* controller for save food items */
async function saveFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadySaved = await saveModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isAlreadySaved) {
    await saveModel.deleteOne({
      user: user._id,
      food: foodId,
    });

    return res.status(200).json({
      message: "Food unsaved Successfully",
    });
  }

  const save = await saveModel.create({
    user: user._id,
    food: foodId,
  });

  res.status(201).json({
    message: "Food saved successfully",
    save,
  });
}

/* controller for get saved food items */
async function getSavedFoods(req, res) {
  try {
    const user = req.user;

    const savedFoods = await saveModel
      .find({ user: user._id })
      .populate("food");

    const foods = savedFoods.map((item) => item.food);

    return res.status(200).json({
      message: "Saved foods fetched successfully",
      foods,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

/* controller for add comment */
async function addComment(req, res) {
  try {
    const { foodId, text } = req.body;
    const user = req.user;

    // Prevent empty comments
    if (!text || text.trim() === "") {
      return res.status(400).json({
        message: "Comment cannot be empty",
      });
    }

    const comment = await commentModel.create({
      user: user._id,
      food: foodId,
      text,
    });

    // Increase comment count
    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { commentCount: 1 },
    });

    res.status(201).json({
      message: "Comment added successfully",
      comment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

/* controller for get comments */
async function getComments(req, res) {
  try {
    const { foodId } = req.params;

    const comments = await commentModel
      .find({ food: foodId })
      .populate("user", "fullName username name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Comments fetched successfully",
      comments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  createFood,
  getFoodItems,
  likeFood,
  saveFood,
  getSavedFoods,
  addComment,
  getComments,
};
