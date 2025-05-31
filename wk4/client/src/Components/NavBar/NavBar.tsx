import React from "react";

import "./NavBar.css";

const NavBar: React.FC = () => {
  const onClickLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="navbar">
      <div>Mini Blog</div>
      <ul>
        <li>Home</li>
        <li>Profile</li>
        <li onClick={onClickLogout}>Logout</li>
      </ul>
    </div>
  );
};

export default NavBar;
