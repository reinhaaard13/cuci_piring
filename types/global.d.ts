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
  id: string
  username: string
  fullname: string
}
