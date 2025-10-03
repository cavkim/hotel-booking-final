// import { api } from "@/config";

// const postLogin = async (params) => {
//   const response = await api.post("api/v1/auth/login", params);
//   return response.data;
// };

// export default postLogin;

import { api } from "@/config";

const postLogin = async (params) => {
  const response = await api.post("api/v1/auth/login", params);
  // Return the full response so useLogin can access response.data
  return response;
};

export default postLogin;
