import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({
      status: "error",
      message: "Method not allowed",
    });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      status: "error",
      message: "Bad request",
    });
  }

  try {
    await dbConnect()

    const user = await User.findOne({ username }).select("+password")
    
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "User not found!",
      })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
      return res.status(400).json({
        status: "error",
        message: "Invalid credentials",
      })
    }

    const token = jwt.sign({
      id: user._id,
      username: user.username,
      fullname: user.fullname,
    }, process.env.JWT_SECRET!, {
      expiresIn: "1d"
    })

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        accessToken: token
      },
    })
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Login failed. Internal server error.",
    })
  }
}