import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./context/UserInfoContext";

import App from "./App";
import { Profile } from "./pages/Profile";
import { TricksDex } from "./pages/TricksDex";
import MapPage from "./pages/MapPage";
import { HomePage } from "./pages/HomePage";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/profil",
        element: <Profile />,
      },
      {
        path: "/tricksdex",
        element: <TricksDex />,
      },
      {
        path: "/carte",
        element: <MapPage />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

createRoot(rootElement).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
