import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import checkAuth from "../../../../middleware/checkAuth";
import Family from "../../../../models/Family";

const handler = nextConnect()
  .use(checkAuth)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
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
      const family = await Family.findOne({ familyCode }).populate({
        path: "members",
        select: "fullname username",
      })
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