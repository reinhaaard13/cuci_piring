import { NextApiRequest, NextApiResponse } from "next"
import nextConnect from "next-connect"
import dbConnect from "../../../../lib/dbConnect"


const handler = nextConnect()
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const familyCode = req.query.code

    try {
      await dbConnect()
    } catch (err) {
      return res.status(500).json({
        status: "error",
        message: "Database connection error",
      })
    }

  })

export default handler