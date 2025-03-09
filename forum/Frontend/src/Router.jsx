import { createBrowserRouter } from "react-router-dom";
import HomeView from "./Views/Home";
import AddThreadView from "./Views/AddThread";

export const router = createBrowserRouter([
  { path: "/", element: <HomeView /> },
  { path: "/add-thread", element: <AddThreadView /> },
  { path: "*", element: <h1>404 - Page Not Found</h1> },
]);
