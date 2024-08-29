import React, { FC } from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import TableBase from "../table/Base";

const RoulettePage: FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-semibold text-white text-[20px] uppercase">
          roulette technical details
        </h3>

        <div className="flex flex-col gap-3 mt-4">
          <p className="font-normal text-[16px] text-[#D1D1D1] leading-5">
            Our system generates the result for each round by using the SHA-256
            hash of 3 separate inputs
          </p>
          <p className="font-normal text-[16px] text-[#D1D1D1] leading-5">
            <span className="text-[#E9AE15]"> 1 ― </span> The `public seed` is a
            concatenation of 5 pairs of random numbers, 01 to 39, generated
            daily.
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
            note that you should use the unhashed (not hashed) server seed with
            the script.
          </p>
        </div>

        <div className="mt-4">
          <CopyBlock
            language="php"
            theme={dracula}
            showLineNumbers={true}
            text={`$server_seed = "96f3e04d221ca1b2048cc3b3b844e479f2bd9c80a870628072ee98fd1aa83cd0";
                  $public_seed = "460670512935";
                  $round = "321";
                  $hash = hash('sha256', $server_seed . "-" . $public_seed . "-" . $round);
                  $roll = hexdec(substr($hash, 0, 8)) % 15;
                  if ($roll == 0) $roll_colour = 'bonus';
                  elseif ($roll >= 1 and $roll <= 7) $roll_colour = 'orange';
                  elseif ($roll >= 8 and $roll <= 14) $roll_colour = 'black';

                  echo("Roll: $roll\nColour: $roll_colour");`}
          />
        </div>

        <p className="font-normal text-[16px] text-[#D1D1D1] leading-5 mt-10">
          You can execute PHP code straight from your browser with tools such as
          this PHP code. Simply copy and paste the above code in the window and
          replace the public seed, server seed and round number. If you have any
          questions about this system, feel free to contact our support team.
        </p>

        <div className="mt-5">
          <TableBase />
        </div>
      </div>
    </div>
  );
};

export default RoulettePage;
