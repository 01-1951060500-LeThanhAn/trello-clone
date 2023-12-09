interface ListFormWrapperProps {
  children: React.ReactNode;
}

import React from "react";

const FormWrapper: React.FC<ListFormWrapperProps> = ({ children }) => {
  return (
    <>
      <li className="shrink-0 h-full w-[272px] select-none">{children}</li>
    </>
  );
};

export default FormWrapper;
