import mongoose from "mongoose";

const collectionName = "pins";

const PinSchema = new mongoose.Schema({
	pinName: { type: String, required: true },
	pinLink: { type: String, required: true },
	pinOwner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users_datas",
		required: true,
	},
	pinCategory: {
		type: String,
		required: true,
	},
});

export const PinModel = mongoose.model(collectionName, PinSchema);
