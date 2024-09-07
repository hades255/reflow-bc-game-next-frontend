import React, { FC } from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import UpgraderTable from "../table/UpgraderTable";

const UpgradePage: FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-semibold text-white text-[20px] uppercase">
          Crown & King technical details
        </h3>

        <div className="flex flex-col gap-3 mt-4">
          <p className="font-normal text-[16px] text-[#D1D1D1] leading-5">
            {
              "Both seeds are used to generate a ticket - float value between 0 and 1. The ticket then is compared with user odds to determine the outcome. For example, if an user has 20% ch ance of winning, the ticket must satisfy 0 <= ticket < 0.2 for rolls under, or 1 >= ticket > (1 - 0.2) for rolls over."
            }
          </p>
        </div>
        <div className="mb-6 break-words rounded-lg border text-blue-200 mt-3 md:px-4 md:py-3 w-[70%]">
        {"$server_seed_hash = '18c8071420da96fc849982c85ac372d4d5b9f93d58f88faf031b882d6e4e96ef';"}<br />
        {"$server_seed = 'd5w58aJIBRcIW1UdetDHWDMxVippQCBn';"}<br />
        {"$public_seed = 'D9YGuK';"}<br />
        {"$bet_amount = 1000;"}<br />
        {"$skin_price = 2000000;"}<br />
        {"$hash = hash('sha256', $server_seed . '-' . $public_seed . '-' . $round);"}<br />
        {"if (hash('sha256', $server_seed) != $server_seed_hash){"}<br />
        {"echo 'WARNING: Private seed hash does not match private seed!';"}<br />
        {"}"}<br />
        {"$hash = hash('sha256', '$server_seed-$public_seed');"}<br />
        {"$result = (hexdec(substr($hash, 0, 8)) % 100) +1;"}<br />
        {"$edge = 10; // house edge = 10%"}<br />
        {"$win_rate = $bet_amount / $skin_price * (100 - $edge);"}<br /><br />
        {"echo 'Result: ' . ($result < $win_rate ? 'You win' : 'House win');"}
      </div>
      <p className="font-normal text-[16px] text-[#D1D1D1] leading-5 mt-10">
          You can execute PHP code straight from your browser with tools such as{" "}
          <a
            href="https://3v4l.org/G6C0r"
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
          <UpgraderTable />
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;
