const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: { type: String, required: true },
  instructions: { type: String, required: true },
  cuisine: { type: String, required: true },
  dishImage: { type: String, required: true },
});

const Recipe = mongoose.model("recipe_app_recipies", recipeSchema);

module.exports = Recipe;
