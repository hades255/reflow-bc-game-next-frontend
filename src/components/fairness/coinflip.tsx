import React, { FC } from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import TableBase from "../table/Base";

const CoinFlipPage: FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-semibold text-white text-[20px] uppercase">
          Coinflip technical details
        </h3>

        <div className="flex flex-col gap-3 mt-4">
          <p className="font-normal text-[16px] text-[#D1D1D1] leading-5">
            Coinflip uses a provably fair system in which the public seed is not
            known until after a coinflip game has started. The result for each
            round is generated using the SHA-256 hash of 3 separate inputs
          </p>
          <p className="font-normal text-[16px] text-[#D1D1D1] leading-5">
            <span className="text-[#E9AE15]"> 1 ― </span> The `private seed` is
            a securely random value, generated when a round is created. The
            SHA-256 hash of the private seed is displayed to all players
            immediately after a round is created. Players can check that the
            private seed revealed after the coinflip result is made known
            matches this SHA-256 hash.
          </p>
          <p className="font-normal text-[16px] text-[#D1D1D1] leading-5">
            <span className="text-[#E9AE15]"> 2 ― </span> The `public seed` is
            the ID of an EOS block, which is to be generated after a round is
            joined by a challenger. When a round is joined, our system chooses a
            block number on the EOS blockchain that will be generated in the
            near future. The ID of this block is what will be used as the public
            seed. This way, neither the players nor our system know what data
            will be used to generate the coinflip result until after both
            players have committed their bets.
          </p>
          <p className="font-normal text-[16px] text-[#D1D1D1] leading-5">
            <span className="text-[#E9AE15]"> 3 ― </span> Round ID
          </p>

          <p className="font-normal text-[16px] text-[#D1D1D1] leading-5">
            Players can validate any past coinflip by using the code below:
          </p>
        </div>

        <div className="mt-4">
          <CopyBlock
            language="php"
            theme={dracula}
            showLineNumbers={true}
            text={`$private_seed_hash = "b6ce76f966a38da31399070b0f08523d93ea202e01c3151e259b8815dda02ce8";
$private_seed = "813ce2c0c6aae8fc071426c223ff0ce4";
$public_seed = "04fcb0995f1a2f0c0abd17cf364800d6dee912cba412ce16c58d7241aa7365f7";
$round = "321";
if (hash('sha256', $private_seed) != $private_seed_hash)
         echo "WARNING: Private seed hash does not match private seed!\n";
}
$hash = hash('sha256', "$private_seed-$public_seed-$round");
$flip = (hexdec(substr($hash, 0, 8)) % 2) + 1;
echo "Result: " . ($flip == 1 ? 'Heads (T)' : 'Tails (CT)');`}
          />
        </div>

        <p className="font-normal text-[12px] text-[#D1D1D1] leading-5 mt-10">
          You can execute PHP code straight from your browser with tools such as{" "}
          <a href="https://3v4l.org/0ZYp1" className="underline text-[#E9AE15]">
            this PHP code
          </a>{" "}
          . Simply copy and paste the above code in the window and replace the
          public seed, server seed and round number. If you have any questions
          about this system, feel free to contact our support team.
        </p>

        {/* <div className="mt-5">
          <TableBase />
        </div> */}
      </div>
    </div>
  );
};

export default CoinFlipPage;
