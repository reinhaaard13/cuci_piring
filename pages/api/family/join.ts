import { NextApiResponse } from "next";
import nextConnect from "next-connect";
import dbConnect from "../../../lib/dbConnect";
import checkAuth, { ExtendedRequest } from "../../../middleware/checkAuth";
import Family from "../../../models/Family";
import User from "../../../models/User";
import mongoose from "mongoose";

const handler = nextConnect()
	.use(checkAuth)
	.post(async (req: ExtendedRequest, res: NextApiResponse) => {
		try {
			await dbConnect();
		} catch (error) {
			return res.status(500).json({
				status: "error",
				message: "Database connection error",
			});
		}

		const userId = req.body.userId;
		const familyCode = req.body.familyCode;

		if (userId !== req.user.id) {
			return res.status(401).json({
				status: "error",
				message: "Unauthorized",
			});
		}

		let user;
		try {
			user = await User.findById(userId);
		} catch (error) {
			return res.status(500).json({
				status: "error",
				message: "Database query error: " + error,
			});
		}

		try {
			const family = await Family.findOne({ familyCode }).populate({
				path: "members",
				select: "-password",
			});

			const session = await mongoose.startSession();
			session.startTransaction();

			family.members.push(userId);
			await family.save({ session });

			user.family = family._id;
			await user.save({ session });

			await session.commitTransaction();

			return res.status(200).json({
				status: "success",
				message: "User is added to family",
				data: family,
			});
		} catch (error) {
			return res.status(500).json({
				status: "error",
				message: "Database query error: " + error,
			});
		}
	});

export default handler;
