import { NextApiResponse } from "next";
import { AccessToken, ApiResponse } from "../types/global";
import { LoginPayload, RegisterPayload } from "../types/payload";
import axios from "./axios";

class AuthApi {
	static async register(payload: RegisterPayload) {
		const response = await axios.post<ApiResponse>(
			"/auth/register",
			payload
		);
		return response.data;
	}

	static async login(payload: LoginPayload) {
		const response = await axios.post<
			ApiResponse<{ accessToken: AccessToken }>
		>("/auth/login", payload);
		return response.data;
	}
}

export default AuthApi;
