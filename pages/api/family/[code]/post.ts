import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import checkAuth, { ExtendedRequest } from "../../../../middleware/checkAuth";
import Post, { IPost } from "../../../../models/Post";
import mongoose from "mongoose";
import Family, { IFamily } from "../../../../models/Family";

const handler = nextConnect()
	.use(checkAuth)
	.post(async (req: ExtendedRequest, res: NextApiResponse) => {
		const familyCode = req.query.code;

		await dbConnect();

		const { postTitle, postDescription, image, familyId, userId } = req.body;

		if (userId !== req.user._id) {
			return res.status(403).json({
				status: "error",
				message: "Forbidden",
			});
		}

		// check if family exists
		let family: IFamily | null;
		try {
			family = await Family.findOne({
				familyCode: familyCode,
			});
			if (!family) {
				return res.status(404).json({
					status: "error",
					message: "Family not found",
				});
			}
		} catch (err: any) {
			return res.status(500).json({
				status: "error",
				message: "Internal server when checking family: " + err.message,
			});
		}

		// check if the user is a member of the family
		if (!family.members.includes(userId)) {
			return res.status(403).json({
				status: "error",
				message: "Forbidden",
			});
		}

		try {
			const session = await mongoose.startSession();
			session.startTransaction();
			const newPost = new Post({
				postTitle,
				postDescription,
				image,
				family: family,
				createdBy: userId,
			});
			await newPost.save({ session });
			family.posts.push(newPost._id);
			await family.save({
				session,
			});
			await session.commitTransaction();

			return res.status(201).json({
				status: "success",
				message: "Post created successfully",
				data: newPost,
			});
		} catch (err: any) {
			return res.status(500).json({
				status: "error",
				message: "Internal when creating post: " + err.message,
			});
		}
	});

export default handler;
