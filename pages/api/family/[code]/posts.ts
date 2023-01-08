import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import checkAuth, { ExtendedRequest } from "../../../../middleware/checkAuth";
import Family from "../../../../models/Family";
import Post from "../../../../models/Post";
import User from "../../../../models/User";

const handler = nextConnect()
  .use(checkAuth)
  .get(async (req: ExtendedRequest, res: NextApiResponse) => {
    const familyCode = req.query.code

    await dbConnect();

    try {
      const Posts = await Post.findOne()
      const user = await User.findOne()
      const family = await Family.findOne({ familyCode }).populate({
        path: "members",
        select: "fullname username",
      }).populate({
        path: "posts",
        // match: { isDeleted: false },
        populate: {
          path: "createdBy",
          select: "fullname username",
        },
        options: {
          sort: [[["createdAt", "desc"]]]
        }
      })

      // check if the user is a member of the family
      if (!family.members.some((member: any) => member._id == req.user._id)) {
        return res.status(403).json({
          status: "error",
          message: "Forbidden"
        });
      }

      if (family) {
        return res.status(200).json({
          status: "success",
          message: "Family is found",
          data: family,
        })
      } else {
        return res.status(204).json({
          status: "success",
          message: "Family is not found",
        })
      }
    } catch (err) {
      return res.status(500).json({
        status: "error",
        message: `Database query error: ${err}`,
      });
    }
  })

export default handler;