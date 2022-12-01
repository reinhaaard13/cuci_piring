import { NextApiRequest, NextApiResponse } from "next";

import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({
      status: "error",
      message: "Method not allowed"
    });
  }

  const { authorization } = req.headers;
  const token = authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "Token is not provided!"
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
    return res.status(200).json({
      status: "success",
      message: "User data retrieved successfully",
      data: decodedToken
    })
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "Token is invalid!"
    });
  }
}