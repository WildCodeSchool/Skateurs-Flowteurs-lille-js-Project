import { Outlet } from "react-router";
import "./App.css";
import { Header } from "./components/header";
import { Tapbar } from "./components/tapbar";

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
