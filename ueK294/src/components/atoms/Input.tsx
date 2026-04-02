import React from "react";

type InputProps = {
  name: string;
  type?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  step?: string;
};

const Input: React.FC<InputProps> = ({
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  step,
}) => {
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      step={step}
      style={{
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "14px",
        width: "100%",
      }}
    />
  );
};

export default Input;
