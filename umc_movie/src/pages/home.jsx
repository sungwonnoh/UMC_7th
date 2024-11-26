import useFetchData from "../hooks/useFetchData";
import Card from "../component/card";

export default function Home() {
  const {
    data: movies,
    isLoading,
    isError,
  } = useFetchData(`/movie/popular?language=ko-kr`);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load movies.</div>;

  return <Card movies={movies} />;
}
