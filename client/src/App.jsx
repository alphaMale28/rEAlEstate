import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./routes/homepage/homePage";
import ListPage from "./routes/listpage/listPage";
import Layout from "./routes/layout/layout";
import SinglePage from "./routes/singlepage/singlePage";
import ProfilePage from "./routes/profilepage/profilePage";
import Register from "./routes/register/register";
import Login from "./routes/login/login";

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
