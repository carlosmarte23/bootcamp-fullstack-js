import { useState } from "react";

import { Footer } from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";
import { JobListings } from "./components/JobListings/index.jsx";
import { Pagination } from "./components/Pagination.jsx";
import { SearchForm } from "./components/SearchForm/SearchForm.jsx";

import jobsData from "./data/jobs.json";

function App() {
  const [filters, setFilters] = useState({
    technology: "",
    location: "",
    contract: "",
    experience: "",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (newFilters) => {
    setFilters({
      technology: newFilters.technology,
      location: newFilters.location,
      contract: newFilters.contract,
      experience: newFilters.experience,
    });

    console.log(newFilters);
  };

  const filteredJobs = jobsData.filter((job) => {
    return (
      (filters.technology === "" ||
        job.data.technology === filters.technology) &&
      (filters.location === "" || job.data.modalidad === filters.location) &&
      (filters.contract === "" || job.data.contract === filters.contract) &&
      (filters.experience === "" || job.data.nivel === filters.experience)
    );
  });

  const MAX_JOBS_PER_PAGE = 4;
  const totalPages = Math.ceil(filteredJobs.length / MAX_JOBS_PER_PAGE);

  const paginatedJobs = filteredJobs.slice(
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
        <SearchForm onSearch={handleSearch} />

        <JobListings jobs={paginatedJobs} />
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
