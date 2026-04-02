import React from "react";
import { Link } from "react-router-dom";

type BackLinkProps = {
  to: string;
  children?: React.ReactNode;
};

const BackLink: React.FC<BackLinkProps> = ({ to, children = "← Zurück" }) => {
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        color: "#007bff",
        marginBottom: "20px",
        display: "inline-block",
      }}
    >
      {children}
    </Link>
  );
};

export default BackLink;
