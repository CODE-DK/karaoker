import type { RouteObject } from "react-router-dom";
import App from "../App";
import Page404 from "../pages/404";
import Page500 from "../pages/500";
import RouterAuth from "./RouterAuth";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <RouterAuth>
        <App />
      </RouterAuth>
    ),
  },
  {
    path: "/profile",
    element: (
      <RouterAuth>
        <Profile />
      </RouterAuth>
    ),
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/500", element: <Page500 /> },
  { path: "*", element: <Page404 /> },
];
