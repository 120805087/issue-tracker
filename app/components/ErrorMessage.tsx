import React, { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return <p className="leading-7 text-red-500">{children}</p>;
};

export default ErrorMessage;