import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Card from "./component/card";
import RootLayout from "./layout/root-layout";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import Search from "./pages/search";
import Movies from "./pages/movies";
import NowPlaying from "./pages/now-playing";
import Popular from "./pages/popular";
import TopRated from "./pages/top-rated";
import Upcoming from "./pages/up-coming";
import Home from "./pages/home";
import Detail from "./pages/detailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
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
        children: [
          {
            path: "now-playing",
            element: <NowPlaying />,
          },
          {
            path: "popular",
            element: <Popular />,
          },
          {
            path: "top-rated",
            element: <TopRated />,
          },
          {
            path: "up-coming",
            element: <Upcoming />,
          },
          {
            path: ":movie_id",
            element: <Detail />,
          },
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
