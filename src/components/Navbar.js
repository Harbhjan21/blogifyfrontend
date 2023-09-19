import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  const [login, setlogin] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  useEffect(() => {
    if (token?.length > 1) {
      setlogin(true);
    } else {
      setlogin(false);
    }
  }, [token]);

  return (
    <div>
      <nav
        class="navbar navbar-expand-lg sticky-top"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <b>BlOGiFy</b>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="home">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="userblogs">
                  User Blogs
                </Link>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div style={{ marginLeft: 10 }}>
                {login ? (
                  <div class="dropdown">
                    <a
                      class="btn btn-secondary dropdown-toggle"
                      style={{
                        height: 40,
                        width: 40,
                        backgroundImage: `url(https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png)`,
                        backgroundSize: "cover",
                        cursor: "pointer",
                      }}
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    ></a>

                    <ul
                      class="dropdown-menu"
                      style={{
                        position: "absolute",
                        left: -100,
                      }}
                    >
                      <li>
                        <Link class="dropdown-item" to="profile">
                          UserProfile
                        </Link>
                      </li>
                      <li>
                        <Link class="dropdown-item" to="userblogs">
                          Blogs
                        </Link>
                      </li>
                      <li>
                        <div
                          onClick={() => {
                            localStorage.removeItem("token");
                            dispatch({ type: "LOGOUT" });
                          }}
                        >
                          <a class="dropdown-item" href="#">
                            Logout
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div>
                    <Link to="signin" class="btn btn-outline-primary">
                      SignIn
                    </Link>
                    <Link to="signup" class="btn btn-outline-secondary my-1">
                      SignUp
                    </Link>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
