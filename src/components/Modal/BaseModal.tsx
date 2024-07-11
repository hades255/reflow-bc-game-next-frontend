import React, { FC, PropsWithChildren } from "react";

const BaseModal: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="fixed -top-[83px] left-0 w-[100vw] h-[calc(100%_+_83px)] bg-[#0000007A] modal flex justify-center items-center">
      {children}
    </div>
  );
};

export default BaseModal;
