// useFetchData.js
import { useEffect, useState } from "react";
import { axiosInstance } from "../apis/axios-instance";

export default function useFetchData(url) {
  const [data, setData] = useState([]); // 기본값을 빈 배열로 설정
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await axiosInstance.get(url);
        setData(response.data.results || []); // 응답 데이터가 배열인지 확인
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, isError };
}
