import { Footer } from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";

import { Home } from "./pages/Home.jsx";
import { NotFound } from "./pages/NotFound.jsx";
import { Search } from "./pages/Search.jsx";

function App() {
  return (
    <>
      <Header />
      {/* <Home /> */}
      {/* <Search /> */}
      <NotFound />
      <Footer />
    </>
  );
}

export default App;
