import { Schema, model, Types, models, Document } from "mongoose";

export interface IFamily extends Document {
  familyName: string
  familyBio: string
  createdAt: Date
  createdBy: Types.ObjectId
  members: Types.ObjectId[]
}

const FamilySchema = new Schema({
  familyName: String,
  familyBio: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  ]
}, {
  timestamps: {
    updatedAt: false
  }
})

export default models.Family || model('Family', FamilySchema)