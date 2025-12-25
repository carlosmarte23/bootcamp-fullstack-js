import { Route, Routes } from "react-router";

import { Footer } from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";

import { Contact } from "./pages/Contact.jsx";
import { Home } from "./pages/Home.jsx";
import { Search } from "./pages/Search.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
