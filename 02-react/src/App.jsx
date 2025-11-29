import { Footer } from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";

import { Home } from "./pages/Home.jsx";
import { NotFound } from "./pages/NotFound.jsx";
import { Search } from "./pages/Search.jsx";

import { useRouter } from "./hooks/useRouter.js";

function App() {
  const { currentPath } = useRouter();
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
