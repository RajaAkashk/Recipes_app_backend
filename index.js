const Recipes = require("./models/recipe.model");
const express = require("express");
const initializeDatabase = require("./db/db.connect");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

initializeDatabase();

app.get("/recipes", async (req, res) => {
  try {
    const allRecipes = await Recipes.find();
    if (!allRecipes) {
      return res.status(404).json({ message: "Recipes not found" });
    }
    res
      .status(200)
      .json({ message: "All recipes fetched successfully.", allRecipes });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recipies", error });
  }
});

app.get("/recipe/:id", async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found." });
    }
    res.status(200).json({ message: "Recipe fetched successfully.", recipe });
  } catch (error) {
    res.status(500).json({ message: "Error in fetching recipie", error });
  }
});

app.post("/recipe", async (req, res) => {
  try {
    const newRecipe = new Recipes(req.body);
    const savedRecipe = await newRecipe.save();

    res
      .status(201)
      .json({ message: "New recipe added successfully.", savedRecipe });
  } catch (error) {
    res.status(500).json({ message: "Error in adding new recipe.", error });
  }
});

app.delete("/recipe/:id", async (req, res) => {
  try {
    const recipe = await Recipes.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found." });
    }
    res.status(200).json({ message: "Recipe deleting successfully.", recipe });
  } catch (error) {
    res.status(500).json({ message: "Error in deleted recipie", error });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));
module.exports = app;
