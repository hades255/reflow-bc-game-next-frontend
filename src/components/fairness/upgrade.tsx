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

        <div className="mt-4">
          <iframe
            title="Clash.gg Upgrader v2"
            src="https://codepen.io/mjchal/embed/eYeEWGQ?default-tab=js%2Cresult"
            loading="lazy"
            className="h-[500px] w-full"
          >
            See the Pen Clash.gg Upgrader v2 by mjchal
          </iframe>
        </div>

        <div className="mt-5">
          <UpgraderTable />
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;
