import React, { FC, useCallback, useEffect, useState } from "react";
import Button from "../buttons/Button";

const OpenCaseButton: FC<{ clicked: Function; disabled: boolean }> = ({
  clicked,
  disabled,
}) => {
  const [btndisabled, setbtndisabled] = useState(true);

  const checkBtnstatus = useCallback(() => {
    if (disabled) {
      setbtndisabled(true);
      return;
    }
    const lastget = localStorage.getItem("MYSTERY_BONUS") || "0";
    const diff = Date.now() - Number(lastget) - 1000 * 60 * 30;
    if (diff >= 0) {
      setbtndisabled(false || disabled);
    } else {
      setbtndisabled(true);
      const timer = setTimeout(() => {
        setbtndisabled(false || disabled);
      }, Math.abs(diff));
      return () => {
        clearTimeout(timer);
      };
    }
  }, [disabled]);

  useEffect(() => checkBtnstatus(), [checkBtnstatus]);

  const handleClickOpen = useCallback(() => {
    const lastget = localStorage.getItem("MYSTERY_BONUS") || "0";
    if (Date.now() - Number(lastget) > 1000 * 60 * 30) {
      localStorage.setItem("MYSTERY_BONUS", Date.now().toString());
      checkBtnstatus();
      clicked();
    }
  }, [clicked, checkBtnstatus]);

  return (
    <>
      <Button
        text="Open Case"
        clicked={handleClickOpen}
        disabled={btndisabled}
      />
    </>
  );
};

export default OpenCaseButton;
