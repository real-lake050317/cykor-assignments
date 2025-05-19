import React, { useState, useEffect } from "react";
import axios from "axios";

import SinglePost from "./SinglePost/SinglePost";

import { API_URL } from "../../Constants/apiURL";

import "./PostView.css";
import { render } from "@testing-library/react";

const PostView: React.FC = () => {
  const [posts, setPosts] = useState([]);
  //   const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      await axios
        .get(`${API_URL}/post/get-posts`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setPosts(response.data.posts);
          // setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          // setLoading(false);
        });
    };

    fetchPosts();
  }, []);

  const renderedPosts = posts.map(
    (post: {
      _id: string;
      title: string;
      body: string;
      userName: string;
      userId: string;
    }) => (
      <SinglePost
        key={post._id}
        title={post.title}
        content={post.body}
        userName={post.userName}
        userId={post.userId}
      />
    )
  );

  return (
    <section className="post-view">
      <header className="post-view-header">
        <h1>View Posts</h1>
      </header>
      <div className="post-list">{renderedPosts}</div>
    </section>
  );
};

export default PostView;
