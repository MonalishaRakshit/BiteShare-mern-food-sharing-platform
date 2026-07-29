const express = require("express");
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const multer = require("multer");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

/* POST /api/food/ [protected] */
router.post(
  "/",
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("video"),
  foodController.createFood,
);

/* GET /api/food/ [protected] */
router.get("/", authMiddleware.authUserMiddleware, foodController.getFoodItems);

/* POST /api/food/like [protected] */
router.post(
  "/like",
  authMiddleware.authUserMiddleware,
  foodController.likeFood,
);

/* POST /api/food/save [protected] */
router.post(
  "/save",
  authMiddleware.authUserMiddleware,
  foodController.saveFood,
);

/* GET /api/food/saved [protected] */
router.get(
  "/saved",
  authMiddleware.authUserMiddleware,
  foodController.getSavedFoods,
);

/* POST /api/food/comment [protected] */
router.post(
  "/comment",
  authMiddleware.authUserMiddleware,
  foodController.addComment,
);

/* GET /api/food/:foodId/comments [protected] */
router.get(
  "/:foodId/comments",
  authMiddleware.authUserMiddleware,
  foodController.getComments,
);

module.exports = router;
