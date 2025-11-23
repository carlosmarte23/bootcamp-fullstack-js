import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { JobListings } from "./components/JobListings/index";
import { JobsSearch } from "./components/JobsSearch";
import { Pagination } from "./components/Pagination";

function App() {
  const handlePageChange = (page) => {
    console.log("Changing to page: " + page);
  };
  return (
    <>
      <Header />
      <main>
        <JobsSearch />

        <JobListings />
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={handlePageChange}
        />
      </main>

      <Footer />
    </>
  );
}

export default App;
