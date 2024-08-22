import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import Button from "../buttons/Button";
import { useUser } from "@/redux/slices/main/userSlice";
import axios from "axios";

const ClientSeed: FC = () => {
  const user = useUser();
  const [seed, setSeed] = useState("");
  const [loading, setLoading] = useState(true);
  const [save, setSave] = useState(false);

  useEffect(() => {
    const stor = localStorage.getItem("PUBLIC_CLIENT_SEED");
    if (stor) {
      setSeed(stor);
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const response = await axios(
          `${process.env.NEXT_PUBLIC_API_HOST}/api/fairness/clientseed?user=${user?.id}`,
          { method: "GET" }
        );
        setSeed(response.data);
        setLoading(false);
        localStorage.setItem("PUBLIC_CLIENT_SEED", response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user]);

  useEffect(() => {
    if (save)
      setTimeout(() => {
        setSave(false);
      }, 2000);
  }, [save]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSeed(e.target.value);
  }, []);

  const handleClickSave = useCallback(() => {
    if (!seed) return;
    localStorage.setItem("PUBLIC_CLIENT_SEED", seed);
    return;
  }, [seed]);

  return (
    <div className="relative">
      <input
        type="number"
        className="bg-[#1A1A1A] p-[8px_10px] rounded-[5px] w-full outline-none text-[16px] font-semibold text-[#D1D1D1]"
        value={seed}
        disabled={loading}
        onChange={handleInputChange}
      />

      <Button
        text={`Save${save ? "✓" : ""}`}
        disabled={loading}
        clicked={handleClickSave}
        className="!w-[48px] !absolute !top-[3px] !right-[3px] flex justify-center"
      />
    </div>
  );
};

export default ClientSeed;
