import axios, { AxiosError } from "axios";

export default axios.create({
	baseURL: "http://localhost:3000/api",
});

export function isAxiosError<ResponseType>(
	error: unknown
): error is AxiosError<ResponseType> {
	return axios.isAxiosError(error);
}
