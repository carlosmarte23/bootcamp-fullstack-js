import { useState } from "react";

import { Footer } from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";
import { JobListings } from "./components/JobListings/index.jsx";
import { JobsSearch } from "./components/JobsSearch.jsx";
import { Pagination } from "./components/Pagination.jsx";

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
