import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { UpdatePassword } from "./pages/UpdatePassword";
import { Index } from "./pages/index";
import { UpdateInfo } from "./pages/UpdateInfo";

const routes = [
  {
    path: "/",
    element: <Index />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "update_info",
        element: <UpdateInfo />,
      },
      {
        path: "update_password",
        element: <UpdatePassword />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
];
const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<RouterProvider router={router} />);
