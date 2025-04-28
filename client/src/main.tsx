import { GoogleOAuthProvider } from "@react-oauth/google";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import { UserProvider } from "./context/UserInfoContext";

import App from "./App";
import { HomePage } from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import { Profile } from "./pages/profile";
import { TricksDex } from "./pages/TricksDex";

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
