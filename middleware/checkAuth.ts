import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { authenticateJwt } from "../utils/authenticateJwt";

export interface ExtendedRequest extends NextApiRequest {
	user: any;
}

export default nextConnect().use(
	(req: ExtendedRequest, res: NextApiResponse, next) => {
		let authHeader = req.headers.authorization;

		if (!authHeader) {
			return res.status(401).json({
				status: "error",
				message: "No authorization header",
			});
		}

		const token = authHeader.split(" ")[1];
		const user = authenticateJwt(token);

		if (!user) {
			return res.status(401).json({
				status: "error",
				message: "Invalid token",
			});
		}

		req.user = user;

		next();
	}
);
