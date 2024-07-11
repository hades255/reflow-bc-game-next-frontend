import { useFetch } from "@/hooks/useFetch";

export const useUserInfo = () => {

  const { data, isLoading, error } = useFetch("/api/user", {
      method: "POST",
    }
  );
  
  return data;
};
