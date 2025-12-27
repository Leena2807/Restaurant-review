import express from "express"
import RestaurantsDAO from "../dao/restaurantsDAO.js";
import RestaurantsCtrl from "./restaurants.controller.js"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router()

router.route("/").get(RestaurantsCtrl.apiGetRestaurants)
router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById)
router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines)
router.route("/add").post(async (req, res) => {
  try {
    const restaurant = {
      name: req.body.name,
      cuisine: req.body.cuisine,
      borough: req.body.borough,
      address: {
        building: req.body.building,
        street: req.body.street,
        zipcode: req.body.zipcode
      }
    };

    const result = await RestaurantsDAO.addRestaurant(restaurant);

    res.status(201).json({ status: "success", restaurant: result });
  }  catch (e) {
  console.error("ADD RESTAURANT ERROR:", e);
  res.status(500).json({
    error: e.message,
    stack: e.stack
  });
}
});

router
  .route("/review")
  .post(ReviewsCtrl.apiPostReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview)

export default router
