import { Schema, model, Types, models, Document } from "mongoose";
import { IFamily } from "./Family";
import { IUser } from "./User";

export interface IPost extends Document {
  postTitle: string
  postDescription: string
  createdBy: Types.ObjectId | IUser
  family: Types.ObjectId | IFamily
  createdAt: Date | string
  image: string
  likedBy: Types.ObjectId[] | IUser[]
  isDeleted: boolean
}

const PostSchema = new Schema<IPost>({
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
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: {
    updatedAt: false,
  },
})

PostSchema.pre("find", function () {
  this.where({ isDeleted: false });
})

PostSchema.pre("findOne", function () {
  this.where({ isDeleted: false });
})

export default models.Post || model("Post", PostSchema)