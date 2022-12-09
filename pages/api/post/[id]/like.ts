import { NextApiResponse } from "next";
import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import checkAuth, { ExtendedRequest } from "../../../../middleware/checkAuth";
import Post from "../../../../models/Post";

const handler = nextConnect()
	.use(checkAuth)
	.post(async (req: ExtendedRequest, res: NextApiResponse) => {
		const postId = req.query.id;
		const userId = req.user._id;

		await dbConnect();

		try {
      const post = await Post.findById(postId)
      if (!post) {
        return res
          .status(404)
          .json({ status: "error", message: "Post not found" });
      }
      if (post.likedBy.includes(userId)) {
        return res
          .status(201)
          .json({ status: "success", message: "OK Again" });
      }

      post.likedBy.push(userId)
      await post.save()

      return res.status(200).json({ status: "success", message: "OK" });
		} catch (err: any) {
			return res
				.status(500)
				.json({ status: "error", message: "Server error: " + err.message });
		}
	});

export default handler;
