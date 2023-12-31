import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "./AuthService";

const SignUp = () => {
  const history = useNavigate();
  const [loder, setloder] = useState(0);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phonenumber: "",
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

    AuthService.register(user)
      .then((respnose) => {
        if (respnose.data.success) {
          setloder(false);
          history("/signin");
        } else {
          alert(respnose.data.error);
          setloder(false);
        }
      })
      .catch((error) => {
        setloder(false);
        console.error("Registration error: ", error);
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
        <div class="spinner-border my-3" role="status">
          <span class="sr-only"></span>
        </div>
      ) : (
        <div>
          <h2>Sign Up</h2>
          <form
            onSubmit={handleSubmit}
            style={{ border: "2px solid black", padding: 10 }}
          >
            <div style={{ marginBottom: 10 }}>
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
              />
            </div>
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
            <div style={{ marginBottom: 10 }}>
              <label>phoneNo:</label>
              <input
                type="number"
                name="phonenumber"
                value={user.phonenumber}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignUp;
