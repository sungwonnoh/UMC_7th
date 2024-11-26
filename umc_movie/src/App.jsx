import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
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
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />;
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
