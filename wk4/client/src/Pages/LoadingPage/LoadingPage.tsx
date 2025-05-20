import React from "react";

import "./LoadingPage.css";

const LoadingPage: React.FC = () => {
  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
      <p className="loading-text">Loading, please wait...</p>
    </div>
  );
};

export default LoadingPage;
