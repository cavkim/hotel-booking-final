import { useQuery } from "@tanstack/react-query";
import { getRoom, getRoomDetail } from "@/api";

export const useRooms = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: getRoom,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useRoomDetail = (id, params = {}) => {
  return useQuery({
    queryKey: ["room", id, params],
    queryFn: () => getRoomDetail(params, id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
