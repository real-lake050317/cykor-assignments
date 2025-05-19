import React from "react";
import "./SinglePost.css";

const SinglePost: React.FC<{
  title: string;
  content: string;
  userName: string;
  userId: string;
}> = (props: {
  title: string;
  content: string;
  userName: string;
  userId: string;
}) => {
    
  const formattedContent = props.content.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));

  return (
    <article className="single-post">
      <h2 className="post-title">{props.title}</h2>
      <label>
        Uploaded by: <a href={`/users/${props.userId}`}>{props.userName} </a>
      </label>
      <p className="post-content">{formattedContent}</p>
    </article>
  );
};

export default SinglePost;
