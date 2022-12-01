import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Family from "../../../models/Family";

import nextConnect from "next-connect";
import checkAuth, { ExtendedRequest } from "../../../middleware/checkAuth";

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
			const newFamily = await Family.create({
        ...family,
        createdBy: req.user.id,
      });
      newFamily.members.push(req.user.id);
      await newFamily.save();
			return res.status(201).json({
				status: "success",
				message: "Family created successfully",
				data: newFamily,
			});
		} catch (error) {
			return res.status(500).json({
				status: "error",
				message: "Failed to create family",
			});
		}
	}
)

export default handler;
