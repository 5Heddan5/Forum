import { createBrowserRouter } from "react-router-dom";
import Home from "./Views/Home";
import AddThread from "./Views/AddThread";
import ThreadDetail from "./Views/ThreadDetail";
import { EditComment } from "./Views/EditComment";
import EditThread from "./Views/EditThread";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/add-thread", element: <AddThread /> },
  { path: "/thread/:id", element: <ThreadDetail /> },
  { path: "/edit-comment/:id", element: <EditComment /> },
  { path: "/edit-thread/:id", element: <EditThread /> },
  { path: "*", element: <h1>404 - Page Not Found</h1> },
]);
