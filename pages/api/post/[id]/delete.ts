import nextConnect from "next-connect";
import checkAuth, { ExtendedRequest } from "../../../../middleware/checkAuth";
import { NextApiResponse } from "next";
import dbConnect from "../../../../lib/dbConnect";
import Post from "../../../../models/Post";

const handler = nextConnect()
	.use(checkAuth)
	.delete(async (req: ExtendedRequest, res: NextApiResponse) => {
		const postId = req.query.id;
		const userId = req.user._id;

		try {
			await dbConnect();
		} catch (err: any) {
			return res
				.status(500)
				.json({ status: "error", message: "Error connecting to database" });
		}

    let post

		try {
			post = await Post.findById(postId);
			if (!post) {
				return res
					.status(404)
					.json({ status: "error", message: "Post not found" });
			}

      // console.log(post.createdBy.toString(), userId)

			if (post.createdBy.toString() !== userId) {
				return res
					.status(401)
					.json({ status: "error", message: "Unauthorized" });
			}

			post.isDeleted = true;

      await post.save();
		} catch (error: any) {
      return res.status(500).json({ status: "error", message: error.message });
    }

		return res
			.status(200)
			.json({ status: "success", message: "Post has been deleted" });
	});

export default handler;
