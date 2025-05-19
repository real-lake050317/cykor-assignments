import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import NotFound from "./Pages/NotFound/NotFound";
import { API_URL } from "./Constants/apiURL";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

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
            setIsLoggedIn(true);
          }
        })
        .catch((error) => {
          console.error("Error checking login status:", error);
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  if (!isLoggedIn) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <div className="App">
      <h1>Main Page</h1>
    </div>
  );
};

export default App;
