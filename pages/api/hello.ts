// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

type Data = {
	user: {
		name: string;
		email: string;
		_id: string;
		__v: number;
	};
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	await dbConnect();

	let user;
	try {
		user = await User.create({
			name: "Daniel Mustakim",
			email: "daniel@gmail.com",
		});
	} catch {}

	return res.status(200).json({ user });
}
