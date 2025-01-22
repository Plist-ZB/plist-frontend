import { instance } from "@/services/api/instance";
import { useMutation } from "@tanstack/react-query";

export default function useSaveToFavorite() {
  const saveVIdeoToFavoriteMutation = useMutation({
    mutationFn: async (item: IVideo) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...data } = item;

      const response = await instance.post(`/user/favorite`, data);

      return response;
    },
    onSuccess: () => {
      console.log("SAVE_TO_FAVORITE_SUCCESS");
      return "SAVE_TO_FAVORITE_SUCCESS";
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { saveVIdeoToFavoriteMutation };
}
