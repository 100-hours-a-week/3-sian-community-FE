import api from "../../../shared/api/axiosInstance";

export default async function getPostsRequest({ page = 0, size = 10 } = {}) {
  const res = await api.get("/posts", {
    params: { page, size },
  });

  return res.data.content;
}
