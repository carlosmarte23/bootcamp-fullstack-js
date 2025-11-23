import { useState } from "react";

import { Footer } from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";
import { JobListings } from "./components/JobListings/index.jsx";
import { JobsSearch } from "./components/JobsSearch.jsx";
import { Pagination } from "./components/Pagination.jsx";

import jobsData from "./data/jobs.json";

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const MAX_JOBS_PER_PAGE = 4;
  const totalPages = Math.ceil(jobsData.length / MAX_JOBS_PER_PAGE);

  const filteredJobs = jobsData.slice(
    (currentPage - 1) * MAX_JOBS_PER_PAGE,
    currentPage * MAX_JOBS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <Header />
      <main>
        <JobsSearch />

        <JobListings jobs={filteredJobs} />
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
