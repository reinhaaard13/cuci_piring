import { CreateFamilyPayload, JoinFamilyPayload } from "../types/payload";
import axios from "./axios"; // axios instance yang udah ada defaults
import newAxios from "axios"; // axios baru
import { QueryKey } from "react-query";

class FamilyApi {
	static async getFamily() {
		return axios.get("/family");
	}

	static async getMyFamily() {
		const response = await axios.get("/family/me");
		return response.data;
	}

	static async getFamilyByCode({ queryKey }: { queryKey: any }) {
		const [_key, { searchQuery }] = queryKey;

		const response = await axios.get(`/family/${searchQuery}`);
		return response.data;
	}

	static async joinFamily(payload: JoinFamilyPayload) {
		const response = await axios.post("/family/join", {
			...payload
		});
		return response.data;
	}

	static async createFamily(family: CreateFamilyPayload) {
		const image = family.image;

		let imageUrl; // Soon to be the URL of the image

		if (image) {
			const formData = new FormData();
			formData.append("file", image);
			formData.append("upload_preset", "cucipiring");

			const imageResponse = await newAxios.post(
				"https://api.cloudinary.com/v1_1/reinhaaard/image/upload",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			imageUrl = imageResponse.data.secure_url;
		}

		const response = await axios.post("/family", {
			...family,
			image: imageUrl,
		});
		return response.data;
	}
}

export default FamilyApi;
