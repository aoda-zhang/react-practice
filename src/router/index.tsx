import React from "react";
import { Navigate, type RouteObject, createBrowserRouter } from "react-router-dom";

import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import History from "@/pages/History";
import Trip from "@/pages/Trip";
import EditTrip from "@/pages/Trip/EditTrip";
import ViewTrip from "@/pages/Trip/ViewTrip";
import ErrorPage from "@/shared/components/Error";
import Layout from "@/shared/components/Layout";

const routers: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Navigate to="/trip/edit" replace /> },
      {
        path: "trip",
        element: <Trip />,
        children: [
          {
            path: "edit",
            element: <EditTrip />,
          },
          {
            path: "view",
            element: <ViewTrip />,
            handle: { isMenuAvaliable: false },
          },
        ],
      },
      {
        path: "history",
        element: <History />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "error",
    element: <ErrorPage />,
  },

  {
    path: "*",
    element: <ErrorPage />,
  },
];
const RouterOptions = createBrowserRouter(routers);

export default RouterOptions;
