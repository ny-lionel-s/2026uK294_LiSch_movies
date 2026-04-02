import React from "react";
import Button from "../atoms/Button";
import { useNavigate } from "react-router-dom";

type PageHeaderProps = {
  title: string;
  showCreateButton?: boolean;
};

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  showCreateButton = false,
}) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <h2>{title}</h2>
      {showCreateButton && (
        <Button onClick={() => navigate("/movies/new")} variant="primary">
          + Neuer Movie
        </Button>
      )}
    </div>
  );
};

export default PageHeader;
