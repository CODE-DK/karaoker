import type { RouteObject } from "react-router-dom";
import Page404 from "../pages/404";
import Page500 from "../pages/500";
import RouterAuth from "./RouterAuth";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Profile from "../features/auth/pages/Profile";
import Home from "../pages/Home";
import FavoritesPage from "../features/favorites/page/FavoritesPage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <RouterAuth>
        <Home />
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
  {
    path: "/favorites",
    element: (
      <RouterAuth>
        <FavoritesPage />
      </RouterAuth>
    ),
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/500", element: <Page500 /> },
  { path: "*", element: <Page404 /> },
];
