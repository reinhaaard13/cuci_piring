import mongoose, { Connection, Mongoose } from "mongoose"

declare global {
  var mongoose: {
    conn: Connection | null
    promise: Promise<Connection | mongoose> | null
  }
}

declare interface ApiResponse<Data = undefined> {
  status: string
  message: string
  data: Data
}

declare type AccessToken = string

declare interface User {
  _id: string
  username: string
  fullname: string
}

declare interface Keluarga {
  _id: string
  familyName: string
  familyBio: string
  image: string
  createdBy: User | string
  createdAt: Date
  familyCode: string
  members: User[] | string[]
}