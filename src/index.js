import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from "./Routes/Main/Main"
import Home from "./Routes/Home/Home"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Blogs from './Routes/Blogs/Blogs';
import Profile from "./Routes/Profile/Profile"
import SignUp from './Routes/auth/SignUp/SignUp';
import SignIn from './Routes/auth/SignIn/SignIn';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "blogs", element: <Blogs />
      },
      {
        path: "profile", element: <Profile />
      },
      {
        path: "signIn", element: <SignIn />
      },
      {
        path: "signUp", element: <SignUp />
      }
    ]
  },
])

const root = ReactDOM.createRoot
  (document.getElementById('root'));
root.render(<RouterProvider router={routes} />);

