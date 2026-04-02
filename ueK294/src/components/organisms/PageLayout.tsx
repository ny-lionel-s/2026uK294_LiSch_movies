import React from "react";

type PageLayoutProps = {
  children: React.ReactNode;
  maxWidth?: string;
};

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  maxWidth = "900px",
}) => {
  return (
    <div style={{ maxWidth, margin: "20px auto", padding: "0 20px" }}>
      {children}
    </div>
  );
};

export default PageLayout;
