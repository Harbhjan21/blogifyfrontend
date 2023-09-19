import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../Backend";

const Home = () => {
  const [item, setitem] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${API}/blogs/allblogs`);
        console.log("response in home ", response);
        if (response.data.success) {
          setitem(response.data.blog);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  return (
    <div
      className="container"
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "grey",
      }}
    >
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          color: "white",
        }}
      >
        Top Blogs
      </h1>
      {item?.length == 0 && (
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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {item &&
          item.map((blog, index) => {
            return (
              <div
                key={index}
                class="card border-success mb-3"
                style={{
                  width: `calc(33.33% - 10px)` /* Set width to 1/3 of the container width with some spacing */,
                  marginBottom: `10px` /* Add spacing between rows */,
                  padding: `10px`,
                  boxSizing: `border-box`,
                }}
              >
                <div class="card-header bg-transparent border-success">
                  {blog.title}
                </div>
                <div class="card-body text-success">
                  <p class="card-text">{blog.descreption}</p>
                </div>
                <button
                  onClick={() => {
                    dispatch({
                      type: "SET_BLOG",
                      payload: { item: blog },
                    });
                    navigate("/readblog/false");
                  }}
                  type="button"
                  class="btn btn-outline-primary my-2"
                >
                  Read more
                </button>
                <div class="card-footer bg-transparent border-success">
                  publish: {blog.createdAt}
                </div>
              </div>
            );
          })}
      </div>
      <div
        class="d-grid gap-2 col-6 mx-auto"
        style={{
          position: "fixed",
          bottom: "20px", // Adjust the distance from the bottom as needed
          left: "50%", // Center horizontally
          transform: "translateX(-50%)", // Center horizontally
        }}
      >
        <Link class="btn btn-primary" type="button" to="/createeditblogs/id">
          Add Blogs
        </Link>
      </div>
    </div>
  );
};

export default Home;
