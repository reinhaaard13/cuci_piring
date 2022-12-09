import { NewPostPayload } from "../types/payload";
import axios from "./axios";
import axiosOri from "axios";

class PostApi {
  static async getFamilyWithPosts(familyCode: string) {
    const response = await axios.get(`/family/${familyCode}/posts`);
    return response.data;
  }

  static async likePost(postId: string) {
    const response = await axios.post(`/post/${postId}/like`)
    return response.data;
  }

  static async createNewPost(post: NewPostPayload) {
    let imageUrl;
    if (post.image) {
      const formData = new FormData()
      formData.append("file", post.image)
      formData.append("upload_preset", "cucipiring")

      const imageResponse = await axiosOri.post(
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

    const response = await axios.post(`/family/${post.familyId}/post`, {
      ...post,
      image: imageUrl,
    })

    return response.data;
  }
}

export default PostApi;