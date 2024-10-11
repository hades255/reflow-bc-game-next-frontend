import React, { FC, useEffect, useState } from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import RouletteTable from "../table/RouletteTable";

import { apiListRoulette } from "@/services/fairness";

const RoulettePage: FC = () => {
  const [tableData, setTableDa] = useState<any>();

  useEffect(() => {
    (async () => {
      const data = await apiListRoulette();

      setTableDa(data);
    })();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-semibold text-white text-[20px] uppercase">
          king's roll technical details
        </h3>

        <div className="flex flex-col gap-3 mt-4">
          <p className="font-normal text-[16px] text-[#D1D1D1] leading-5">
            Our system generates the result for each round by using the SHA-256
            hash of 3 separate inputs
          </p>
          <p className="font-normal text-[16px] text-[#D1D1D1] leading-5">
            <span className="text-[#E9AE15]"> 1 ― </span> The `public seed` is a
            concatenation of 5 pairs of random numbers, 01 to 39, generated per
            roll.
          </p>
          <p className="font-normal text-[16px] text-[#D1D1D1] leading-5">
            <span className="text-[#E9AE15]"> 2 ― </span> The `server seed` is a
            SHA-256 hash of 16 cryptographically secure random bytes, generated
            at the same time as the public seed.
          </p>
          <p className="font-normal text-[16px] text-[#D1D1D1] leading-5">
            <span className="text-[#E9AE15]"> 3 ― </span> Round ID
          </p>

          <p className="font-normal text-[16px] text-[#D1D1D1] leading-5">
          Players can replicate any past roll by using the code below. Please
          note that you should use the <span className="text-blue-200">unhashed</span> 
          (not <span className="text-[#ff5c5c]">hashed</span>) server seed with the script.
        </p>
        </div>
        <div className="mb-6 break-words rounded-lg border text-blue-200 mt-3 md:px-4 md:py-3 w-[70%]">
        {"$server_seed = '96f3e04d221ca1b2048cc3b3b844e479f2bd9c80a870628072ee98fd1aa83cd0';"}<br />
        {"$public_seed = '460670512935';"}<br />
        {"$round = '321';"}<br />
        {"$hash = hash('sha256', $server_seed . '-' . $public_seed . '-' . $round);"}<br />
        {"if ($roll >= 15)"}<br />
        {"$roll = $roll - 10;"}<br />
        {"if ($roll == 0) $roll_colour = 'gold';"}<br />
        {"elseif ($roll % 2 === 1) $roll_colour = 'black';"}<br />
        {"elseif ($roll % 2 === 0) $roll_colour = 'red';"}<br /><br />
        {"echo('Roll: $roll\\nColour: $roll_colour');"}
      </div>

        <p className="font-normal text-[16px] text-[#D1D1D1] leading-5 mt-10">
          You can execute PHP code straight from your browser with tools such as{" "}
          <a
            href="https://3v4l.org/N8Y63"
            target="_blank"
            className="underline text-[#E9AE15]"
          >
            this PHP code
          </a>{" "}
          . Simply copy and paste the above code in the window and replace the
          public seed, server seed and round number. If you have any questions
          about this system, feel free to contact our support team.
        </p>

        <div className="mt-5">
          <RouletteTable data={tableData} />
        </div>
      </div>
    </div>
  );
};

export default RoulettePage;
