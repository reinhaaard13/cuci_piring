import axios, { AxiosError } from "axios";

export default axios.create({
	baseURL: "/api",
});

export function isAxiosError<ResponseType>(
	error: unknown
): error is AxiosError<ResponseType> {
	return axios.isAxiosError(error);
}
