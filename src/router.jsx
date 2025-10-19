import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";

// lazy pages
const President = lazy(() => import("./pages/President"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Cake = lazy(() => import("./pages/Cake"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <President /> },
      { path: "gallery", element: <Gallery /> },
      { path: "cake", element: <Cake /> },
    ],
  },
]);

export default router;
