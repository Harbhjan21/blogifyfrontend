import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";

const ReadBlogs = () => {
  const state = useSelector((state) => state);
  const [item, setitem] = useState("");
  const navigate = useNavigate();
  const { show } = useParams();
  const blog = state?.blog;
  useEffect(() => {
    setitem(blog);
    console.log("blog", blog);
  }, []);
  return (
    <div>
      <h1>Title: {item?.title}</h1>
      <p>
        <b>publish: </b>
        {item.createdAt}
      </p>
      <b style={{ backgroundColor: "white" }}>{item.descreption}</b>
      <br></br>
      <button
        onClick={() => {
          navigate("/home");
        }}
        type="button"
        class="btn btn-success"
      >
        All Blogs
      </button>
      {show && (
        <button
          onClick={() => {
            navigate(`/createeditblogs/${item._id}`);
          }}
          type="button"
          class="btn btn-info mx-3"
        >
          Edit
        </button>
      )}

      <hr></hr>
      <ReactMarkdown children={item.content} />
    </div>
  );
};

export default ReadBlogs;
