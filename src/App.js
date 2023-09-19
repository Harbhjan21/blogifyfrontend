import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signin from "./components/Signin";
import Navbar from "./components/Navbar";
import SignUp from "./components/Signup";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CreatEditblogs from "./components/CreatEditblogs";
import Renderblogs from "./components/Renderblogs";
import Userblogs from "./components/Userblogs";
import ReadBlogs from "./components/ReadBlogs";

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
