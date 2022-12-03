import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Family from "../../../models/Family";
import mongoose from "mongoose";

import nextConnect from "next-connect";
import checkAuth, { ExtendedRequest } from "../../../middleware/checkAuth";
import generateFamilyCode from "../../../utils/generateFamilyCode";
import User from "../../../models/User";

const handler = nextConnect()
  .use(checkAuth)
  .post(
	async (req: ExtendedRequest, res: NextApiResponse) => {
		try {
			await dbConnect();
		} catch (e) {
			console.log(e);
			return res.status(500).json({
				status: "error",
				message: "Failed to connect to database",
			});
		}

		const family = req.body;

		try {
			const session = await mongoose.startSession();
			session.startTransaction();

			const newFamily = new Family({
        ...family,
        createdBy: req.user._id,
      });
      newFamily.members.push(req.user._id);
			newFamily.familyCode = generateFamilyCode(newFamily.familyName);
      await newFamily.save({ session });

			const user = await User.findById(req.user._id);
			user.family.push(newFamily._id);
			await user.save({ session });

			await session.commitTransaction();
			
			return res.status(201).json({
				status: "success",
				message: "Family created successfully",
				data: newFamily,
			});
		} catch (error: any) {
			return res.status(500).json({
				status: "error",
				message: `Failed to create family: ${error.message}`,
			});
		}
	}
)

export default handler;
