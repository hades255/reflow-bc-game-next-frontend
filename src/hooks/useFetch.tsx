import { useState, useEffect, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useToken } from "@/redux/slices/main/authSlice";

export const useFetch = (url: string, options?: AxiosRequestConfig) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const token = useToken();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response: AxiosResponse = await axios(
        `${process.env.NEXT_PUBLIC_API_HOST}${url}`,
        {
            ...options,
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        }
      );
      setData(response.data);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error };
};
