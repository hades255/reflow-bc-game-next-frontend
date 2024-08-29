import { useFetch } from "@/hooks/useFetch";
import { fetchAPI } from "./fetchAPI";

export const useUserInfo = () => {

  const { data, isLoading, error } = useFetch("/api/user", {
      method: "POST",
    }
  );
  
  return data;
};

export const apiBonusCode = async (code: string) =>{
  try {
    const response = await fetchAPI("/api/bonus/use", "POST", {
      code,
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
}
