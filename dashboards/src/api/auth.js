import { api } from "@/config";

const postLogin = async (params) => {
  const response = await api.post("v1/auth/login", params);
  return response.data;
};

export default postLogin;
