import React from "react";

import PostUpload from "../../Components/PostUpload/PostUpload";
import PostView from "../../Components/PostView/PostView";

import "./Main.css";

const Main = () => {
  return (
    <div>
      <div className="navbar">
        <div>Mini Blog</div>
        <ul>
          <li>Home</li>
          <li>Profile</li>
          <li>Logout</li>
        </ul>
      </div>
      <PostUpload />
      <PostView />
    </div>
  );
};

export default Main;
