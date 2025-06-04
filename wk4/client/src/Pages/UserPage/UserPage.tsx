import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL } from "../../Constants/apiURL";

import NavBar from "../../Components/NavBar/NavBar";
import LoadingPage from "../LoadingPage/LoadingPage";

import "./UserPage.css";
import PostView from "../../Components/PostView/PostView";
import SinglePost from "../../Components/PostView/SinglePost/SinglePost";

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  friendList: string[];
}

const UserPage: React.FC<{
  myId: string | null;
}> = (props: { myId: string | null }) => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [friends, setFriends] = useState<User[]>([]);
  const [showFriends, setShowFriends] = useState(false);
  const [friendStatus, setFriendStatus] = useState<
    "friends" | "rejected" | "blocked" | "pending" | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const checkFriendStatus = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/user/friends/get-friend-relation?friendId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (res.data.success) {
          setFriendStatus(res.data.relation);
        }
      } catch (error) {
        console.error("Error checking friend status:", error);
      }
    };

    checkFriendStatus();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${API_URL}/user/get-user-info/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.data.success) {
          const userData: User = res.data.user;
          setUser(userData);

          await axios
            .get(
              `${API_URL}/user/friends/get-friends-list?userId=${userData._id}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((response) => {
              if (response.data.success) {
                setFriends(response.data.friendDetails);
                setIsLoading(false);
              } else {
                console.error(
                  "Failed to fetch friends:",
                  response.data.message
                );
              }
            });
        }
      } catch (error) {
        console.error("Error fetching user or friends:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await axios
          .get(`${API_URL}/post/get-posts-by-user-id?id=${userId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            setPosts(res.data.posts);
          })
          .catch((error) => {
            console.error("Error fetching posts:", error);
          });
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    if (userId) {
      fetchUserPosts();
    }
  }, [userId]);

  const toggleFriends = () => {
    setShowFriends((prev) => !prev);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="user-page">
      <NavBar />
      <div className="user-page-wrapper">
        <div className="user-page-container">
          <h1 className="user-page-title">User Profile</h1>
          {user ? (
            <div className="user-info">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Account Created:</strong>{" "}
                {new Date(user.createdAt).toLocaleString()}
              </p>
              {userId !== props.myId && (
                <>
                  {friendStatus === null && (
                    <button
                      onClick={() => {
                        axios
                          .post(
                            `${API_URL}/user/friends/send-friend-request?friendId=${userId}`,
                            {},
                            {
                              headers: {
                                Authorization: `Bearer ${localStorage.getItem(
                                  "token"
                                )}`,
                              },
                            }
                          )
                          .then((res) => {
                            if (res.status === 200) {
                              alert("Friend request sent successfully");
                              setFriendStatus("pending");
                            } else {
                              alert("Failed to send friend request");
                            }
                          })
                          .catch((err) => {
                            console.error("Error sending friend request:", err);
                          });
                      }}
                    >
                      Add Friend
                    </button>
                  )}
                  {friendStatus === "pending" && (
                    <button disabled>Pending</button>
                  )}
                  {friendStatus === "friends" && (
                    <button
                      onClick={() => {
                        axios
                          .delete(
                            `${API_URL}/user/friends/remove-friend?friendId=${userId}`,
                            {
                              headers: {
                                Authorization: `Bearer ${localStorage.getItem(
                                  "token"
                                )}`,
                              },
                            }
                          )
                          .then((res) => {
                            console.log(res);
                            if (res.status === 200) {
                              alert("Friend removed successfully");
                              window.location.href = `/user/${userId}`;
                            } else {
                              alert("Failed to remove friend");
                            }
                          })
                          .catch((err) => {
                            console.error("Error removing friend:", err);
                          });
                      }}
                    >
                      Remove Friend
                    </button>
                  )}
                  {friendStatus === "rejected" && (
                    <button disabled style={{ opacity: 0.6 }}>
                      Request Rejected
                    </button>
                  )}
                  {friendStatus === "blocked" && (
                    <button disabled style={{ opacity: 0.6 }}>
                      Blocked
                    </button>
                  )}
                </>
              )}
              <p>
                <strong>Last Updated:</strong>{" "}
                {new Date(user.updatedAt).toLocaleString()}
              </p>
              <p className="friend-count" onClick={toggleFriends}>
                <strong>Friends:</strong> {friends.length}
              </p>

              {showFriends && (
                <div className="friend-list">
                  <h2>Friends List</h2>
                  <ul>
                    {friends.length === 0
                      ? "No friends"
                      : friends.map((friend) => (
                          <li
                            key={friend._id}
                            onClick={() => {
                              window.location.href = `/user/${friend._id}`;
                            }}
                          >
                            <strong>{friend.name}</strong> — {friend.email}
                          </li>
                        ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p>Loading user data...</p>
          )}
          <div className="user-page-posts">
            {posts.length === 0 ? (
              <p>No posts yet.</p>
            ) : (
              posts.map((post) => (
                <SinglePost
                  key={post._id}
                  title={post.title}
                  content={post.body}
                  userName={user?.name ?? "Unknown"}
                  userId={post.userId}
                  postId={post._id}
                  isMyPost={props.myId === post.userId}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
