import { createBrowserRouter } from "react-router-dom";
import HomeView from "./Views/Home";
import AddThread from "./Views/AddThread";

export const router = createBrowserRouter([
  { path: "/", element: <HomeView /> },
  { path: "/add-thread", element: <AddThread /> },
//   { path: "/edit-task/:id", element: <EditTaskView /> },
  { path: "*", element: <h1>404 - Page Not Found</h1> },
]);
