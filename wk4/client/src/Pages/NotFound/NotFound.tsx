import React from "react";
import { Link } from "react-router-dom";

import "./NotFound.css";

const NotFound: React.FC = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 Not Found</h1>
      <p className="not-found-message">존재하지 않는 페이지입니다.</p>
      <Link to="/" className="not-found-label">
        메인 페이지로 이동하기
      </Link>
    </div>
  );
};

export default NotFound;
