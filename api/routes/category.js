import express from "express";
import { UserModel } from "../models/Users.js";
import { CategoryModel } from "../models/Category.js";
import { PinModel } from "../models/Pins.js";

const router = express.Router();

router.get("/categories/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const cats = await CategoryModel.find({ categoryOwner: id }, null, {
			timeout: 50000,
		});

		if (cats === null) {
			return res
				.status(404)
				.json({ message: "No categories found" }, null, { timeout: 50000 });
		}

		res.json({ cats, message: "Categories found" });
	} catch (err) {
		console.error(err);
	}
});

router.post("/add/:id", async (req, res) => {
	try {
		const { categoryName } = req.body;
		const userId = req.params.id;

		// Find the user by ID
		const user = await UserModel.findById(userId);

		if (!user) {
			return res.json({ message: "User not found" });
		}

		// Check if the category name is provided
		if (!categoryName) {
			return res.json({ message: "Category name is required" });
		}

		// Check if the category already exists for the user
		const existingCategory = await CategoryModel.findOne({
			categoryOwner: user._id,
			name: categoryName,
		});

		if (existingCategory) {
			return res.json({ message: "Category already exists" });
		}

		// Create a new category and save it
		const newCategory = new CategoryModel({
			name: categoryName,
			categoryOwner: user._id,
		});

		await newCategory.save();
		res.json({ newCategory, message: "Category saved successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
});

router.get("/selectCategory/:name/:id", async (req, res) => {
	const { name, id } = req.params; // Update parameter names

	try {
		const user = await UserModel.findOne({ _id: id });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		console.log(name); // Update variable name

		const category = await CategoryModel.findOne({
			name: name, // Update variable name
			categoryOwner: user._id,
		});

		if (!category) {
			return res.status(404).json({ message: "Category not found" });
		}

		const pins = await PinModel.find({ pinCategory: category.name });
		if (pins.length === 0) {
			return res.status(404).json({ message: "No pins found" });
		}

		res.json({ pins, message: "Pins found" });
	} catch (err) {
		console.error(err);
	}
});

export { router as categoryRouter };
