import { ApiResponse } from "../types/global"
import axios from "./axios"

class User {
  static async getAuthenticatedUser() {
    const response = await axios.get<ApiResponse<User>>("/users/me")
    return response.data.data
  }
}

export default User