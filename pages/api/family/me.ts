import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import dbConnect from "../../../lib/dbConnect";
import checkAuth, { ExtendedRequest } from "../../../middleware/checkAuth";
import Family from "../../../models/Family";

const handler = nextConnect()
	.use(checkAuth)
	.get(async (req: ExtendedRequest, res: NextApiResponse) => {
		try {
			await dbConnect();
		} catch (err) {
			return res.status(500).json({
				status: "error",
				message: "Failed to connect to database",
			});
		}

		try {
			const family = await Family.find({ members: req.user.id });
      if (!family) {
        return res.status(204).json({
          status: "success",
          message: "Family not found",
        });
      }
			return res.status(200).json({
				status: "success",
				message: "Family fetched successfully",
				data: family,
			});
		} catch (err) {
			return res.status(500).json({
				status: "error",
				message: "Failed to get family",
			});
		}
	});

export default handler
