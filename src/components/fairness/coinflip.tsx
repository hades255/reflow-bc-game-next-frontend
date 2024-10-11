import React, { FC } from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import CoinflipTable from "../table/CoinflipTable";

const CoinFlipPage: FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-semibold text-white text-[20px] uppercase">
          Royalflip technical details
        </h3>

        <div className="flex flex-col gap-3 mt-4">
          <p className="font-normal text-[16px] text-[#D1D1D1] leading-5">
            Royalflip uses a provably fair system in which the public seed is not
            known until after a roaylflip game has started. The result for each
            round is generated using the SHA-256 hash of 3 separate inputs
          </p>
          <p className="font-normal text-[16px] text-[#D1D1D1] leading-5">
            <span className="text-[#E9AE15]"> 1 ― </span> The `private seed` is
            a securely random value, generated when a round is created. The
            SHA-256 hash of the private seed is displayed to all players
            immediately after a round is created. Players can check that the
            private seed revealed after the royalflip result is made known
            matches this SHA-256 hash.
          </p>
          <p className="font-normal text-[16px] text-[#D1D1D1] leading-5">
            <span className="text-[#E9AE15]"> 2 ― </span> The `public seed` is
            the ID of an EOS block, which is to be generated after a round is
            joined by a challenger. When a round is joined, our system chooses a
            block number on the EOS blockchain that will be generated in the
            near future. The ID of this block is what will be used as the public
            seed. This way, neither the players nor our system know what data
            will be used to generate the royalflip result until after both
            players have committed their bets.
          </p>
          <p className="font-normal text-[16px] text-[#D1D1D1] leading-5">
            <span className="text-[#E9AE15]"> 3 ― </span> Round ID
          </p>

          <p className="font-normal text-[16px] text-[#D1D1D1] leading-5">
            Players can validate any past royalflip by using the code below:
          </p>
        </div>

        <div className="mb-6 break-words rounded-lg border text-blue-200 mt-3 md:px-4 md:py-3 w-[70%]">
        {"$server_seed_hash = '18c8071420da96fc849982c85ac372d4d5b9f93d58f88faf031b882d6e4e96ef';"}<br />
        {"$server_seed = 'd5w58aJIBRcIW1UdetDHWDMxVippQCBn';"}<br />
        {"$public_seed = '3QwLk7LRoTdQboJ0eg3vv6XO4UVPiZENTeoYctdR7lAEB8pKs6z62PbQb28CyCxo';"}<br />
        {"$hash = hash('sha256', $server_seed . '-' . $public_seed . '-' . $round);"}<br />
        {"$round ='66339473';"}<br />
        {"if (hash('sha256', $server_seed) != $server_seed_hash){"}<br />
        {"echo 'WARNING: Private seed hash does not match private seed!\n';"}<br />
        {"}"}<br />
        {"$hash = hash('sha256', '$server_seed-$public_seed-$round');"}<br />
        {"$flip = (hexdec(substr($hash, 0, 8)) % 2) + 1;"}<br /><br />
        {"echo 'Result: ' . ($flip == 1 ? 'Heads (T)' : 'Tails (CT)');"}
      </div>
      <div className="mb-6 break-words rounded-lg border text-blue-200 mt-3 md:px-4 md:py-3 w-[70%]">
        {"$server_seed_hash = '56bee5010e2cfa042ff316831424c9587012b9ce0eca35eb78dbef834f76cb54';"}<br />
        {"$server_seed = '2oxzg8A8wrxWU0TURolKJwze8DeypwXh';"}<br />
        {"$public_seed = 'aINHRvYDkZiO9M8woxNF0MuLGVE52vUNG9QGenDJsGaYpzeqMmjlrwvL01tcDDlO';"}<br />
        {"$hash = hash('sha256', $server_seed . '-' . $public_seed . '-' . $round);"}<br />
        {"$round ='56346182';"}<br />
        {"if (hash('sha256', $server_seed) != $server_seed_hash){"}<br />
        {"echo 'WARNING: Private seed hash does not match private seed!\n';"}<br />
        {"}"}<br />
        {"$hash = hash('sha256', '$server_seed-$public_seed-$round');"}<br />
        {"$flip = (hexdec(substr($hash, 0, 8)) % 100) + 1;"}<br />
        {"$edge = 1; // house edge = 1%"}<br /><br />
        {"echo 'Result: ' . ($flip <= 50-$edge ? 'You win' : 'House win');"}
      </div>  
        <p className="font-normal text-[16px] text-[#D1D1D1] leading-5 mt-10">
          You can execute PHP code straight from your browser with tools such as{" "}
          <a
            href="https://3v4l.org/nU4c8"
            target="_blank"
            className="underline text-[#E9AE15]"
          >
            this PHP code
          </a>{" "}
          . And House Game is <a
            href="https://3v4l.org/d2qIE"
            target="_blank"
            className="underline text-[#E9AE15]"
          >
            this PHP code
          </a>{" "}. Simply copy and paste the above code in the window and replace the
          public seed, server seed and round number. If you have any questions
          about this system, feel free to contact our support team.
        </p>

        <div className="mt-5">
          <CoinflipTable />
        </div>
      </div>
    </div>
  );
};

export default CoinFlipPage;
