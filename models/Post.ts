import { Schema, model, Types, models, Document } from "mongoose";
import { IFamily } from "./Family";
import { IUser } from "./User";

export interface IPost extends Document {
  postTitle: string
  postDescription: string
  createdBy: Types.ObjectId | IUser
  family: Types.ObjectId | IFamily
  createdAt: Date
  image: string
  likedBy: Types.ObjectId[] | IUser[]
}

const PostSchema = new Schema({
  postTitle: String,
  postDescription: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  family: {
    type: Schema.Types.ObjectId,
    ref: "Family",
  },
  image: {
    type: String,
  },
  likedBy: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  }
}, {
  timestamps: {
    updatedAt: false,
  }
})

export default models.Post || model("Post", PostSchema)