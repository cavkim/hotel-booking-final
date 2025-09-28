import { api } from "@/config";

export const getRoom = async () => {
  try {
    const response = await api.get("/v1/rooms");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch rooms");
  }
};

export const getRoomDetail = async (params = {}, id) => {
  try {
    const response = await api.get(`/v1/rooms/${id}`, {
      ...params,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch room");
  }
};
