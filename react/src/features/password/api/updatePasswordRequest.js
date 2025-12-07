import api from "../../../shared/api/axiosInstance";

export default async function updatePasswordRequest(password, confirm) {
  const res = await api.patch("/users/me/password", {
    newPassword: password,
    newPasswordConfirm: confirm,
  });

  return res.data;
}
