import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./routes/homepage/HomePage";
import ListPage from "./routes/listpage/ListPage";
import Layout from "./routes/layout/Layout";
import SinglePage from "./routes/singlepage/SinglePage";
import ProfilePage from "./routes/profilepage/ProfilePage";
import Register from "./routes/register/Register";
import Login from "./routes/login/Login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/list",
          element: <ListPage />,
        },
        {
          path: "/:id",
          element: <SinglePage />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
