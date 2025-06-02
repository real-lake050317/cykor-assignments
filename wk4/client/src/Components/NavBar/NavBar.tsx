import React, { useEffect, useState } from "react";
import axios from "axios";

import "./NavBar.css";
import { API_URL } from "../../Constants/apiURL";

const NavBar: React.FC = () => {
  const [showFriends, setShowFriends] = useState(false);
  const [friends, setFriends] = useState<Object[]>([]);
  const [friendRequests, setFriendRequests] = useState<Object[]>([]);

  const onClickLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const onClickFriends = () => {
    setShowFriends(!showFriends);
  };
  const getFriendsList = () => {
    axios
      .get(`${API_URL}/util/check-login`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          axios
            .get(
              `${API_URL}/user/friends/get-friends-list?userId=${res.data._id}`
            )
            .then((response) => {
              if (res.status === 200) {
                setFriends(response.data.friendDetails);
              }
            })
            .catch((err) => {
              console.error("Error fetching friends list:", err);
              setFriends([]);
            });
        }
      })
      .catch((error) => {
        localStorage.removeItem("token");
        console.error("Error checking login status:", error);
        window.location.href = "/";
      });
  };

  const getFriendRequests = async () => {
    axios
      .get(`${API_URL}/user/friends/get-friend-invitations`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.invitations);
          setFriendRequests(response.data.invitations);
        }
      })
      .catch((error) => {
        console.error("Error fetching friend requests:", error);
        setFriendRequests([]);
      });
  };

  useEffect(() => {
    if (showFriends) {
      getFriendsList();
      getFriendRequests();
    }
  }, [showFriends]);

  const friendsList = friends.map((friend: any) => (
    <li
      key={friend._id}
      onClick={() => {
        window.location.href = `/user/${friend._id}`;
      }}
    >
      {friend.name} ({friend.email})
    </li>
  ));

  const invitationsList = friendRequests.map((request: any) => (
    <li key={request._id}>
      <div className="invitation-item">
        <div className="invitation-info">
          {request.userDetails.name} ({request.userDetails.email})
        </div>
        <div className="invitation-actions">
          <button
            className="accept-btn"
            onClick={async () => {
              await axios
                .post(
                  `${API_URL}/user/friends/accept-friend-request?requestId=${request._id}`,
                  {},
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                )
                .then((response) => {
                  if (response.status === 200) {
                    alert("Friend request accepted!");
                    getFriendsList();
                    getFriendRequests();
                  }
                })
                .catch((error) => {
                  console.error("Error accepting friend request:", error);
                });
            }}
          >
            Accept
          </button>
          <button className="decline-btn">Decline</button>
        </div>
      </div>
    </li>
  ));

  return (
    <>
      <div className="navbar">
        <div
          onClick={() => {
            window.location.href = "/";
          }}
          style={{ cursor: "pointer" }}
        >
          Mini Blog
        </div>
        <ul>
          <li
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Home
          </li>
          <li
            onClick={() => {
              window.location.href = `/user/${localStorage.getItem("userId")}`;
            }}
          >
            Profile
          </li>
          <li onClick={onClickFriends}>Friends</li>
          <li onClick={onClickLogout}>Logout</li>
        </ul>
      </div>

      {showFriends && (
        <div className="friends-container">
          <div className="friends-sidebar">
            <h3>Your Friends</h3>
            <ul>
              {friendsList.length > 0 ? (
                friendsList
              ) : (
                <label>No Friends Found.</label>
              )}
            </ul>
          </div>
          <div className="friends-sidebar">
            <h3>Pending Friend Requests</h3>
            <ul>
              {invitationsList.length > 0 ? (
                invitationsList
              ) : (
                <label>No Friend Requests Found.</label>
              )}
            </ul>
            <button onClick={onClickFriends} className="friends-sidebar-close">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
