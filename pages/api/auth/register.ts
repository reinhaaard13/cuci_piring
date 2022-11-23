import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import bcrypt from "bcrypt";
import User from "../../../models/User";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		return res.status(405).json({
			message: "Method not allowed",
		});
	}

	const { fullname, username, password } = req.body;

	if (!fullname || !username || !password) {
		return res.status(400).json({
			message: "Bad request",
		});
	}

  let hashedPassword
  try {
    hashedPassword = await bcrypt.hash(password, 10)
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Bcrypt password hashing failed",
    })
  }

	try {
    await dbConnect();

    const user = await User.create({
      fullname,
      username,
      password: hashedPassword,
    })

    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: user,
    })
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "User creation failed",
    })
  }
}
