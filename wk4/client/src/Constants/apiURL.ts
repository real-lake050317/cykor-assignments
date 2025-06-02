export const API_URL =
  process.env.REACT_APP_ENV === "development"
    ? "http://localhost"
    : process.env.REACT_APP_API_URL;
