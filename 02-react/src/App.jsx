import { useState } from "react";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { JobListings } from "./components/JobListings/index";
import { JobsSearch } from "./components/JobsSearch";
import { Pagination } from "./components/Pagination";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <Header />
      <main>
        <JobsSearch />

        <JobListings />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>

      <Footer />
    </>
  );
}

export default App;
