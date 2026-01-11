import { lazy, Suspense, useState } from "react";
import { Route, Routes } from "react-router";

import { Footer } from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";
import { Spinner } from "./components/Spinner.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const Search = lazy(() => import("./pages/Search.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const JobDetail = lazy(() => import("./pages/JobDetail.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <>
      <Header />
      <Suspense fallback={<Spinner text="Cargando pagina..." />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/jobs/:jobId" element={<JobDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Footer />
    </>
  );
}

export default App;
