import React, { FC, useCallback, useEffect, useState } from "react";
import Button from "../buttons/Button";
import { useUser } from "@/redux/slices/main/userSlice";
import axios from "axios";

const ServerSeed: FC = () => {
  const user = useUser();
  const [seed, setSeed] = useState("");
  const [loading, setLoading] = useState(true);
  const [save, setSave] = useState(false);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const response = await axios(
          `${process.env.NEXT_PUBLIC_API_HOST}/api/fairness/serverseed?user=${user.id}`,
          { method: "GET" }
        );
        setSeed(response.data);
        setLoading(false);
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

  const handleClickSave = useCallback(() => {
    if (!user) return;
    (async () => {
      try {
        setLoading(true);
        const response = await axios(
          `${process.env.NEXT_PUBLIC_API_HOST}/api/fairness/serverseed?user=${user.id}`,
          { method: "POST", data: { seed } }
        );
        setSeed(response.data);
        setSave(true);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [user, seed]);

  return user ? (
    <>
      <div className="relative">
        <input
          type="text"
          value={seed}
          className="bg-[#1A1A1A] p-[8px_10px] rounded-[5px] w-full outline-none text-[14px] font-semibold text-[#D1D1D1] hover:cursor-not-allowed"
          readOnly
        />

        <Button
          text={`Regenerate${save ? "✓" : ""}`}
          disabled={loading}
          clicked={handleClickSave}
          className="!w-[82px] !absolute !top-[3px] !right-[3px] flex justify-center"
        />
      </div>
      <p className="font-normal text-[12px] text-[#D1D1D1]">
        You can confirm the validity of the hashed server seed with the
        assistance of this script. The hashed server seed is essentially a
        SHA-256 hash of the seed, and once you decrypt it, you can verify that
        it aligns with the hashed counterpart.
      </p>
    </>
  ) : (
    <p className="font-normal text-[12px] text-[#D1D1D1]">
      Login to see your server seed.
    </p>
  );
};

export default ServerSeed;
