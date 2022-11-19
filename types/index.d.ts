import mongoose, { Connection, Mongoose } from "mongoose"

// declare module NodeJS {
//   interface Global {
//     mongoose: Connection
//   }
// }

declare global {
  var mongoose: {
    conn: Connection | null
    promise: Promise<Connection | mongoose> | null
  }
}

export {}