import React, { FC, useCallback, useEffect, useState } from "react";
import Button from "../buttons/Button";

const OpenCaseButton: FC<{ clicked: Function; disabled: boolean }> = ({
  clicked,
  disabled,
}) => {
  const [btndisabled, setbtndisabled] = useState(true);
  const [counter, setCounter] = useState("");

  const checkBtnstatus = useCallback(() => {
    const lastget = Number(localStorage.getItem("MYSTERY_BONUS") || "0");
    let diff = Date.now() - Number(lastget) - 1000 * 60 * 3;
    if (diff >= 0) {
      setbtndisabled(false);
    } else {
      setbtndisabled(true);
      let remainingTime = Math.abs(diff);
      const timerFunc = () => {
        if (remainingTime <= 0) {
          setbtndisabled(false);
          return;
        }
        const date = new Date(remainingTime);
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();
        const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        setCounter(formattedTime);
        remainingTime = remainingTime - 1000;
        setTimeout(() => {
          timerFunc();
        }, 1000);
      };
      timerFunc();
      const timer = setTimeout(() => {
        localStorage.setItem("MYSTERY_BONUS", "");
        setbtndisabled(false);
      }, Math.abs(diff));
      return () => {
        console.log("remove timeout");
        clearTimeout(timer);
      };
    }
  }, []);

  useEffect(() => checkBtnstatus(), [checkBtnstatus]);

  const handleClickOpen = useCallback(() => {
    const lastget = Number(localStorage.getItem("MYSTERY_BONUS") || "0");
    console.log(lastget);
    if (Date.now() - Number(lastget) > 1000 * 60 * 3) {
      localStorage.setItem("MYSTERY_BONUS", Date.now().toString());
      checkBtnstatus();
      clicked();
    }
  }, [clicked, checkBtnstatus]);

  return (
    <div className="w-full mt-6">
      <Button
        text={btndisabled ? `Open again in ${counter}` : "Open Case"}
        clicked={handleClickOpen}
        disabled={btndisabled || disabled}
      />
    </div>
  );
};

export default OpenCaseButton;
