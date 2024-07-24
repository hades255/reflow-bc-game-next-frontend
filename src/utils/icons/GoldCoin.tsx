import React from "react";

interface Props {
  width: number;
  height: number;
  color: string;
}

const GoldCoin: React.FC<Props> = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_i_306_2648)">
        <circle cx="14" cy="14" r="14" fill="url(#paint0_linear_306_2648)" />
      </g>
      <g filter="url(#filter1_i_306_2648)">
        <circle
          cx="14"
          cy="14"
          r="13.3099"
          stroke="url(#paint1_linear_306_2648)"
          strokeWidth="1.38028"
        />
        <circle
          cx="14"
          cy="14"
          r="13.3099"
          stroke="url(#paint2_linear_306_2648)"
          strokeOpacity="0.09"
          strokeWidth="1.38028"
        />
      </g>
      <path
        d="M26.521 13.9996C26.521 20.9148 20.9151 26.5207 13.9998 26.5207C7.08462 26.5207 1.47872 20.9148 1.47872 13.9996C1.47872 7.08437 7.08462 1.47847 13.9998 1.47847C20.9151 1.47847 26.521 7.08437 26.521 13.9996Z"
        stroke="url(#paint3_radial_306_2648)"
        strokeOpacity="0.25"
        strokeWidth="0.197183"
      />
      <g filter="url(#filter2_i_306_2648)">
        <path
          d="M13.9942 6C15.0041 7.57813 16.009 9.159 17.0169 10.7379C17.0661 10.84 17.1788 10.9276 17.1699 11.0466C16.8786 10.9437 16.5905 10.8283 16.2928 10.7434C15.9871 10.6686 15.6385 10.6523 15.3607 10.8212C15.1316 10.9563 15.0096 11.2111 14.957 11.4606C14.9069 11.7943 14.8887 12.1319 14.876 12.4692C14.8137 13.4464 14.5102 14.4045 14.0155 15.2527C13.466 16.1933 12.6711 16.9935 11.729 17.5548C10.6901 18.1789 9.47492 18.5034 8.26057 18.508C8.06026 18.5099 7.83864 18.4717 7.69587 18.3208C7.55338 18.1696 7.48698 17.9693 7.40287 17.7848C6.37971 15.4737 5.32916 13.1749 4.28609 10.8725C4.19063 10.6512 4.07609 10.437 4 10.208C4.013 10.1952 4.03846 10.1698 4.05119 10.157C5.07545 10.7841 6.10469 11.4035 7.1309 12.0274C7.8616 12.4744 8.60006 12.9099 9.32606 13.3643C9.11662 13.3973 8.89915 13.4137 8.70713 13.5108C8.31093 13.6904 8.03563 14.1112 8.05141 14.5432C8.04892 14.7159 8.10868 14.8813 8.17591 15.0385C8.37567 15.5308 8.60919 16.0086 8.83524 16.4894C8.8748 16.5849 8.98575 16.6425 9.08867 16.625C10.254 16.4559 11.3295 15.8113 12.0525 14.8987C12.7383 14.0479 13.1191 12.9571 13.0787 11.8685C13.0632 11.5886 13.0134 11.2947 12.8374 11.0657C12.6813 10.8583 12.4229 10.736 12.1634 10.7289C11.6776 10.7014 11.2293 10.9194 10.7742 11.0515C11.8472 9.36749 12.9201 7.6832 13.9942 6Z"
          fill="url(#paint4_linear_306_2648)"
        />
        <path
          d="M19.4782 12.8649C20.9693 11.9621 22.4575 11.0553 23.9488 10.1529C23.9615 10.1616 23.9873 10.1788 24 10.1875C23.9214 10.4127 23.8066 10.6247 23.7145 10.8452C22.6174 13.2824 21.5107 15.7155 20.4173 18.1546C20.3689 18.2559 20.3332 18.3737 20.2363 18.4414C20.1057 18.5244 19.9444 18.4993 19.7975 18.5075C18.8718 18.5034 17.9399 18.3432 17.0875 17.9794C16.2807 17.6429 15.5558 17.1348 14.9285 16.535C14.809 16.4133 14.6535 16.3003 14.6178 16.1248C14.6115 15.9614 14.7061 15.8165 14.7761 15.6746C15.0309 15.209 15.2368 14.72 15.4636 14.2411C15.5389 14.3221 15.5928 14.419 15.6548 14.5096C16.1622 15.2843 16.8902 15.9262 17.7537 16.2891C18.0962 16.4389 18.457 16.5432 18.8231 16.6196C18.9003 16.6324 18.9822 16.6493 19.0591 16.6242C19.1244 16.5855 19.1518 16.5118 19.1819 16.4469C19.398 15.9537 19.631 15.468 19.8421 14.973C19.9408 14.7345 19.9597 14.461 19.8772 14.2154C19.7688 13.8495 19.4611 13.5493 19.089 13.4461C18.9678 13.4044 18.8305 13.409 18.7218 13.3353C18.9639 13.164 19.2281 13.0248 19.4782 12.8649Z"
          fill="url(#paint5_linear_306_2648)"
        />
        <path
          d="M7.91116 19.1976C8.13721 19.1771 8.36602 19.1897 8.59262 19.1938C12.3554 19.193 16.118 19.1938 19.8808 19.1932C19.9699 19.1968 20.0651 19.1801 20.1492 19.2172C20.2112 19.2415 20.2062 19.3179 20.2151 19.372C20.2297 19.7819 20.1868 20.1917 20.2175 20.6013C20.2156 20.702 20.2353 20.8104 20.1904 20.9048C20.1517 20.9771 20.0651 20.9957 19.9893 20.9987C19.0953 21.0041 18.2017 20.9908 17.3077 20.9935C14.7249 20.9932 12.1424 20.9935 9.55989 20.9932C9.05273 21.0047 8.54558 20.9965 8.03843 20.9995C7.96262 20.9957 7.87021 20.9924 7.81958 20.9283C7.76258 20.86 7.77393 20.7651 7.77393 20.6832C7.79136 20.2556 7.78223 19.8277 7.77642 19.3998C7.76646 19.3119 7.81487 19.211 7.91116 19.1976Z"
          fill="url(#paint6_linear_306_2648)"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_306_2648"
          x="0"
          y="0"
          width="28.3944"
          height="29.1831"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="0.492958"
            operator="erode"
            in="SourceAlpha"
            result="effect1_innerShadow_306_2648"
          />
          <feOffset dx="0.394366" dy="1.1831" />
          <feGaussianBlur stdDeviation="1.38028" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.23 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_306_2648"
          />
        </filter>
        <filter
          id="filter1_i_306_2648"
          x="0"
          y="0"
          width="28.1972"
          height="28.1972"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="0.0985916"
            operator="dilate"
            in="SourceAlpha"
            result="effect1_innerShadow_306_2648"
          />
          <feOffset dx="0.197183" dy="0.197183" />
          <feGaussianBlur stdDeviation="0.147887" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_306_2648"
          />
        </filter>
        <filter
          id="filter2_i_306_2648"
          x="4"
          y="6"
          width="20.1082"
          height="15.2165"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="0.108247" dy="0.216494" />
          <feGaussianBlur stdDeviation="0.108247" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.64 0"
          />
          <feBlend
            mode="overlay"
            in2="shape"
            result="effect1_innerShadow_306_2648"
          />
        </filter>
        <linearGradient
          id="paint0_linear_306_2648"
          x1="21.7887"
          y1="26.7676"
          x2="8.72535"
          y2="3.25352"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F0BC45" />
          <stop offset="1" stopColor="#B98D35" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_306_2648"
          x1="6"
          y1="2.5"
          x2="22"
          y2="26.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F1BE49" />
          <stop offset="1" stopColor="#A77718" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_306_2648"
          x1="3.40141"
          y1="4.58451"
          x2="14.9366"
          y2="17.6972"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
        <radialGradient
          id="paint3_radial_306_2648"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(23.021 22.9714) rotate(-140.572) scale(5.74375 18.9156)"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#2F2F2F" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="paint4_linear_306_2648"
          x1="21"
          y1="21"
          x2="4.60739"
          y2="7.86597"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9B751E" />
          <stop offset="1" stopColor="#342609" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_306_2648"
          x1="21"
          y1="21"
          x2="4.60739"
          y2="7.86597"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9B751E" />
          <stop offset="1" stopColor="#342609" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_306_2648"
          x1="21"
          y1="21"
          x2="4.60739"
          y2="7.86597"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9B751E" />
          <stop offset="1" stopColor="#342609" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default GoldCoin;
