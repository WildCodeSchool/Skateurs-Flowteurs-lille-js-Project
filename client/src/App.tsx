import { Outlet } from "react-router";
import "./App.css";
import { Header } from "./components/header";
import { Tapbar } from "./components/tapbar";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Tapbar />
    </>
  );
}

export default App;
