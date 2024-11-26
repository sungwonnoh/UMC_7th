import { axiosInstance } from "../../apis/axios-instance";

const useGetMovies =
  ({ category, pageParam }) =>
  async () => {
    const { data } = await axiosInstance.get(
      `/movie/${category}?language=ko-KR&page=${pageParam}`
    );
    return data.results;
  };

export { useGetMovies };
