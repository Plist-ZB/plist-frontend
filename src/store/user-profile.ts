import { atomWithQuery } from "jotai-tanstack-query";
import { fetchUserData } from "@/pages/auth/hooks/useGetUserData";

export const userProfileAtom = atomWithQuery(() => ({
  queryKey: ["userProfile", localStorage.getItem("access_token")],
  queryFn: () => fetchUserData(),
  enabled: !!localStorage.getItem("access_token"),
}));
