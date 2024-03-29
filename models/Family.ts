import { Schema, model, Types, models, Document } from "mongoose";
import generateFamilyCode from "../utils/generateFamilyCode";
import { IPost } from "./Post";
import { IUser } from "./User";

export interface IFamily extends Document {
	familyCode: string;
	familyName: string;
	familyBio: string;
	image: string;
	createdAt: Date;
	createdBy: Types.ObjectId | IUser;
	members: Types.ObjectId[] | FamilyMembers[];
	posts: Types.ObjectId[] | IPost[];
}

export interface FamilyMembers {
	_id: string;
	fullname: string;
	username: string;
	alias?: string;
}

const FamilySchema = new Schema<IFamily>(
	{
		familyName: String,
		familyBio: String,
		familyCode: {
			type: String,
			unique: true,
		},
		image: {
			type: String,
			default:
				"https://res.cloudinary.com/reinhaaard/image/upload/v1669985457/cucipiring/AAAABccy9cHO9eTuoKhAaLJ8RdOlomk3aYmdW5U7t-4ImBCCV9Rn6d1PYwLbfmUwWA81U1NZV0_RTcyEwe8IOCovkB51uXYq_dzkcvh.jpg",
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		members: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
		posts: [
			{
				type: Schema.Types.ObjectId,
				ref: "Post",
			},
		],
	},
	{
		timestamps: {
			updatedAt: false,
		},
	}
);

export default models.Family || model("Family", FamilySchema);
