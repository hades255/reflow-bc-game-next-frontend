import React, { FC, PropsWithChildren } from "react";

const BaseModal: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="fixed -top-[83px] left-0 w-[100vw] h-[calc(100%_+_83px)] bg-[rgba(0,0,0,.6)] modal flex justify-center items-center">
      {children}
    </div>
  );
};

export default BaseModal;
