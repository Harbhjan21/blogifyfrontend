import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from "markdown-it";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../Backend";
import { useSelector } from "react-redux";

const CreatEditblogs = () => {
  const [radio, setradio] = useState(false);
  const navigate = useNavigate();
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [descreption, setdescreption] = useState("");
  const [valid, setvalid] = useState(false);

  const token = useSelector((state) => state.token);
  const { id } = useParams();

  const mdParser = new MarkdownIt(/* Markdown-it options */);
  useEffect(() => {
    if (token.length > 1) {
      console.log("in token");
      setvalid(true);
    }
  }, [token]);
  useEffect(() => {
    const fetch = async () => {
      if (id !== "id") {
        const response = await axios.post(
          `${API}/blogs/getBlog`,
          {
            id,
          },
          {
            headers: {
              token,
            },
          }
        );
        if (response.data.success) {
          settitle(response.data.blog.title);
          setdescreption(response.data.blog.descreption);
          setcontent(response.data.blog.content);
        }
      }
    };
    fetch();
  }, []);

  // Handle changes in the Markdown editor
  const handletitle = (e) => {
    console.log("titile", e.target.value);
    settitle(e.target.value);
  };
  const handlecontent = (e) => {
    console.log("titile", e.target.value);
    setcontent(e.target.value);
  };
  const handledescreption = (e) => {
    console.log("descreption", e.target.value);
    setdescreption(e.target.value);
  };
  const handleradio = (e) => {
    setradio(e.target.value);
    console.log("radio", e.target.value);
  };

  const handleSaveToDatabase = async () => {
    // Send 'markdown' to your server for database storage
    // Use a library like axios for this

    try {
      if (id !== "id") {
        const response = await axios.post(
          `${API}/blogs/update`,
          {
            title,
            content,
            descreption,
            public: radio,
            id,
          },
          {
            headers: {
              token,
            },
          }
        );
        if (response.data.success) {
          alert("Markdown content saved!");
          navigate("/userblogs");
        } else if (response.data.error == "invalid token") {
          alert("some error refresh!");
          navigate("/signin");
        } else {
          alert("try again");
        }
        console.log("response", response.data);
      } else {
        const response = await axios.post(
          `${API}/blogs/create`,
          {
            title,
            content,
            descreption,
            public: radio,
          },
          {
            headers: {
              token,
            },
          }
        );
        if (response.data.success) {
          alert("Markdown content saved!");
          navigate("/userblogs");
        } else if (response.data.error == "invalid token") {
          alert("some error refresh!");
          navigate("/signin");
        } else {
          alert("try again");
        }
        console.log("response", response.data);
      }
    } catch (error) {
      alert("some error");
    }
  };

  return (
    <>
      {valid ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div>
              <h2>{id == "id" ? "Create a Blog Post" : "  Edit Blog Post"}</h2>

              <div style={{ border: "2px solid black", borderRadius: 3 }}>
                <div
                  style={{
                    padding: 10,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      marginBottom: 10,
                    }}
                  >
                    <label>Title: </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => handletitle(e)}
                      required
                    />
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>Description: </label>
                    <textarea
                      style={{ width: 500, height: 100 }}
                      value={descreption}
                      onChange={(e) => handledescreption(e)}
                      required
                    ></textarea>
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>Markdown: </label>
                    <textarea
                      style={{ width: 500, height: 100 }}
                      value={content}
                      onChange={(e) => handlecontent(e)}
                      required
                    ></textarea>
                  </div>
                  <div class="form-check" style={{ marginBottom: 10 }}>
                    <input
                      class="form-check-input"
                      type="radio"
                      value={true}
                      onChange={(e) => {
                        handleradio(e);
                      }}
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label class="form-check-label" for="flexRadioDefault1">
                      Publish
                    </label>
                    <br></br>
                    <input
                      class="form-check-input"
                      type="radio"
                      value={false}
                      onChange={(e) => {
                        handleradio(e);
                      }}
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      checked
                    />
                    <label class="form-check-label" for="flexRadioDefault2">
                      Private
                    </label>
                  </div>

                  <div>
                    <button
                      type="button"
                      class="btn btn-outline-success mx-3 my-5"
                      onClick={() => handleSaveToDatabase()}
                    >
                      {id !== "id" ? "Save Changes" : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>please signIn</h1>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/signin")}
          >
            SignIn
          </button>
        </>
      )}
    </>
  );
};

export default CreatEditblogs;
