import Image from "next/image";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const TokenBar = () => {

  const tokens: string[] = [
    'CelestialTax', 'Coinweight', 'DoubleLuck', 'DoubleSpin', 'Guardian', 'Highlight', 'HouseOwner', 'HumbleKing', 'LuckyCharm', 'PayoutMultiplierBlackAndRed', 'PayoutMultiplierGreen', 'PayoutMultiplierYellow', 'RevengeFlip', 'ReverseHouseEdge', 'Winstreak', 'XPElixir', 'XPGod' 
  ]

  return (
    <>
      <div
        id="hs-overlay-backdrop-with-scrolling"
        className="hs-overlay hs-overlay-open:translate-x-0 hidden translate-x-full fixed top-[calc(50%-215px)] end-0 transition-all duration-300 transform h-[430px] w-[60px] z-[80] bg-[#222222] rounded-l-xl"
        tab-index="-1"
      >
        <div className="w-full h-full relative">
          <button className="absolute bottom-[50%] -left-4 w-4 h-5 bg-[#222222] rounded-l-full">
            <svg
              width="14"
              height="14"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="pl-[2px]"
            >
              <path
                d="M7.33008 17.1172L14.9477 9.49959L7.33008 1.88199"
                stroke="#ECA316"
                strokeWidth="1.78125"
                strokeLinecap="round"
              />
              <path
                d="M9.35321 12.0684L7.32985 10.6548V10.6618L5.30649 12.0615L6.02021 9.70552L4.05228 8.21572L6.51912 8.16028L7.32985 5.83203L8.14058 8.16028L10.6074 8.21572L8.64642 9.69859L9.35321 12.0684Z"
                fill="#ECA316"
              />
            </svg>
          </button>
          <span className="text-font absolute top-1 left-6"><IoIosArrowUp size={12} /></span>
          <span className="text-font absolute bottom-1 left-6"><IoIosArrowDown size={12} /></span>
          <div className="w-full h-full flex items-center">
            <div className="w-full h-[388px] flex flex-col gap-2 overflow-y-auto [&::-webkit-scrollbar]:w-0">
              {
                tokens.map((token, id) =>
                  <div className="w-full flex items-center justify-center py-1 token-hover" key={`token-${id}`}>
                    <Image width={40} height={40} src={`/assets/tokens/${token}-1.png`} alt="" />
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TokenBar;
