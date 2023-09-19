import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API } from "../Backend";

const Userblogs = () => {
  const [blogs, setblogs] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const [valid, setvalid] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      if (token.length > 0) {
        const response = await axios.get(`${API}/blogs/userblogs`, {
          headers: {
            token,
          },
        });
        console.log("blogs", response);
        if (response.data?.success) {
          setblogs(response?.data.blog);
          setvalid(true);
        } else if (response?.data?.error == "invalid token") {
          alert("please sigin!");
          navigate("/signin");
        } else {
          alert("try again");
        }
      }
    };
    fetch();
  }, [token]);
  const handledelet = async (id, index) => {
    const response = await axios.post(
      `${API}/blogs/delete`,
      {
        id,
      },
      {
        headers: {
          token,
        },
      }
    );
    console.log("response after delete", response);
    if (response.data.success) {
      alert(" blog deleted successfully!");
      const updatedBlogs = [...blogs];
      updatedBlogs.splice(index, 1);
      setblogs(updatedBlogs);
    }
  };
  return (
    <>
      {!valid ? (
        <>
          <h1>please signIn</h1>
          <button
            onClick={() => navigate("/signin")}
            className="btn btn-primary"
          >
            signIn
          </button>
        </>
      ) : (
        <>
          <h1 style={{ textAlign: "center" }}>USER BLOGS</h1>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {blogs?.length == 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "whitesmoke",
                  width: "100%",
                }}
              >
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            {blogs &&
              blogs.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      width: `calc(33.33% - 10px)` /* Set width to 1/3 of the container width with some spacing */,
                      marginBottom: `10px` /* Add spacing between rows */,
                      padding: `10px`,
                      boxSizing: `border-box`,
                    }}
                  >
                    <div class="card" style={{ width: "18rem" }}>
                      <div class="card-body">
                        <h5 class="card-title">{item.title}</h5>
                        <p class="card-text">{item.descreption}</p>
                        <button
                          onClick={() => {
                            dispatch({
                              type: "SET_BLOG",
                              payload: { item },
                            });
                            navigate("/readblog/true");
                          }}
                          class="btn btn-primary"
                        >
                          Read more
                        </button>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            marginTop: 5,
                          }}
                        >
                          <button
                            type="button"
                            class="btn btn-outline-info"
                            onClick={() => {
                              navigate(`/createeditblogs/${item._id}`);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handledelet(item._id, index)}
                            type="button"
                            class="btn btn-outline-dark"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </>
  );
};

export default Userblogs;
