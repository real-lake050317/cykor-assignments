import React, { useState, useEffect } from "react";
import axios from "axios";

import SinglePost from "./SinglePost/SinglePost";
import LoadingPage from "../../Pages/LoadingPage/LoadingPage";

import { API_URL } from "../../Constants/apiURL";

import "./PostView.css";

const PostView: React.FC = () => {
  const [posts, setPosts] = useState<
    Array<{
      _id: string;
      title: string;
      body: string;
      userName: string;
      userId: string;
    }>
  >([]);
  const [id, setId] = useState<string>("");

  const [isLoading, setIsLoading] = useState(true);

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
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          setIsLoading(false);
        });
    };

    const checkLogin = async () => {
      await axios
        .get(`${API_URL}/util/check-login`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setId(response.data._id);
          }
        })
        .catch((error) => {
          console.error("Error checking login status:", error);
        });
    };

    checkLogin();
    fetchPosts();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

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
        postId={post._id}
        isMyPost={post.userId === id}
      />
    )
  );

  return (
    <section className="post-view">
      <header className="post-view-header">
        <h1>View Posts</h1>
      </header>
      <div className="post-list">{posts.length === 0 ? "No posts" : renderedPosts}</div>
    </section>
  );
};

export default PostView;
