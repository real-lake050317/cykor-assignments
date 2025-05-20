import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL } from "../../Constants/apiURL";

const UserPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/post/get-posts-by-user-id?id=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div>
      <h1>User Page</h1>
      <p>{userId}</p>
    </div>
  );
};

export default UserPage;
