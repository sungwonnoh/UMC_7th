import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Card from "./component/card";
import RootLayout from "./layout/root-layout";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import Search from "./pages/search";
import Movies from "./pages/movies";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Card />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "movies",
        element: <Movies />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
