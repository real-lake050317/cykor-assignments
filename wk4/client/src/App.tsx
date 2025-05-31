import React, { useState, useEffect } from "react";
import { RecoilRoot } from "recoil";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Main from "./Pages/Main/Main";
import NotFound from "./Pages/NotFound/NotFound";
import UserPage from "./Pages/UserPage/UserPage";
import LoadingPage from "./Pages/LoadingPage/LoadingPage";

import { API_URL } from "./Constants/apiURL";

import "./App.css";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [myUserId, setMyUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${API_URL}/util/check-login`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setMyUserId(response.data._id);
            setIsLoggedIn(true);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error checking login status:", error);
          setIsLoggedIn(false);
          setIsLoading(false);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <LoadingPage />
    );
  }

  if (!isLoggedIn) {
    return (
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    );
  }

  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/user/:userId" element={<UserPage myId={myUserId} />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
