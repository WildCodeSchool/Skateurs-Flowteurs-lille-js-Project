import { GoogleOAuthProvider } from "@react-oauth/google";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import App from "./App";
import { TricksProvider } from "./context/TricksContext";
import { UserProvider } from "./context/UserInfoContext";
import { Contact } from "./pages/Contact";
import { HomePage } from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import { Profile } from "./pages/Profile";
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
      {
        path: "/Contact",
        element: <Contact />,
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
        <TricksProvider>
          <RouterProvider router={router} />
        </TricksProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
