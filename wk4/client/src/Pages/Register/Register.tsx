import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";

import { API_URL } from "../../Constants/apiURL";

import "./Register.css";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios
        .post(`${API_URL}/user/register`, {
          email,
          password,
          name,
        })
        .then((res) => {
          if (res.status === 201) {
            axios
              .post(`${API_URL}/user/login`, {
                email,
                password,
              })
              .then((res) => {
                if (res.status === 200) {
                  localStorage.setItem("token", res.data.token);
                  window.location.href = "/";
                }
              })
              .catch((err) => {
                window.location.href = "/";
              });
          }
        });
    } catch (err) {
      const error = err as AxiosError;
      if (error.response && error.response.status === 409) {
        alert("Email already exists.");
      } else {
        alert("Registration failed.");
      }
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <h1 className="register-title">Register</h1>
        <form className="register-form" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        <Link to="/" className="register-link">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
