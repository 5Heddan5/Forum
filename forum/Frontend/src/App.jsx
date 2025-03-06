// src/App.jsx
import React from "react";
import { RouterProvider } from "react-router-dom"; // Import RouterProvider from react-router-dom
import { router } from "./Router"; // Import the router configuration from Router.jsx

import "./App.css";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
