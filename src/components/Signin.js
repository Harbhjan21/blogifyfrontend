import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "./AuthService";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [loder, setloder] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setloder(true);
    AuthService.login(user)
      .then((respnose) => {
        if (respnose.data.success) {
          localStorage.setItem("token", JSON.stringify(respnose.data.token));
          dispatch({
            type: "SET_TOKEN",
            payload: { token: respnose.data.token },
          });
          setloder(false);
          history("/home"); // Redirect to the dashboard after successful login
        } else {
          alert(respnose.data.error);
          setloder(false);
        }
      })
      .catch((error) => {
        setloder(false);
        console.error("Login error: ", error);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {loder ? (
        <div class="spinner-border my-3"  role="status">
          <span class="sr-only"></span>
        </div>
      ) : (
        <div>
          <h2>SIGN IN</h2>
          <form
            onSubmit={handleSubmit}
            style={{ border: "2px solid black", padding: 10 }}
          >
            <div style={{ marginBottom: 10 }}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                maxLength={8}
              />
            </div>
            <button type="submit">Sign In</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignIn;
