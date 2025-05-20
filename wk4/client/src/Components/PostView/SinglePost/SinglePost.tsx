import React from "react";
import axios from "axios";

import "./SinglePost.css";
import { API_URL } from "../../../Constants/apiURL";

const SinglePost: React.FC<{
  key: string;
  title: string;
  content: string;
  userName: string;
  userId: string;
  isMyPost: boolean;
  postId: string;
}> = (props: {
  key: string;
  title: string;
  content: string;
  userName: string;
  userId: string;
  isMyPost: boolean;
  postId: string;
}) => {
  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  const formattedContent = props.content.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));

  if (isEditing) {
    return (
      <div className="edit-post">
        <input
          className="edit-title"
          type="text"
          defaultValue={props.title}
          onBlur={() => setIsEditing(false)}
        />
        <textarea
          className="edit-content"
          defaultValue={props.content}
          onBlur={() => setIsEditing(false)}
        />
        <div className="edit-buttons">
          <button className="save-button" onClick={() => setIsEditing(false)}>
            Save
          </button>
          <button className="cancel-button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="single-post">
      <h2 className="post-title">{props.title}</h2>
      <label>
        Uploaded by: <a href={`/user/${props.userId}`}>{props.userName} </a>
      </label>
      <p className="post-content">{formattedContent}</p>
      <div className="post-actions">
        {props.isMyPost && !isEditing && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-pencil"
            viewBox="0 0 16 16"
            onClick={() => setIsEditing(true)}
          >
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
          </svg>
        )}
        {props.isMyPost && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash"
            viewBox="0 0 16 16"
            onClick={() => {
              if (window.confirm("Do you want to delete this post?")) {
                axios
                  .delete(`${API_URL}/post/delete-post/${props.postId}`, {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  })
                  .then((response) => {
                    if (response.status === 200) {
                      window.location.reload();
                    }
                  })
                  .catch((error) => {
                    alert("Error deleting post");
                  });
                alert("Deleated.");
                window.location.reload();
              } else {
              }
            }}
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
          </svg>
        )}
      </div>
    </article>
  );
};

export default SinglePost;
