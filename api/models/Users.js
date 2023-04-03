import mongoose from "mongoose";

const collectionName = "users_data";

const UserSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	imageUrl: { type: String, required: false },
});

export const UserModel = mongoose.model(collectionName, UserSchema);
