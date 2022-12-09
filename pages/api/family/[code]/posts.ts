import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import checkAuth, { ExtendedRequest } from "../../../../middleware/checkAuth";
import Family from "../../../../models/Family";
import Post from "../../../../models/Post";

const handler = nextConnect()
  .use(checkAuth)
  .get(async (req: ExtendedRequest, res: NextApiResponse) => {
    const familyCode = req.query.code

    try {
      await dbConnect();
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Database connection error",
      });
    }

    try {
      const Posts = await Post.findOne()
      const family = await Family.findOne({ familyCode }).populate({
        path: "members",
        select: "fullname username",
      }).populate({
        path: "posts",
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