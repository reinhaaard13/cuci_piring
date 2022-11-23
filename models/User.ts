import { Types, model, models, Schema } from "mongoose";

export interface IUser extends Document {
  fullname: string;
  username: string;
  password: string;
  createdAt: Date;
  family: Types.ObjectId;
}

const UserSchema = new Schema<IUser>({
  fullname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  family: {
    type: Schema.Types.ObjectId,
    ref: "Family",
  }
}, {
  timestamps: {
    updatedAt: false
  }
})

export default models.User || model('User', UserSchema)