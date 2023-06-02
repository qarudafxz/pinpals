import express from "express";

import { PinModel } from "../models/Pins.js";

const router = express.Router();

router.post("/add-pin", async (req, res) => {
	const { pinName, pinLink, pinOwner, pinCategory } = req.body;
	const newPin = new PinModel({
		pinName,
		pinLink,
		pinOwner,
		pinCategory,
	});

	await newPin.save();
	res.json({ newPin, message: "Pin saved successfully" });
});

//get all pins by the specific user
router.get("/all/:id", async (req, res) => {
	try {
		const pin = await PinModel.find({ pinOwner: req.params.id });
		res.json(pin);
	} catch (err) {
		res.json({ message: "No such pins and user" });
	}
});

//deleting a pin
router.delete("/delete/:id", async (req, res) => {
	try {
		const removedPin = await PinModel.deleteOne({ _id: req.params.id });
		res.json(removedPin);
	} catch (err) {
		res.json({ message: err });
	}
});

export { router as pinsRouter };
