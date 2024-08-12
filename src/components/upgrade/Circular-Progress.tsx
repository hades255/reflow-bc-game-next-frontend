import React, { useEffect, useRef, useState, useCallback } from "react";
import { keyframes } from "@emotion/react";
import { css } from "@emotion/css";
import Arrow from "@/utils/icons/Arrow";
import Reflow from "@/utils/icons/Reflow";
import BlackReflow from "@/utils/icons/BlackReflow";

const CircularProgressBar: React.FC<{
  betAmount: number;
  assetValue: number;
  betResult: boolean | null;
  isLoading: boolean | null;
}> = ({ betAmount, assetValue, betResult, isLoading }) => {
  const radius = 36 * 3;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius;
  const fontSize = 12 * 3;
  const percentage = Math.min(Math.max(betAmount / assetValue, 0), 0.95);
  const offset = circumference - percentage * circumference;
  const [visibleCircle, setVisibleCircle] = useState(false);
  const [renderKey, setRenderKey] = useState(1);
  const [shouldSpin, setShouldSpin] = useState(false);
  const circleRef = useRef<SVGCircleElement | null>(null);
  const activeStrokeLengthInDegrees = percentage * 360;
  const [spinStopDegree, setSpinStopDegree] = useState(0);

  const getRandom = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const calculateSpinStopDegree = useCallback(
    async (isWinner: boolean | null) => {
      if (isWinner) {
        let degree = getRandom(1, activeStrokeLengthInDegrees);
        setSpinStopDegree(degree % 360);
        setShouldSpin(true);
      } else {
        let degree = getRandom(activeStrokeLengthInDegrees + 2, 358);
        setSpinStopDegree(degree % 360);
        setShouldSpin(true);
      }
    },
    [activeStrokeLengthInDegrees]
  );

  const totalRotations = 5 * 360 - 90 - activeStrokeLengthInDegrees;
  const finalSpinDegree = totalRotations + spinStopDegree;

  useEffect(() => {
    if (shouldSpin && circleRef.current) {
      const animationDelay = 20000;
      circleRef.current.animate(
        [
          { transform: "rotate(90deg)" },
          { transform: `rotate(${finalSpinDegree}deg)` },
        ],
        {
          duration: spinDuration * 1000,
          delay: animationDelay,
          easing: "ease-out",
          fill: "forwards",
        }
      );
    }
  }, [shouldSpin, finalSpinDegree]);

  useEffect(() => {
    if (betResult !== null && betAmount && assetValue && isLoading) {
      calculateSpinStopDegree(betResult);
    }
  }, [betResult, betAmount, assetValue, isLoading, calculateSpinStopDegree]);

  useEffect(() => {
    if (betResult !== null && isLoading === false) {
      setVisibleCircle(true);
      setRenderKey((prevKey) => prevKey + 1);

      const timerId = setTimeout(() => {
        setVisibleCircle(false);
      }, 4000);

      return () => clearTimeout(timerId);
    }
  }, [betResult, isLoading]);

  const fadeIn = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
  `;

  const fadeOut = keyframes`
    0% { opacity: 1; }
    100% { opacity: 0; }
  `;

  const fadeInStyle = css`
    animation: ${fadeIn} 1s forwards;
  `;

  const fadeOutStyle = css`
    animation: ${fadeOut} 1s forwards;
    animation-delay: 3s;
  `;

  const spin = keyframes`
  0% { transform: rotate(90deg); }
  100% { transform: rotate(${finalSpinDegree}deg); }
`;

  const spinDuration = 4.5;
  const animationIterationCount = 1;

  const spinAnimationStyle = css`
    animation: ${spin} ${spinDuration}s ease-out forwards
      ${animationIterationCount};
    transform-origin: 150px 155px;
  `;

  return (
    <svg
      key={renderKey}
      height="300"
      width="300"
      className="circular-progress-bar"
    >
      <defs>
        <radialGradient
          id="greenGradient"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%"
        >
          <stop offset="0%" stopColor="#008000" stopOpacity="0" />
          <stop offset="35%" stopColor="#008000" stopOpacity="0" />
          <stop offset="100%" stopColor="#008000" stopOpacity="0.5" />
        </radialGradient>
        <radialGradient
          id="redGradient"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%"
        >
          <stop offset="0%" stopColor="#ed143d" stopOpacity="0" />
          <stop offset="35%" stopColor="#ed143d" stopOpacity="0" />
          <stop offset="100%" stopColor="#ed143d" stopOpacity="0.5" />
        </radialGradient>
      </defs>
      <circle
        stroke="transparent"
        fill="#2F2F2F"
        r={radius + 12}
        cx="150"
        cy="155"
        strokeWidth={strokeWidth}
      />
      <circle
        stroke="transparent"
        fill="#2F2F2F"
        r={radius / 3}
        cx="150"
        cy="36"
        strokeWidth={strokeWidth}
      />
      <Reflow x="138" y="5" width={24} height={19} />
      <Arrow x="146.5" y="30" width={34} height={29} />
      <circle
        stroke="transparent"
        fill="transparent"
        r={radius}
        cx="150"
        cy="155"
        strokeWidth={strokeWidth}
      />
      <circle
        stroke="black"
        fill="#1A1A1A"
        r={radius}
        cx="150"
        cy="155"
        strokeWidth={strokeWidth}
      />
      <circle
        stroke="#E9AE15"
        fill="transparent"
        r={radius}
        cx="150"
        cy="155"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className={shouldSpin && isLoading ? spinAnimationStyle : ""}
        transform="rotate(-90 150 155)"
      />
      <BlackReflow x="58" y="80" />
      <circle
        ref={circleRef}
        stroke={betResult === true ? `#008000` : `#ed143d`}
        fill={betResult === true ? `url(#greenGradient)` : `url(#redGradient)`}
        r={radius}
        cx="150"
        cy="155"
        strokeWidth={strokeWidth + 1}
        strokeDasharray={circumference}
        className={
          visibleCircle ? `${fadeInStyle} ${fadeOutStyle}` : "opacity-0"
        }
      />
      <text
        x="150"
        y="125"
        alignmentBaseline="middle"
        textAnchor="middle"
        fill="#484848"
        fontSize={20}
        fontWeight="bold"
      >
        CHANCE
      </text>
      <text
        x="150"
        y="175"
        alignmentBaseline="middle"
        textAnchor="middle"
        fill="#fff"
        fontSize={fontSize * 1.2}
        fontWeight="bold"
      >
        <tspan x="130" fill="#fff" textAnchor="middle">
          {Math.round(percentage * 100)}
        </tspan>
        <tspan x="160" fill="#E9AE15" textAnchor="start">
          %
        </tspan>
      </text>
    </svg>
  );
};

export default CircularProgressBar;
