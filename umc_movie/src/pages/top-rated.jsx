import { ClipLoader } from "react-spinners";
import Card from "../component/card";
import { useGetMovies } from "../hooks/queries/useGetMovies";
import { useQuery } from "@tanstack/react-query";

export default function NowPlaying() {
  const { data, loading, error } = useQuery({
    queryFn: useGetMovies({ category: "top_rated", pageParam: 1 }),
    queryKey: ["movies", "top_rated"],
    cacheTime: 10000,
    staleTime: 10000,
  });

  console.log(data);

  if (loading)
    return (
      <LoadingWrapper>
        <ClipLoader color="black" loading={loading} size={50} />
      </LoadingWrapper>
    );
  if (error) return <div>{error}</div>;
  return <Card movies={data || []} />;
}
