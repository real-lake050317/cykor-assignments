import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL } from "../../Constants/apiURL";

import "./UserPage.css";
import NavBar from "../../Components/NavBar/NavBar";

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

          if (userData.friendList.length > 0) {
            const friendRequests = userData.friendList.map((friendId) =>
              axios.get(`${API_URL}/user/get-user-info/${friendId}`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })
            );

            const friendResponses = await Promise.all(friendRequests);
            const friendData = friendResponses
              .filter((res) => res.data.success)
              .map((res) => res.data.user);
            setFriends(friendData);
          }
        }
      } catch (error) {
        console.error("Error fetching user or friends:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const toggleFriends = () => {
    setShowFriends((prev) => !prev);
  };

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
                  {friendStatus === null && <button>Add Friend</button>}
                  {friendStatus === "pending" && (
                    <button disabled>Pending</button>
                  )}
                  {friendStatus === "friends" && (
                    <button disabled>Already Friends</button>
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
                <strong>Friends:</strong> {user.friendList.length}
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
        </div>
      </div>
    </div>
  );
};

export default UserPage;
