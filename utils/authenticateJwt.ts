import jwt from "jsonwebtoken";

export function authenticateJwt(token: string) {
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!);
    return user;
  } catch (err) {
    console.log("e: ", err)
    return null;
  }
}