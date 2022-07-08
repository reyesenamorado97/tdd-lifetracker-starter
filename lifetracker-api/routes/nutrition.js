/// DOUBLE CHECK THIS
const express = require("express");
const router = express.Router();
const Nutrition = require("../models/nutrition");
const security = require("../middleware/security");
//const { NotFoundError } = require("../utils/errors")


router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { user } = res.locals;
    const nutrition = await Nutrition.createNutrition({user, nutrition: req.body,});
    return res.status(201).json({ nutrition });
  } catch (err) {
    next(err);
  }
});

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { user } = res.locals;
    const nutrition = await Nutrition.listNutritionForUser({ user });
    return res.status(200).json({ nutrition });
  } catch (err) {
    next(err);
  }
});

router.get("/id/:nutritionId", security.requireAuthenticatedUser, async(req, res, next) => {
  try{
      const nutrition = await Nutrition.fetchNutritionById(Number(req.params.nutritionId))
      return res.status(200).json({nutrition})
  }catch(err){
      next(err)
  }
})

router.get("/categories", security.requireAuthenticatedUser, async(req, res, next) => {
  try {
    const { user } = res.locals;

      const categories = await Nutrition.getCategoriesForUser({user})
      return res.status(200).json({categories})
  } catch (err) {
      next(err)
  }
})

router.get("/calories", security.requireAuthenticatedUser, async(req, res, next) => {
  try {
    const { user } = res.locals;

      const dailyCalories = await Nutrition.getDailyCalories({user})
      return res.status(200).json({dailyCalories})
  } catch (err) {
      next(err)
  }
})

module.exports = router;