import mongoose from "mongoose";

const collectionName = "pin_category";

const CategorySchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	categoryOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const CategoryModel = mongoose.model(collectionName, CategorySchema);
