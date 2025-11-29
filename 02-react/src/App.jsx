import { Footer } from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";

import { Home } from "./pages/Home.jsx";
import { NotFound } from "./pages/NotFound.jsx";
import { Search } from "./pages/Search.jsx";

import { useEffect, useState } from "react";

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);

    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  return (
    <>
      <Header />

      {currentPath === "/" && <Home />}
      {currentPath === "/search" && <Search />}

      <Footer />
    </>
  );
}

export default App;
