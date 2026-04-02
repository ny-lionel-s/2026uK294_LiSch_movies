import React from "react";

type LabelProps = {
  children: React.ReactNode;
  htmlFor?: string;
};

const Label: React.FC<LabelProps> = ({ children, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      style={{
        display: "block",
        marginBottom: "5px",
        fontWeight: "bold",
        fontSize: "14px",
      }}
    >
      {children}
    </label>
  );
};

export default Label;
