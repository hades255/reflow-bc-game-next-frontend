import React, { FC, useCallback, useEffect, useState } from "react";
import moment from "moment";
import Button from "../buttons/Button";

const OpenCaseButton: FC<{ clicked: Function; disabled: boolean }> = ({
  clicked,
  disabled,
}) => {
  const [btndisabled, setbtndisabled] = useState(true);
  const [counter, setCounter] = useState("");

  const checkBtnstatus = useCallback(() => {
    const lastget = Number(localStorage.getItem("MYSTERY_BONUS") || "0");
    let diff = Date.now() - Number(lastget) - 1000 * 60 * 15;
    if (diff >= 0) {
      setbtndisabled(false);
    } else {
      setbtndisabled(true);
      let remainingTime = Math.abs(diff);
      const timerFunc = () => {
        console.log(remainingTime);
        if (remainingTime <= 0) {
          setbtndisabled(false);
          localStorage.setItem("MYSTERY_BONUS", "");
          return;
        }
        const time = moment(remainingTime);
        const formattedTime = time.format("00:mm:ss");
        setCounter(formattedTime);
        remainingTime = remainingTime - 1000;
        setTimeout(() => {
          timerFunc();
        }, 1000);
      };
      timerFunc();
    }
  }, []);

  useEffect(() => checkBtnstatus(), [checkBtnstatus]);

  const handleClickOpen = useCallback(() => {
    const lastget = Number(localStorage.getItem("MYSTERY_BONUS") || "0");
    if (Date.now() - Number(lastget) > 1000 * 60 * 15) {
      localStorage.setItem("MYSTERY_BONUS", Date.now().toString());
      checkBtnstatus();
      clicked();
    }
  }, [clicked, checkBtnstatus]);

  return (
    <div className="mt-6" style={{ width: btndisabled ? 160 : 120 }}>
      <Button
        text={btndisabled ? `Open again in ${counter}` : "Open Case"}
        clicked={handleClickOpen}
        disabled={btndisabled || disabled}
      />
    </div>
  );
};

export default OpenCaseButton;
