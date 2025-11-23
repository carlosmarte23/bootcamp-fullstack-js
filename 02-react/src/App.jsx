import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { JobListings } from "./components/JobListings/index";
import { JobsSearch } from "./components/JobsSearch";
import { Pagination } from "./components/Pagination";

function App() {
  return (
    <>
      <Header />
      <main>
        <JobsSearch />

        <section>
          <JobListings />
          <Pagination />
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
