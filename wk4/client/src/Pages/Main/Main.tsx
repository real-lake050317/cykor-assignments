import React from "react";

import PostUpload from "../../Components/PostUpload/PostUpload";
import PostView from "../../Components/PostView/PostView";
import NavBar from "../../Components/NavBar/NavBar";

import "./Main.css";

const Main = () => {
  return (
    <div>
      <NavBar />
      <PostUpload />
      <PostView />
    </div>
  );
};

export default Main;
