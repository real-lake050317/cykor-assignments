import React, { useState } from "react";
import axios from "axios";

import { API_URL } from "../../Constants/apiURL";

import "./PostUpload.css";

const PostUpload: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  //   const [tags, setTags] = useState<string[]>([]);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post(
        `${API_URL}/post/create-post`,
        {
          title,
          body: content,
          // tags,
          isPrivate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          alert("Post uploaded successfully!");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error uploading post:", error);
        alert("Failed to upload post. Please try again.");
      });
  };

  return (
    <div className="post-upload">
      <h2>Upload a Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            required
          ></textarea>
        </div>
        <button type="submit">Upload</button>
        <div>
          <input
            type="checkbox"
            id="isPrivate"
            name="isPrivate"
            checked={isPrivate}
            onChange={() => {
              setIsPrivate((prev) => !prev);
            }}
          />
          <label htmlFor="isPrivate">Make this post private</label>
        </div>
      </form>
    </div>
  );
};

export default PostUpload;
