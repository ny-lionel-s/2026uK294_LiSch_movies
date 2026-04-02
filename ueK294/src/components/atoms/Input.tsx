import React from "react";

type InputProps = {
  autoComplete?: string;
  id?: string;
  name: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  type?: string;
  value?: number | readonly string[] | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  step?: string;
};

const Input: React.FC<InputProps> = ({
  autoComplete,
  id,
  name,
  onBlur,
  type = "text",
  value,
  onChange,
  placeholder,
  step,
}) => {
  return (
    <input
      autoComplete={autoComplete}
      id={id ?? name}
      name={name}
      onBlur={onBlur}
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
