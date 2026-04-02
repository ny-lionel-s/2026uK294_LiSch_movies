import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  style?: React.CSSProperties;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  style,
}) => {
  const baseStyle: React.CSSProperties = {
    padding: "8px 16px",
    cursor: "pointer",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    ...style,
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: "#007bff",
      color: "white",
    },
    secondary: {
      backgroundColor: "#6c757d",
      color: "white",
    },
    danger: {
      backgroundColor: "#dc3545",
      color: "white",
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      style={{ ...baseStyle, ...variantStyles[variant] }}
    >
      {children}
    </button>
  );
};

export default Button;