import React, { useCallback, useEffect, useState, useRef, FC } from "react";
import PropTypes from "prop-types";

interface Props {
  min: number;
  max: number;
  onChange: (values: any) => void;
}

const MultiRangeSlider: FC<Props> = ({ min, max, onChange }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<any>(null);
  const [maxHover, setMaxHover] = useState(false);
  const [minHover, setMinHover] = useState(false);

  // Convert to percentage
  const getPercent = useCallback(
    (value: any) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className="container">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        onMouseUp={() => setMinHover(false)}
        onMouseDown={() => setMinHover(true)}
        className="thumb thumb--left"
        // style={{ zIndex: minVal > max - 100 && "5" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        onMouseUp={() => setMaxHover(false)}
        onMouseDown={() => setMaxHover(true)}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        {maxHover && (
          <div
            className={`absolute -top-[40px] text-[14px] bg-[#1e1e1e] px-2 py-1 rounded-md text-white`}
            style={{
              right: `${
                (100 - getPercent(maxVal)) * 2 -
                ((100 - getPercent(maxVal)) * 2) / 10
              }px`,
            }}
          >
            {maxVal / 100}
          </div>
        )}

        {minHover && (
          <div
            className={`absolute -top-[40px] text-[14px] px-2 py-1 rounded-md bg-[#1e1e1e] text-white`}
            style={{
              right: `${
                (100 - getPercent(minVal)) * 2 - (100 - getPercent(minVal)) / 10
              }px`,
            }}
          >
            {minVal / 100}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiRangeSlider;
