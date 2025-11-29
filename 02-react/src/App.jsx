import { Footer } from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";
import { Route } from "./components/Route.jsx";

import { Home } from "./pages/Home.jsx";
import { NotFound } from "./pages/NotFound.jsx";
import { Search } from "./pages/Search.jsx";

function App() {
  return (
    <>
      <Header />

      <Route path="/" component={Home} />
      <Route path="/search" component={Search} />

      <Footer />
    </>
  );
}

export default App;
