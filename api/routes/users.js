import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { UserModel } from "../models/Users.js";

const router = express.Router();

//signup
router.post("/signup", async (req, res) => {
	const { firstName, lastName, username, password, imageUrl } = req.body;
	const user = await UserModel.findOne({ username }, null, { timeout: 50000 });

	if (user) return res.status(400).json({ message: "User already exist" });

	// const userRemoveWhite = username.replace(/\s/g, "");
	// const passRemoveWhite = password.replace(/\s/g, "");

	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = new UserModel({
		firstName,
		lastName,
		username,
		password: hashedPassword,
		imageUrl,
	});

	await newUser.save();
	res.json({ newUser, message: "User saved successfully" });
});

//login

router.post("/login", async (req, res) => {
	const { username, password } = req.body;

	const user = await UserModel.findOne({ username }, null, { timeout: 50000 });

	if (!user) return res.json({ message: "User not found!" });

	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid)
		return res.json({ message: "Username or password incorrect" });

	const token = jwt.sign({ id: user._id }, "secret");
	res.json({ token, userID: user._id, message: "User logged in successfully" });
});

//login with google
router.post("/googleLogin", async (req, res) => {
	try {
		const { firstName } = req.body;

		const user = await UserModel.findOne({ firstName });
		if (!user) return res.status(404).json({ message: "User not found!" });

		const token = jwt.sign({ id: user._id }, "secret");
		res.json({
			token,
			userID: user._id,
			message: "User logged in successfully",
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//add profile photo
router.put("/photo/:id", async (req, res) => {
	try {
		const user = await UserModel.findByIdAndUpdate(
			req.params.id,
			{
				imageUrl: req.body.imageUrl,
			},
			{ new: true }
		);
		res.json(user);
	} catch (err) {
		res.json(err.message);
	}
});

// gets the first name
router.get("/firstname/:id", async (req, res) => {
	try {
		const user = await UserModel.findById(req.params.id);
		res.json(user.firstName);
	} catch (err) {
		res.json(err.message);
	}
});

//gets the image link
router.get("/image/:id", async (req, res) => {
	try {
		const user = await UserModel.findById(req.params.id);
		res.json(user.imageUrl);
	} catch (err) {
		res.json(err.message);
	}
});

//change password
router.put("/change-password/:id", async (req, res) => {
	try {
		const user = await UserModel.findByIdAndUpdate(
			req.params.id,
			{
				password: await bcrypt.hash(req.body.password, 10),
			},
			{ new: true }
		);
		res.status(200).json(user);
	} catch (e) {
		console.log(e);
	}
});

export { router as userRouter };
