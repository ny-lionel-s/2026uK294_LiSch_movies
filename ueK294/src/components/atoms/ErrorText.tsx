import React from "react";

type ErrorTextProps = {
  children: React.ReactNode;
};

const ErrorText: React.FC<ErrorTextProps> = ({ children }) => {
  return (
    <div
      style={{
        color: "red",
        fontSize: "12px",
        marginTop: "4px",
      }}
    >
      {children}
    </div>
  );
};

export default ErrorText;
