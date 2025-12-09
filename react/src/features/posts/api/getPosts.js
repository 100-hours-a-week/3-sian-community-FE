import api from "../../../shared/api/axiosInstance";

export default async function getPosts({ page = 0, size = 10 } = {}) {
  const res = await api.get("/posts", {
    params: { page, size },
  });

  return res.data.data.content;
}
