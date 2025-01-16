import { instance } from "@/services/api/instance";
import { useQuery } from "@tanstack/react-query";

// API 호출 함수 (유저 정보 가져오기)
const fetchUserData = async () => {
  try {
    const response = await instance.get("/user/profile");

    console.log(response);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 유저 정보를 가져오는 React Query 훅
export function useGetUserData(accessToken: string) {
  return useQuery({
    queryKey: ["userData", accessToken],
    queryFn: () => fetchUserData(),
    enabled: !!accessToken, // accessToken이 있을 때만 쿼리 실행
  });
}
