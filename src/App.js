import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import CreatEditblogs from "./components/CreatEditblogs";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import ReadBlogs from "./components/ReadBlogs";
import Renderblogs from "./components/Renderblogs";
import Signin from "./components/Signin";
import SignUp from "./components/Signup";
import Userblogs from "./components/Userblogs";
import UserProfile from "./components/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "blogs",
        element: <Renderblogs />,
      },
      {
        path: "userblogs",
        element: <Userblogs />,
      },
      {
        path: "readblog/:show",
        element: <ReadBlogs />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "createeditblogs/:id",
        element: <CreatEditblogs />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log("innnnnn");

      const token = JSON.parse(localStorage.getItem("token"));

      console.log("Token is still valid");
      dispatch({
        type: "SET_TOKEN",
        payload: { token: token },
      });
    }
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
