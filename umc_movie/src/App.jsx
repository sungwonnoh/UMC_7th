import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Card from "./component/card";
import RootLayout from "./layout/root-layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Card />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
