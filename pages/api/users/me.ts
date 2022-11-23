import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({
      status: "error",
      message: "Method not allowed"
    });
  }

  const { authorization } = req.headers;
  const token = authorization?.split(" ")[1];
  // ? Token is not provided yet

  try {
    
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
}